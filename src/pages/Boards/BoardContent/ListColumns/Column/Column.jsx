import * as React from 'react';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import AddCardIcon from '@mui/icons-material/AddCard';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListCards from './ListCards/ListCards';
// import { mapOrder } from '../../../../../utils/sorts';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { useConfirm } from 'material-ui-confirm';
import { createNewCardAPI, deletecolumnDetailsAPI } from '../../../../../apis';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '../../../../../redux/activeBoard/activeBoardSlice';
import { cloneDeep } from 'lodash';
import ToggleFocusInput from '../../../../../components/Form/ToggleFocusInput';
import { updateColumnDetailsAPI } from '../../../../../apis';
const Column = ({ column }) => {
  // const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
  const [openNewCardForm, setOpenNewCardForm] = React.useState(false);
  const toggleNewCardForm = () => setOpenNewCardForm(!openNewCardForm);
  const [newCardTitle, setNewCardTitle] = React.useState('');

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('dumoa m nhap di', {
        position: 'bottom-right'
      });
      return;
    }
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    };
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    });
    // await fetchApi();
    const newBoard = cloneDeep(board); // tương như create column
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId);
    if (columnToUpdate) {
      if (columnToUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard];
      } else {
        columnToUpdate.cards.push(createdCard);
        columnToUpdate.cardOrderIds.push(createdCard._id);
      }
    }
    // setBoard(newBoard);
    dispatch(updateCurrentActiveBoard(newBoard));
    // console.log(newColumnTitle);
    toggleNewCardForm();
    setNewCardTitle('');
  };
  // mui reusable components (research)

  const board = useSelector(selectCurrentActiveBoard);
  const dispatch = useDispatch();
  const confirmDeleteColumn = useConfirm();
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      description: 'This action will permanently delete you Column forerver',
      title: 'Delete column ?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      // allowClose: false,
      // // dialogProps: {
      // //   maxWidth: 'xs'
      // // },
      // confirmationButtonProps: {
      //   color: 'secondary',
      //   variant: 'outlined'
      // },
      // cancellationButtonProps: {
      //   color: 'inherit',
      //   variant: 'outlined'
      // },
      // confirmationKeyword: 'ngocdev', //phan nhap chu ngocdev moi confirm
      buttonOrder: ['confirm', 'cancel']
    })
      .then(() => {
        const newBoard = { ...board };
        newBoard.columns = newBoard.columns.filter((c) => c._id !== column._id);
        newBoard.columnOrderIds = newBoard.columns.map((c) => c._id);
        // setBoard(newBoard);
        dispatch(updateCurrentActiveBoard(newBoard));
        deletecolumnDetailsAPI(column._id).then((result) => {
          toast.success(result.deleteResult);
        });
      })
      .catch(() => {});
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // dnd
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  });

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    // touchAction: 'none',
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  };
  const onUpdateColumnTitle = (newTitle) => {
    updateColumnDetailsAPI(column._id, {
      title: newTitle
    }).then(() => {
      const newBoard = cloneDeep(board);
      const columnToUpdate = newBoard.columns.find((c) => c._id === column._id);
      if (columnToUpdate) {
        columnToUpdate.title = newTitle;
      }
      dispatch(updateCurrentActiveBoard(newBoard));
    });
  };
  return (
    // Column
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Column menu, title */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <ToggleFocusInput
            value={column?.title}
            onChangedValue={onUpdateColumnTitle}
            data-no-dnd={true}
          />
          {/* <Typography
            sx={{
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
            variant="h6"
          >
            {column?.title}
          </Typography> */}
          <Box>
            <Tooltip title="More option">
              <KeyboardArrowDownIcon
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer'
                }}
                id="basic-button-dropdown"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-button-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-forerver-icon': {
                      color: 'success.light'
                    }
                  }
                }}
                onClick={toggleNewCardForm}
              >
                <ListItemIcon className="add-forerver-icon">
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Pase</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <TurnedInNotIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forerver-icon': {
                      color: 'warning.dark'
                    }
                  }
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" className="delete-forerver-icon" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Cart container */}
        <ListCards cards={column?.cards} />
        {/* Column action */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button
                startIcon={<AddCardIcon />}
                onClick={toggleNewCardForm}
                className="interceptor-loading"
              >
                Add new Card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <TextField
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => {
                  setNewCardTitle(e.target.value);
                }}
                autoFocus
                id="filled-search"
                label="Enter card title"
                type="text"
                size="small"
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      // borderWidth: '1px !important'
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&:hover fieldset': {
                      // borderWidth: '1px !important'
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
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
                  data-no-dnd="true"
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
                  onClick={addNewCard}
                  className="interceptor-loading"
                >
                  Add
                </Button>
                <CloseIcon
                  data-no-dnd="true"
                  fontSize="small"
                  sx={{
                    // color: 'white',
                    cursor: 'pointer',
                    color: (theme) => theme.palette.warning.light
                  }}
                  onClick={() => {
                    toggleNewCardForm();
                    setNewCardTitle('');
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};
export default Column;
