import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dahsboard';
import AppLayout from './layouts/AppLayout/AppLayout';
import Applications from './pages/Applications';
import Account from './pages/Account';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/account" element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
