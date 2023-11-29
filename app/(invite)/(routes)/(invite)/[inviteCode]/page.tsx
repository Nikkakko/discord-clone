import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import * as React from 'react';

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

async function InviteCodePage({ params: { inviteCode } }: InviteCodePageProps) {
  const profile = await currentProfile();

  if (!profile) {
    redirectToSignIn();
    return null;
  }

  if (!inviteCode) {
    return redirect('/');
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });
  return <div>InviteCode</div>;
}

export default InviteCodePage;
