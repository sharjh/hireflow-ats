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

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />
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
    </Routes>
  );
}

export default AppRoutes;