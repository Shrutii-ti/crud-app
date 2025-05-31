import React from 'react';
import './FormWrapper.css';

const FormWrapper = ({ title, onSubmit, children }) => {
  return (
    <div className="form-page">
      <form className="form-container" onSubmit={onSubmit}>
        <h2>{title}</h2>
        {children}
      </form>
    </div>
  );
};

export default FormWrapper;
