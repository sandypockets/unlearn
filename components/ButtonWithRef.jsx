import React from 'react';

const ButtonWithRef = React.forwardRef(({ children, type = 'button', onClick, className = '' }, ref) => (
  <button
    ref={ref}
    className={`${className} px-3 py-2 rounded-lg border border-white w-full`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
));

export default ButtonWithRef;
