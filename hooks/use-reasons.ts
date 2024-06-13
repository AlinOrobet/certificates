import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {createId} from "@paralleldrive/cuid2";

interface ReasonsStore {
  reasons: {label: string; value: string}[];
  addReason: (reason: string) => void;
}

const useReasons = create(
  persist<ReasonsStore>(
    (set, get) => ({
      reasons: [],
      addReason: (reason: string) => {
        set({reasons: [...get().reasons, {value: createId(), label: reason}]});
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useReasons;
