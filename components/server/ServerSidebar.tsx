import * as React from 'react';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { ChannelType, MemberRole } from '@prisma/client';
import ServerHeader from './ServerHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import ServerSearchBox from './ServerSearchBox';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ServerSection from './ServerSection';
import ServerChannel from './ServerChannel';
import ServerMember from './ServerMember';

interface ServerSidebarProps {
  serverId: string;
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

const ServerSidebar: React.FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },

        orderBy: {
          role: 'asc',
        },
      },
    },
  });

  const textChannels = server?.channels.filter(
    channel => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    channel => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    channel => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    member => member.profileId !== profile.id
  );

  if (!server) {
    return redirect('/');
  }

  const role = server.members.find(
    member => member.profileId === profile.id
  )?.role;

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]'>
      <ServerHeader server={server} role={role} />{' '}
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearchBox
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map(channel => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },

              {
                label: 'Audio Channels',
                type: 'channel',
                data: audioChannels?.map(channel => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },

              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels?.map(channel => ({
                  icon: iconMap[channel.type],
                  name: channel.name,
                  id: channel.id,
                })),
              },

              {
                label: 'Members',
                type: 'member',
                data: members?.map(member => ({
                  icon: roleIconMap[member.role],
                  name: member.profile.name,
                  id: member.profile.id,
                })),
              },
            ]}
          />
        </div>

        <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2' />
        {!!textChannels?.length && (
          <div className='mb-2 '>
            <ServerSection
              label='Text Channels'
              role={role}
              sectionType='channels'
              channelType={ChannelType.TEXT}
            />

            <div className='space-y-[2px]'>
              {textChannels.map(channel => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className='mb-2 '>
            <ServerSection
              label='Voice Channels'
              role={role}
              sectionType='channels'
              channelType={ChannelType.AUDIO}
            />
            <div className='space-y-[2px]'>
              {audioChannels.map(channel => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className='mb-2 '>
            <ServerSection
              label='Video Channels'
              role={role}
              sectionType='channels'
              channelType={ChannelType.VIDEO}
            />
            <div className='space-y-[2px]'>
              {videoChannels.map(channel => (
                <ServerChannel
                  channel={channel}
                  server={server}
                  role={role}
                  key={channel.id}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className='mb-2 '>
            <ServerSection
              label='Members'
              role={role}
              sectionType='members'
              server={server}
            />

            <div className='space-y-[2px]'>
              {members.map(member => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
