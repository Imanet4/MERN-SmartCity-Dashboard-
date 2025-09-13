import { Spinner } from "react-bootstrap"

const LoadingSpinner = ({ message = "Loading...", size = "border", variant = "primary" }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <Spinner animation={size} variant={variant} className="mb-3" />
      <p className="text-muted mb-0">{message}</p>
    </div>
  )
}

export default LoadingSpinner
