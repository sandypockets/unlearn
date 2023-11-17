import React from 'react';

const ButtonWithRef = React.forwardRef(({ children, type = 'button', onClick }, ref) => (
  <button ref={ref} className="px-3 py-2 rounded-lg bg-blue-500" type={type} onClick={onClick}>
    {children}
  </button>
));

export default ButtonWithRef;
