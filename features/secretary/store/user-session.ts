import {create} from "zustand";

type UserSessionState = {
  id?: string;
  onChange: (id: string) => void;
};

export const useUserSession = create<UserSessionState>((set) => ({
  id: undefined,
  onChange: (id: string) => set({id}),
}));
