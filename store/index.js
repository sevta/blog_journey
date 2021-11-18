const { default: create } = require("zustand");

export const useStore = create((set) => ({
  auth: false,
  user: {},

  modal: "",

  setAuth: (payload) =>
    set(() => ({
      auth: payload,
    })),

  setUser: (payload) =>
    set(() => ({
      user: payload,
    })),

  setModal: (payload) =>
    set(() => ({
      modal: payload,
    })),
}));
