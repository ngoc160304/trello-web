import * as React from 'react';
import Typography from '@mui/material/Typography';
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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '50px';

const BoardContent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        // alignItems: 'center',
        height: (theme) => theme.trello.boardContentHeight,
        bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        p: '10px 0'
      }}
    >
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
        {/* Column */}
        <Box
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
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              sx={{
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
              variant="h6"
            >
              Column Title
            </Typography>
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
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
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
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Cart container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              padding: '0 5px',
              mx: '5px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - (${COLUMN_FOOTER_HEIGHT} + ${COLUMN_HEADER_HEIGHT}))`,
              '&::-webkit-scrollbar-thumb': {
                bgcolor: ' #ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                bgcolor: '#bfc2cf'
              }
            }}
          >
            {/* Cart list */}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardMedia
                sx={{ height: 160 }}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrKqSjtfgFeDG-AMA9B_A_u-gAhGNZFprRQ&s"
                title="green iguana"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  },
                  fontWeight: 500
                }}
              >
                <Typography>NgocDev</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Lizard</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Column action */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        {/* Column end */}
        <Box
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
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              sx={{
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
              variant="h6"
            >
              Column Title
            </Typography>
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
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
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
                <MenuItem>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',

              flexDirection: 'column',
              gap: 1,
              padding: '0 5px',
              mx: '5px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) =>
                `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - (${COLUMN_FOOTER_HEIGHT} + ${COLUMN_HEADER_HEIGHT}))`
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  },
                  fontWeight: 500
                }}
              >
                <Typography>NgocDev</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<CommentIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  10
                </Button>
              </CardActions>
            </Card>
          </Box>

          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default BoardContent;
