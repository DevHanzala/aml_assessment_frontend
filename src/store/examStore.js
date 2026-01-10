import { create } from "zustand";
import api from "./api";
import { useAuthStore } from "./authStore";

export const useExamStore = create((set, get) => ({
  questions: [],
  answers: {}, // { questionId: selectedAnswer }
  sessionId: null,
  candidateName: "",
  result: null, // { score, percentage } or null
  loading: false,
  error: null,

  setAnswer: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },

  setCandidateName: (name) => set({ candidateName: name }),
  
startExam: async (email, accessCode) => {
  try {
    set({ loading: true, error: null });

    const res = await api.post("/api/exam/start", { email, accessCode });

    // Save student auth
    useAuthStore.getState().setAuth(res.data.token, "candidate");

    set({
      questions: res.data.questions,
      sessionId: res.data.sessionId,
      answers: {},
      candidateName: "",
      result: null,
      loading: false,
    });

    return { success: true };
  } catch (err) {
    set({
      error: err.response?.data?.message || "Failed to start exam",
      loading: false,
    });
    return { success: false };
  }
},


submitExam: async () => {
  const { answers, sessionId, candidateName } = get();

  if (!sessionId || !candidateName.trim()) {
    set({ error: "Name and session required" });
    return { success: false };
  }

  try {
    set({ loading: true, error: null });

    const res = await api.post(
      "/api/exam/submit",
      { answers, name: candidateName, sessionId },
      {
        responseType: "blob", // ✅ CRITICAL FIX
      }
    );

    const contentType = res.headers["content-type"];

    // ✅ PASSED → PDF
    if (contentType && contentType.includes("application/pdf")) {
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `AML_CFT_Certificate_${candidateName.replace(/[^a-z0-9]/gi, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      set({
        result: { percentage: 100, passed: true },
        loading: false,
      });

      return { success: true };
    }

    // ❌ FAILED → JSON
    const reader = new FileReader();
    reader.onload = () => {
      const json = JSON.parse(reader.result);
      set({ result: json, loading: false });
    };
    reader.readAsText(res.data);

    return { success: true };

  } catch (err) {
    console.error("Submit error:", err);
    const message = err.response?.data?.message || "Submit failed";
    set({ error: message, loading: false });
    return { success: false, message };
  }
},


  clearExam: () => {
    set({
      questions: [],
      answers: {},
      sessionId: null,
      candidateName: "",
      result: null,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));