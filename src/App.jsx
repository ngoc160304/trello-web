import { Routes, Route, Navigate } from 'react-router-dom';
import Board from './pages/Boards/_id.jsx';
import NotFound from './pages/404/NotFound.jsx';
import Auth from './pages/Auth/Auth.jsx';
function App() {
  return (
    <Routes>
      {/* Redirect route */}
      <Route path="/" element={<Navigate to="/boards/67b03e67d2f46b2d63c07e20" replace={true} />} />
      {/* Board Details */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* 404 not foundpage  */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
      <Route />
    </Routes>
  );
}

export default App;
