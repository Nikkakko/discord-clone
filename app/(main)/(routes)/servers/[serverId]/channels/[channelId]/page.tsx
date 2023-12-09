import * as React from 'react';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';

interface ChannelPageProps {
  params: {
    channelId: string;
    serverId: string;
  };
}

async function ChannelPage({
  params: { channelId, serverId },
}: ChannelPageProps) {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect('/');
  }

  return (
    <div
      className='bg-white dark:bg-[#313338]
    flex flex-col h-full
  '
    >
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type='channel'
      />

      <div className='flex-1'>future Message</div>
      <ChatInput
        apiUrl='/api/socket/messages'
        query={{
          serverId: channel.serverId,
          channelId: channel.id,
        }}
        name={channel.name}
        type='channel'
      />
    </div>
  );
}

export default ChannelPage;
