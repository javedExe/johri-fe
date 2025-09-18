import { create } from "zustand";

const useFeatureStore  = create((set) => ({

    selectedUsers: [],
    selectedInvoice: [],


    setSelectedUsers: (rows) => set({ selectedUsers: rows }),
    clearSelectedUsers: () => set({ selectedUsers: [] }),
    
    
    setSelectedInvoice: (rows) => set({ selectedInvoice: rows }),
    clearSelectedInvoice: () => set({ selectedInvoice: [] }),




}));

export default useFeatureStore;
