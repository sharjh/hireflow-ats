import { Routes, Route } from 'react-router';

//public pages
import Home from '../pages/public/Home';
import Jobs from '../pages/public/Jobs';
import JobDetails from '../pages/public/JobDetails';

//auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/jobs/:id' element={<JobDetails />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;