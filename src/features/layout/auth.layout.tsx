import React, { useEffect } from 'react';
import logo from '../../../public/vite.svg'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout: React.FC = ({ children }: any) => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      // navigate('/')
    }
  }, [])
  return (
    <div className="min-h-screen flex ">
      <div className="hidden lg:flex w-1/2 bg-cover bg-center bg-orange-500" style={{ backgroundImage: 'url(https://lellall-prod.sfo3.cdn.digitaloceanspaces.com/files/fresh.svg)' }}>

      </div>
      <div className="lg:w-1/2 w-full flex justify-center items-center relative">
        <div className="">
          <div className="absolute top-[70px] left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="logo" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
