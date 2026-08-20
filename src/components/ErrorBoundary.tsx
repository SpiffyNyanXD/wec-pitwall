import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useLocation, Location } from 'react-router-dom';
import ErrorFallback from './ErrorFallback';

interface ErrorBoundaryClassProps {
  children: ReactNode;
  location: Location;
}

interface ErrorBoundaryClassState {
  err: Error | null;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryClassProps, ErrorBoundaryClassState> {
  constructor(props: ErrorBoundaryClassProps) {
    super(props);
    this.state = { err: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryClassState {
    return { err: error };
  }

  componentDidUpdate(prevProps: ErrorBoundaryClassProps) {
    if (this.state.err && prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ err: null });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ err: null });
  };

  render() {
    if (this.state.err) {
      return <ErrorFallback error={this.state.err} resetErrorBoundary={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <ErrorBoundaryClass location={location}>{children}</ErrorBoundaryClass>;
}
