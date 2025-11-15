import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RomcalApp } from './RomcalApp';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount): boolean => failureCount < 4,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <RomcalApp />
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
