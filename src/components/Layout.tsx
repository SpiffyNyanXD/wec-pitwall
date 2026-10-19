import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className={`flex-1 md:pl-20 lg:pl-64 3xl:pl-72 transition-all duration-300 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
