import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import ProfileDetails from './pages/ProfileDetails';
import Favorites from './pages/Favorites';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import DashboardLayout from './components/layout/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import EditProfile from './pages/dashboard/EditProfile';
import ProtectedRoute from './components/features/auth/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import UserManagement from './pages/admin/UserManagement';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:id" element={<ProfileDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Advertiser Routes */}
              <Route element={<ProtectedRoute allowedRoles={['advertiser', 'super_admin']} />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="profile" element={<EditProfile />} />
                  <Route path="settings" element={<div>Settings Placeholder</div>} />
                </Route>
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<div>Admin Stats Placeholder</div>} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="moderation" element={<div>Moderation Placeholder</div>} />
                </Route>
              </Route>

              <Route path="/favorites" element={<Favorites />} />
              <Route path="/search" element={<div className="p-8 text-center">Search Page (To Implement)</div>} />
              <Route path="*" element={<div className="container pt-20">Page Not Found</div>} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
