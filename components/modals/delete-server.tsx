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

const DeleteServerModal: React.FC<InviteProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModalStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const { server } = data;

  const isModalOpen = isOpen && type === 'deleteServer';

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);
      onClose();
      router.refresh();
      router.push('/');
      toast({
        title: 'Success',
        description: `You have deleted ${server?.name}`,
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
            Delete Server
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to Delete{' '}
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
              Delete Server
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

export default DeleteServerModal;
