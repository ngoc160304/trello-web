import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
const ListColumns = ({ columns }) => {
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
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
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
      </Box>
    </SortableContext>
  );
};
export default ListColumns;
