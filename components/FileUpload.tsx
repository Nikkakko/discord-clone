'use client';
import * as React from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import '@uploadthing/react/styles.css';
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { deleteImage } from '@/app/_actions/removeServerImage';

interface FileUploadProps {
  endpoint: 'messageFile' | 'serverImage';
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  value,
  onChange,
}) => {
  const fileType = value?.split('.').pop();
  const [ImageKey, setImageKey] = React.useState<string | undefined>();

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image
          src={value}
          alt='Uploaded Image'
          layout='fill'
          objectFit='cover'
          className='rounded-full'
        />
        <button
          className='bg-rose-500 text-white p-1 rounded-full
          absolute top-0 right-0 
          '
          type='button'
          onClick={async () => {
            await deleteImage(ImageKey);
            onChange();
          }}
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    );
  }

  if (value && fileType === 'pdf') {
    return (
      <div className='relative flex items-center p-2 mt-2 rounded-md bg-background/10'>
        <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
        <a
          href={value}
          className='ml-2 text-sm font-medium text-indigo-200 hover:text-indigo-100
            dark:text-indigo-400 dark:hover:text-indigo-300
          '
          target='_blank'
          rel='noreferrer noopener'
        >
          {value.split('/').pop()}
        </a>
        <button
          className='bg-rose-500 text-white p-1 rounded-full
          absolute -top-2 -right-2 
          '
          type='button'
          onClick={async () => {
            await deleteImage(ImageKey);
            onChange();
          }}
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange(res?.[0].url);
        setImageKey(res?.[0].key);
      }}
      onUploadError={(err: Error) => {
        console.error(err);
      }}
    />
  );
};

export default FileUpload;
