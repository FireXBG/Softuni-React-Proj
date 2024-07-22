import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/authContext'; // Ensure this matches the filename
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './Features/Login/Login';
import Tables from './Features/Tables/Tables';
import SelectedTable from './Features/Tables/SelectedTable/SelectedTable';

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
                        path='/tables/:tableNumber'
                        element={
                            <ProtectedRoute>
                                <SelectedTable />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
