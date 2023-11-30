import * as React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  src?: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, className }) => {
  return (
    <Avatar className={cn('w-7 h-7 md:h-10 md:w-10', className)}>
      <AvatarImage src={src} alt='user-avatar' />

      <AvatarFallback className='text-sm md:text-lg' />
    </Avatar>
  );
};

export default UserAvatar;
