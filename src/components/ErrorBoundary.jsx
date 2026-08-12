import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>Elnézést, hiba történt az oldal betöltése közben.</h2>
          <p>Kérjük, frissítsd az oldalt vagy próbáld újra később.</p>
          <button 
            onClick={() => this.setState({ hasError: false, errorInfo: null })}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#1E2B4B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Oldal újratöltése
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
