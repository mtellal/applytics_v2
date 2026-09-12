import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dahsboard';
import AppLayout from './layouts/AppLayout/AppLayout';
import Applications from './pages/Applications';
import Account from './pages/Account';
import Landing from './pages/Landing';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
