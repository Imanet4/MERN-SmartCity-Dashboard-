"use client"

import { Alert, Button } from "react-bootstrap"

const ErrorMessage = ({
  message = "Something went wrong",
  onRetry,
  variant = "danger",
  dismissible = false,
  onDismiss,
}) => {
  return (
    <Alert variant={variant} dismissible={dismissible} onClose={onDismiss}>
      <Alert.Heading>
        <span className="me-2">⚠️</span>
        Error
      </Alert.Heading>
      <p className="mb-0">{message}</p>
      {onRetry && (
        <div className="mt-3">
          <Button variant="outline-danger" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </Alert>
  )
}

export default ErrorMessage
