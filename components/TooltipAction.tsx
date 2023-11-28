'use client';
import * as React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TooltipActionProps {
  label: string;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
}

const TooltipAction: React.FC<TooltipActionProps> = ({
  label,
  children,
  side,
  align,
}) => {
  return (
    <Tooltip delayDuration={50}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p className='font-semibold text-sm capitalize'>
          {label.toLowerCase()}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipAction;
