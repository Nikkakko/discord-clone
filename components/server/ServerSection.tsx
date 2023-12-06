'use client';
import { ServerWithMembersWithProfiles } from '@/types';
import { ChannelType, MemberRole } from '@prisma/client';
import * as React from 'react';
import TooltipAction from '@/components/TooltipAction';
import { Plus, Settings } from 'lucide-react';
import { useModalStore } from '@/hooks/use-modal-store';

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection: React.FC<ServerSectionProps> = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}) => {
  const { onOpen } = useModalStore();
  return (
    <div className='flex items-center justify-between py-2'>
      <p className='text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400'>
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <TooltipAction label='Create channel' side='top'>
          <button
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
            onClick={() => onOpen('createChannel', { channelType })}
          >
            <Plus className='h-4 w-4' />
          </button>
        </TooltipAction>
      )}

      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <TooltipAction label='Manage Members' side='top'>
          <button
            className='text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition'
            onClick={() => onOpen('members', { server })}
          >
            <Settings className='h-4 w-4' />
          </button>
        </TooltipAction>
      )}
    </div>
  );
};

export default ServerSection;
