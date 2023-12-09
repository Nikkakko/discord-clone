import { Member, Profile } from '@prisma/client';
import * as React from 'react';

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const ChatItem: React.FC<ChatItemProps> = ({}) => {
  return <div>ChatItem</div>;
};

export default ChatItem;
