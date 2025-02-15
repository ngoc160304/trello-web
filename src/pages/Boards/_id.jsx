import Container from '@mui/material/Container';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import AppBar from '../../components/AppBar/AppBar';
import { useEffect, useState } from 'react';
import { mockData } from '../../apis/mock-data';
import { fetchBoardDetailsAPI } from '../../apis';
const Board = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = '67b03e67d2f46b2d63c07e20';
    fetchBoardDetailsAPI(boardId).then((record) => {
      setBoard(record);
    });
  }, []);
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh'
      }}
    >
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  );
};
export default Board;
