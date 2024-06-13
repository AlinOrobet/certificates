import {create} from "zustand";

type NewOverviewStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewOverview = create<NewOverviewStore>((set) => ({
  isOpen: false,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
}));
