import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';
import * as React from 'react';

interface SetupPageProps {}

async function SetupPage({}: SetupPageProps) {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return <div>Create a server</div>;
}

export default SetupPage;
