import * as Sentry from '@sentry/react';
import { ReactNode } from 'react';
import ErrorFallback from './ErrorFallback';

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <ErrorFallback error={error} resetErrorBoundary={resetError} />
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
