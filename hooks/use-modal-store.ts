import { create } from 'zustand';
import { Server } from '@prisma/client';

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel';

interface ModalData {
  server?: Server;
}

type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  openModal: (modalType: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  openModal: (type, data = {}) => set(() => ({ type, isOpen: true, data })),
  onClose: () => set(() => ({ modalType: null, isOpen: false })),
}));
