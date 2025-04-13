import Container from '@mui/material/Container';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import AppBar from '../../components/AppBar/AppBar';
import { useEffect } from 'react';
import { cloneDeep } from 'lodash';
// import { mockData } from '../../apis/mock-data';
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '../../apis';
// import { mapOrder } from '../../utils/sorts';

import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '../../redux/activeBoard/activeBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';
import ActiveCard from '../../components/Modal/ActiveCard/ActiveCard';
const Board = () => {
  const dispatch = useDispatch();
  // const [board, setBoard] = useState(null); // dùng state của redux
  const board = useSelector(selectCurrentActiveBoard);
  const { boardId } = useParams();
  useEffect(() => {
    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch, boardId]);

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));

    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds
    });
  };
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderdCardIds, columnId) => {
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId);
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards;
      columnToUpdate.cardOrderIds = dndOrderdCardIds;
    }
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));

    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderdCardIds
    });
  };
  const moveCardToDifferentColumn = (
    currentCardId, //id card hien tai
    prevColumnId, // column truoc do
    nextColumnId, // column tiep theo
    dndOrderedColumns // board sau khi cap nhat
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));

    let prevCardOrderIds = dndOrderedColumns.find((c) => c._id === prevColumnId)?.cardOrderIds;
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)?.cardOrderIds
    });
  };
  // const deleteColumnDetails = (columnId) => {
  //   const newBoard = { ...board };
  //   newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
  //   newBoard.columnOrderIds = newBoard.columns.map((c) => c._id);
  //   // setBoard(newBoard);
  //   dispatch(updateCurrentActiveBoard(newBoard));

  //   deletecolumnDetailsAPI(columnId).then((result) => {
  //     toast.success(result.deleteResult);
  //   });
  // };
  if (!board) {
    return <PageLoadingSpinner caption={'Loading...'} />;
  }
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        height: '100vh'
      }}
    >
      <ActiveCard />
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        //
        // createNewColumn={createNewColumn}
        // createNewCard={createNewCard}
        // deleteColumnDetails={deleteColumnDetails}
        //
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  );
};
export default Board;
