import { create } from "zustand";

const userConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

//same as useContext-> just an alternative way
export default userConversation;