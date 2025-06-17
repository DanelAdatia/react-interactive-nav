import { Outlet } from 'react-router-dom';
import NavigationBuilder from './components/navigation/NavigationBuilder';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('formData-')) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  return (
    <>
      <Outlet />
      <NavigationBuilder />
    </>
  );
}

export default App;
