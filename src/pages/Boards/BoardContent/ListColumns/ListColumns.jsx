import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createNewColumnAPI } from '../../../../apis';
import { generatePlaceholderCard } from '../../../../utils/formatters';
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '../../../../redux/activeBoard/activeBoardSlice';
import { useDispatch, useSelector } from 'react-redux';
const ListColumns = ({ columns }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const board = useSelector(selectCurrentActiveBoard);
  const dispatch = useDispatch();
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('dumoa m nhap di');
      return;
    }
    // console.log(newColumnTitle);
    const newColumnData = {
      title: newColumnTitle
    };
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    });
    // console.log(createdColumn);
    // await fetchApi();
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];
    // const newBoard = cloneDeep(board);
    const newBoard = { ...board };

    // newBoard.columns.push(createdColumn);
    newBoard.columns = [...newBoard.columns, createdColumn];
    // newBoard.columnOrderIds.push(createdColumn._id);
    newBoard.columnOrderIds = [...newBoard.columnOrderIds, createdColumn._id];

    dispatch(updateCurrentActiveBoard(newBoard));
    toggleNewColumnForm();
    setNewColumnTitle('');
  };
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          heigt: '100%',
          overflowX: 'auto',
          overfloY: 'hidden',
          display: 'flex',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {/* Box add new column */}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
          >
            <Button
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                py: 1,
                pl: 2
              }}
              startIcon={<NoteAddIcon />}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              data-no-dnd="true"
              value={newColumnTitle}
              onChange={(e) => {
                setNewColumnTitle(e.target.value);
              }}
              autoFocus
              id="filled-search"
              label="Enter column title"
              type="text"
              size="small"
              sx={{
                '& label': { color: 'white' },
                '& input': {
                  color: 'white'
                },
                '& label.Mui-focused': {
                  color: 'white'
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    // borderWidth: '1px !important'
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    // borderWidth: '1px !important'
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': {
                    bgcolor: (theme) => theme.palette.success.main
                  }
                }}
                onClick={addNewColumn}
                className="interceptor-loading"
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': {
                    color: (theme) => theme.palette.warning.light
                  }
                }}
                onClick={() => {
                  toggleNewColumnForm();
                  setNewColumnTitle('');
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};
export default ListColumns;
