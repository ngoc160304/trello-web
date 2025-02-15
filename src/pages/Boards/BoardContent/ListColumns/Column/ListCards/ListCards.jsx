import Box from '@mui/material/Box';
import Card from './Card/Card';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
const ListCards = ({ cards }) => {
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '0 5px 5px 5px',
          mx: '5px',
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - (${theme.trello.columnHeaderHeight} + ${theme.trello.columnFooterHeight}))`,
          '&::-webkit-scrollbar-thumb': {
            bgcolor: ' #ced0da'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            bgcolor: '#bfc2cf'
          }
        }}
      >
        {/* Cart list */}
        {cards.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  );
};
export default ListCards;
