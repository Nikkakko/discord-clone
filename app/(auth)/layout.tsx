import * as React from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className='h-full flex items-center justify-center'>{children}</div>
  );
};

export default AuthLayout;
