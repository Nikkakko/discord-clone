import * as React from 'react';

interface layoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<layoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
