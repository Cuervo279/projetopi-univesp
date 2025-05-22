import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import NewSales from './pages/NewSales';
import Sales from './pages/Sales';
import PrivateRoute from './components/PrivateRoute';


export default function App() {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route
              path="/stock"
              element={<PrivateRoute element={<Stock />} />}
            />
                        <Route
              path="/newsales"
              element={<PrivateRoute element={<NewSales />} />}
            />
            <Route
              path="/sales"
              element={<PrivateRoute element={<Sales />} />}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
      </AuthProvider>
    </Router>
  );
}
