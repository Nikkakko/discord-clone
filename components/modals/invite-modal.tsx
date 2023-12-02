'use client';
import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useToast } from '../ui/use-toast';
import { useModalStore } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import axios from 'axios';

interface InviteProps {}

const InviteModal: React.FC<InviteProps> = ({}) => {
  const { toast } = useToast();
  const { isOpen, onClose, type, data, openModal } = useModalStore();
  const [copied, setCopied] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { server } = data;
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'invite';
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    toast({
      title: 'Copied to clipboard',
      description: 'You can now send the invite link to your friends.',
    });

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onGenerate = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      toast({
        title: 'New invite link generated',
        description: 'You can now send the invite link to your friends.',
      });
      openModal('invite', { server: data });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Something went wrong, please try again.',
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
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
            Server Invite Link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input
              className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
              value={inviteUrl}
              readOnly
            />
            <Button size='icon' onClick={onCopy} disabled={isLoading}>
              {copied ? (
                <Check className='w-4 h-4' />
              ) : (
                <Copy className='w-4 h-4' />
              )}
            </Button>
          </div>

          <Button
            variant='link'
            className='text-cs text-zinc-500 mt-4'
            onClick={onGenerate}
            disabled={isLoading}
          >
            Generate a new link
            <RefreshCw className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
