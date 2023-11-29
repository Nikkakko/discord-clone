'use client';
import * as React from 'react';

import CreateServerModal from '@/components/modals/create-server-modal';
import InviteModal from '@/components/modals/invite-modal';

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
    </>
  );
};
