import Container from '@mui/material/Container';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import AppBar from '../../components/AppBar/AppBar';
import { useEffect, useState } from 'react';
import { generatePlaceholderCard } from '../../utils/formatters';
import { isEmpty } from 'lodash';
// import { mockData } from '../../apis/mock-data';
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '../../apis';
import { mapOrder } from '../../utils/sorts';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
const Board = () => {
  const [board, setBoard] = useState(null);
  useEffect(() => {
    const boardId = '67b03e67d2f46b2d63c07e20';
    fetchBoardDetailsAPI(boardId).then((record) => {
      record.columns = mapOrder(record?.columns, record?.columnOrderIds, '_id');
      record.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
        }
      });
      setBoard(record);
    });
    // fetchApi();
  }, []);
  // const fetchApi = async () => {
  //   const result = await fetchBoardDetailsAPI(boardId);
  //   setBoard(result);
  // };

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    });
    // console.log(createdColumn);
    // await fetchApi();
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    });
    // await fetchApi();
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId);
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
    }
    setBoard(newBoard);
  };
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    // newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    });
  };
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderdCardIds, columnId) => {
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId);
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderdCardIds;
    }
    setBoard(newBoard);
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderdCardIds
    });
  };
  // if (!board) {
  //   return (
  //     <Box>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh'
      }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
      />
    </Container>
  );
};
export default Board;
