'use client';
import * as React from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FileUpload from '@/components/FileUpload';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import { useModalStore } from '@/hooks/use-modal-store';
import qs from 'query-string';

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attatchment is required',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface MessageFileModalProps {}

const MessageFileModal: React.FC<MessageFileModalProps> = ({}) => {
  const { isOpen, onClose, type, data } = useModalStore();
  const { apiUrl, query } = data;

  const isModalOepn = isOpen && type === 'messageFile';

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query,
      });

      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });

      router.refresh();
      handleClose();
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later',
      });
    }
  };

  return (
    <Dialog open={isModalOepn} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl font-bold text-center'>
            Add an attachment
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Attach a file to your message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  control={form.control}
                  name='fileUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='messageFile'
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button type='submit' disabled={isLoading} variant='primary'>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
