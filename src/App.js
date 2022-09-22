import React from 'react';
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { refreshToken } from './store/actions/auth';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth.user);

  React.useEffect(async () => {
    if (!user) {
      dispatch(refreshToken(navigate))
    }
  })
  return (
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
  )
}

export default App;
