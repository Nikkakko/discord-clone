'use client';
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from './modal-provider';
import { SocketProvider } from './socket-provider';

export function Providers({ children, ...props }: ThemeProviderProps) {
  //   const queryClient = new QueryClient();
  return (
    // <QueryClientProvider client={queryClient}>
    <NextThemesProvider {...props}>
      <TooltipProvider>
        <SocketProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </SocketProvider>
      </TooltipProvider>
    </NextThemesProvider>
    // </QueryClientProvider>
  );
}
