import { create } from "zustand";

const useFeatureStore  = create((set) => ({

    selectedUsers: [],


    setSelectedUsers: (rows) => set({ selectedUsers: rows }),
    clearSelectedUsers: () => set({ selectedUsers: [] }),




}));

export default useFeatureStore;
