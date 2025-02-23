import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Board from './pages/Boards/_id.jsx';
import NotFound from './pages/404/NotFound.jsx';
import Auth from './pages/Auth/Auth.jsx';
import AccountVerification from './pages/Auth/AccountVerification.jsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './redux/User/userSlice.js';
import { toast } from 'react-toastify';
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
      <Route path="/" element={<Navigate to="/boards/67b03e67d2f46b2d63c07e20" replace={true} />} />
      {/* Board Details */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path="/boards/:boardId" element={<Board />} />
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
