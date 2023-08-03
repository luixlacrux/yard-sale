import React from 'react';
import '@styles/errorMessage.scss'

const ErrorMessage = ({ message }) => {
  return (
    <div className="errorMessage">
      {message}
    </div>
  );
};

export default ErrorMessage;