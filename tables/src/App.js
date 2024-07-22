import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/authContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './Features/Login/Login';
import Tables from './Features/Tables/Tables';
import SelectedTable from './Features/Tables/SelectedTable/SelectedTable';
import AdminLogin from "./Features/Login/AdminLogin";
import AdminView from "./Features/Admin/AdminView/AdminView";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/admin/login' element={<AdminLogin />} />
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
                    <Route
                        path='/admin'
                        element={
                            <ProtectedRoute>
                                <AdminView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/tables'
                        element={
                        <ProtectedRoute>
                            <AdminView view='tables'></AdminView>
                        </ProtectedRoute>
                    }
                    />
                    <Route
                        path='/admin/menus'
                        element={
                            <ProtectedRoute>
                                <AdminView view='menu'></AdminView>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/admin/security'
                        element={
                            <ProtectedRoute>
                                <AdminView view='security'></AdminView>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
