import Box from '@mui/material/Box';
import Card from './Card/Card';

const ListCards = ({ cards }) => {
  return (
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
  );
};
export default ListCards;
