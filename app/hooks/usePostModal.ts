import { create } from 'zustand';

interface PostModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// hook to manage post modal state
const usePostModal = create<PostModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default usePostModal;
