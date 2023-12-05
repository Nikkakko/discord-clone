'use client';
import { cn } from '@/lib/utils';
import { Channel, ChannelType, MemberRole, Server } from '@prisma/client';
import {
  Edit,
  Hash,
  Lock,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Trash,
  Video,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import * as React from 'react';
import TooltipAction from '../TooltipAction';

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
  [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
  [ChannelType.VIDEO]: <Video className='mr-2 h-4 w-4' />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='mr-2 h-4 w-4 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='mr-2 h-4 w-4 text-rose-500' />,
};

const ServerChannel: React.FC<ServerChannelProps> = ({
  channel,
  server,
  role,
}) => {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];

  return (
    <div>
      <button
        className={cn(
          'group px-2 py-2 rounded-md flex items-center gap-x-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
          params.channelId === channel.id ? 'bg-zinc-100 dark:bg-zinc-700' : ''
        )}
        onClick={() => router.push(`/channels/${server.id}/${channel.id}`)}
      >
        {Icon}
        <span
          className={cn(
            'line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc300 transition',
            params.channelId === channel.id
              ? 'text-primary dark:text-zinc-200 dark:group-hover:text-white'
              : ''
          )}
        >
          {channel.name}
        </span>

        {channel.name !== 'general' && role !== MemberRole.GUEST && (
          <div className='ml-auto flex items-center gap-x-2'>
            <TooltipAction label='Edit'>
              <Edit className='hidden group-hover:block h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition' />
            </TooltipAction>
            <TooltipAction label='Delete'>
              <Trash className='hidden group-hover:block h-4 w-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition' />
            </TooltipAction>
          </div>
        )}

        {channel.name === 'general' && (
          <Lock className='ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400' />
        )}
      </button>
    </div>
  );
};

export default ServerChannel;
