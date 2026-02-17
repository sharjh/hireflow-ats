import { Routes, Route } from 'react-router';

import Home from '../pages/public/Home';
import Jobs from '../pages/public/Jobs';
import JobDetails from '../pages/public/JobDetails';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import CompanyProfile from '../pages/company/CompanyProfile';
import CreateCompany from '../pages/company/CreateCompany';
import EditCompany from '../pages/company/EditCompany';

import RequireAuth from '../auth/RequireAuth';
import RequireRole from '../auth/RequireRole';

import CompanyDashboard from '../pages/dashboard/CompanyDashboard';
import CreateJob from '../pages/company/CreateJob';
import EditJob from '../pages/company/EditJob';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route
          path="/jobs/create"
          element={
            <RequireAuth>
              <RequireRole role="COMPANY">
                <CreateJob />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route
          path="/jobs/edit/:id"
          element={
            <RequireAuth>
              <RequireRole role="COMPANY">
                <EditJob />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route path='/jobs/:id' element={<JobDetails />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route
          path="/companies/me"
          element={
            <RequireAuth>
              <RequireRole role="COMPANY">
                <CompanyProfile />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route
          path="/companies/create"
          element={
            <RequireAuth>
              <RequireRole role="COMPANY">
                <CreateCompany />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route
          path="/companies/edit"
          element={
            <RequireAuth>
              <RequireRole role="COMPANY">
                <EditCompany />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard/company"
          element={
            <RequireAuth>
              <RequireRole role="COMPANY">
                <CompanyDashboard />
              </RequireRole>
            </RequireAuth>
          }
        />
    </Routes>
  );
}

export default AppRoutes;