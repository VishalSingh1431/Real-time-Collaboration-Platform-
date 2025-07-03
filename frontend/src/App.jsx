
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/layout/PrivateRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DocumentEditor from './components/documents/DocumentEditor';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/documents/:id" element={
              <PrivateRoute><DocumentEditor /></PrivateRoute>
            } />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;