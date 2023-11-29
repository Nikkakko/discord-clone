import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const porfile = await currentProfile();
    if (!porfile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: porfile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID] PATCH ERROR', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
