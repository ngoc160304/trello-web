import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
const ListColumns = ({ columns }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const addNewColumn = () => {
    if (!newColumnTitle) {
      // console.error('dumoa m nhap di');
      return;
    }
    // console.log(newColumnTitle);
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
        {columns.map((column) => (
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
