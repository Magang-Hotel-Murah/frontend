import React, { useState } from 'react';
import { MainLayout } from '@layouts';
import { Home } from '@pages';
import { User } from '@pages';
import { Login } from '@pages';
import { Transaction } from '@pages';
import { useAuth } from '@hooks';

const App = () => {
  const [activeMenu, setActiveMenu] = useState('home');
  const { isAuthenticated, user, login, logout } = useAuth();

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <Home />;
      case 'transactions':
        return <Transaction/>;
      case 'users':
        return <User/>;
      case 'settings':
        return(
          <div>
            <h1>Halaman Setting</h1>
          </div>
        );
      default:
        return <Home />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <MainLayout 
      activeMenu={activeMenu} 
      setActiveMenu={setActiveMenu}
      user={user}
      onLogout={logout}
    >
      {renderContent()}
    </MainLayout>
  );
};

export default App;