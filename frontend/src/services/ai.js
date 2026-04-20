import api from "./axiosClient";

export const ai = {
  async rewrite({ text, mode }) {
    const { data } = await api.post("/ai/rewrite", { text, mode });
    return data;
  },
};
