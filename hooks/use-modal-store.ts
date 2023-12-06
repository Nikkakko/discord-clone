import { create } from 'zustand';
import { Channel, ChannelType, Server } from '@prisma/client';

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'editChannel'
  | 'deleteChannel';

interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
}

type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (modalType: ModalType, data?: ModalData) => void;
  onClose: () => void;
};

export const useModalStore = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set(() => ({ type, isOpen: true, data })),
  onClose: () => set(() => ({ modalType: null, isOpen: false })),
}));
