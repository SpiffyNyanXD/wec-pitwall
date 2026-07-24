import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  err: Error | null;
}

export default class BootBoundary extends Component<Props, State> {
  state: State = { err: null };

  static getDerivedStateFromError(err: Error): State {
    return { err };
  }

  componentDidCatch(err: Error) {
    console.error('[RENDER FATAL]', err);
  }

  render() {
    if (this.state.err) {
      const msg = (this.state.err.stack || this.state.err.message) || String(this.state.err);
      return (
        <pre
          style={{
            position: 'fixed',
            inset: 0,
            margin: 0,
            padding: 16,
            background: '#0a0a0a',
            color: '#E8002D',
            font: '12px/1.4 monospace',
            whiteSpace: 'pre-wrap',
            overflow: 'auto',
            zIndex: 999999
          }}
        >
          {'WEC PITWALL RENDER ERROR\n\n' + msg}
        </pre>
      );
    }
    return this.props.children;
  }
}
