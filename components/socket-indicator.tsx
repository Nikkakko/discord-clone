'use client';
import * as React from 'react';
import { Badge } from './ui/badge';
import { useSocket } from '@/Providers/socket-provider';

interface SocketIndicatorProps {}

const SocketIndicator: React.FC<SocketIndicatorProps> = ({}) => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant='outline' className='bg-yellow-600 text-white border-none'>
        Fallback: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge variant='outline' className='bg-emerald-600 text-white border-none'>
      Live: Realtime updates
    </Badge>
  );
};

export default SocketIndicator;
