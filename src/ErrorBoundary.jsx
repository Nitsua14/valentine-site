import { Component } from 'react'

/**
 * Catches React render errors so you see a message instead of a blank page.
 * Open the browser console (F12) for the full error.
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Valentine app error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            background: '#831843',
            color: '#fce7f3',
            fontFamily: 'sans-serif',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ marginBottom: 16, maxWidth: 400 }}>
            Open the browser console (F12 → Console) to see the error.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '10px 20px',
              borderRadius: 9999,
              border: 'none',
              background: '#ec4899',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
