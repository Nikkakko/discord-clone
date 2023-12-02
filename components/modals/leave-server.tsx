'use client';
import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useToast } from '../ui/use-toast';
import { useModalStore } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface InviteProps {}

const LeaveServerModal: React.FC<InviteProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { isOpen, onClose, type, data, openModal } = useModalStore();
  const [copied, setCopied] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { server } = data;

  const isModalOpen = isOpen && type === 'leaveServer';

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);
      onClose();
      router.refresh();
      router.push('/');
      toast({
        title: 'Success',
        description: `You have left ${server?.name}`,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: `Something went wrong`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Leave Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to leave{' '}
            <span className='font-semibold text-indigo-500'>
              {server?.name}
            </span>{' '}
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button
              variant='destructive'
              disabled={isLoading}
              onClick={onClick}
            >
              Leave Server
            </Button>

            <Button variant='secondary' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
