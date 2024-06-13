import {create} from "zustand";

type OpentCertificateState = {
  id?: string;
  scop?: string;
  isOpen: boolean;
  onOpen: (id: string, scop: string) => void;
  onClose: () => void;
};

export const useOpenCertificate = create<OpentCertificateState>((set) => ({
  id: undefined,
  scop: undefined,
  isOpen: false,
  onOpen: (id: string, scop: string) => set({isOpen: true, id, scop}),
  onClose: () => set({isOpen: false, id: undefined}),
}));
