import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Board from './pages/Boards/_id.jsx';
import NotFound from './pages/404/NotFound.jsx';
import Auth from './pages/Auth/Auth.jsx';
import AccountVerification from './pages/Auth/AccountVerification.jsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/User/userSlice.js';
import Settings from './pages/Settings/Settings.jsx';
import Boards from './pages/Boards/index.jsx';
const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};
function App() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Routes>
      {/* Redirect route */}
      <Route path="/" element={<Navigate to="/boards" replace={true} />} />
      {/* Board Details */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<Board />} />
        {/* User Setting */}
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>

      {/* 404 not foundpage  */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />
      <Route path="*" element={<NotFound />} />
      <Route />
    </Routes>
  );
}

export default App;
