// App.js
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/authContext'; // Ensure this matches the filename
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './Features/Login/Login';
import Tables from "./Features/Tables/Tables";

// Placeholder components for protected routes
const Dashboard = () => <h1>Dashboard Page</h1>;

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Navigate to='/tables' />} />
                    <Route
                        path='/tables'
                        element={
                            <ProtectedRoute>
                                <Tables />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/example'
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
