import React from "react";

const ErrorComponent = ({ message }) => (
  <div data-testid="error-box" className="alert alert-danger" role="alert">
    {message}
  </div>
);


export default ErrorComponent;
