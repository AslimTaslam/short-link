import { Component } from 'react';
import { ErrorIndicator } from '../ErrorIndicator';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.state({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
