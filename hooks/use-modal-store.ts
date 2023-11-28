import { create } from 'zustand';

export type ModalType = 'createServer';

type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  openModal: (modalType: ModalType) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  type: null,
  isOpen: false,
  openModal: type => set(() => ({ type, isOpen: true })),
  onClose: () => set(() => ({ modalType: null, isOpen: false })),
}));
