import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './Features/Login/Login';
import Tables from './Features/Tables/Tables';
import SelectedTable from './Features/Tables/SelectedTable/SelectedTable';
import AdminView from "./Features/Admin/AdminView/AdminView";
import NotAuthorized from './auth/notAuthorized';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Navigate to='/tables' />} />
                    <Route path='/not-authorized' element={<NotAuthorized />} />
                    <Route
                        path='/tables'
                        element={
                            <ProtectedRoute requiredRoles={['user', 'admin']}>
                                <Tables />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/tables/:tableNumber'
                        element={
                            <ProtectedRoute requiredRoles={['user', 'admin']}>
                                <SelectedTable />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin'
                        element={
                            <ProtectedRoute requiredRoles={['admin']}>
                                <AdminView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/tables'
                        element={
                            <ProtectedRoute requiredRoles={['admin']}>
                                <AdminView view='tables' />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/menus'
                        element={
                            <ProtectedRoute requiredRoles={['admin']}>
                                <AdminView view='menu' />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/security'
                        element={
                            <ProtectedRoute requiredRoles={['admin']}>
                                <AdminView view='security' />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
