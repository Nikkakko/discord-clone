'use client';
import * as React from 'react';

import CreateServerModal from '@/components/modals/create-server-modal';
import InviteModal from '@/components/modals/invite-modal';
import EditServerModal from '@/components/modals/edit-server-modal';
import MembersModal from '@/components/modals/members-modal';
import CreateChannelsModal from '@/components/modals/create-channels-modal';
import LeaveServerModal from '@/components/modals/leave-server';
import DeleteServerModal from '@/components/modals/delete-server-modal';
import DeleteChannelModal from '@/components/modals/delete-channel-modal';
import EditChannelModal from '@/components/modals/edit-channel-modal';
import MessageFileModal from '@/components/modals/message-file';
import { DeleteMessageModal } from '@/components/modals/delete-message-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelsModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
