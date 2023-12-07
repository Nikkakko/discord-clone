'use client';
import { cn } from '@/lib/utils';
import { ServerWithMembersWithProfiles } from '@/types';
import {
  ChannelType,
  Member,
  MemberRole,
  Profile,
  Server,
} from '@prisma/client';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';
import UserAvatar from '../UserAvatar';

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='ml-2 h-4 w-4 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='ml-2 h-4 w-4 text-rose-500' />,
};

const ServerMember: React.FC<ServerMemberProps> = ({ member, server }) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'group px-2 py-2 rounded-md flex items-center gap-x-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1',
        params.channelId === member?.id ? 'bg-zinc-100 dark:bg-zinc-700' : ''
      )}
    >
      {icon}

      <UserAvatar
        src={member.profile.imageUrl}
        className='w-4 h-4 md:h-8 md:w-8 rounded-full'
      />
      <span
        className={cn(
          'text-sm font-semibold text-zinc-500 dark:text-zinc-400 truncate',
          params.memberId === member?.id ? 'text-zinc-900' : ''
        )}
      >
        {member.profile.name}
      </span>
    </button>
  );
};

export default ServerMember;
