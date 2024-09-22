"use client"; // This makes it a Client Component

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const SessionProviderWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default SessionProviderWrapper;
