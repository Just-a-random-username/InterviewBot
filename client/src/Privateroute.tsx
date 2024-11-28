import React, { useEffect, useState, ReactNode } from 'react';
import Signin from './page/auth/Signin';

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const [exists, setExists] = useState<boolean>(false);

  useEffect(() => {
    const userDesc = localStorage.getItem('userdetail');
    if (userDesc) {
      setExists(true);
    }
  }, []);

  return <>{exists ? children : <Signin />}</>;
};

export default PrivateRoutes;
