import {create} from "zustand";

type NewSecretaryStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewSecretary = create<NewSecretaryStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));
