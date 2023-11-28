import * as React from 'react';

interface ServerIdPagePRops {
  params: {
    serverId: string;
  };
}

export default async function ServerIdPage({
  params: { serverId },
}: ServerIdPagePRops) {
  return <div>ServerIdPage</div>;
}
