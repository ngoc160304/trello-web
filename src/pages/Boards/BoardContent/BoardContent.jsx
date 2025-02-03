import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '../../../utils/sorts';
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
const BoardContent = ({ board }) => {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // });
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      // distance: 10
      delay: 250, // giu 250ms
      tolerance: 500
    }
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor); // uu tien su dung

  const [orderedColumnsState, setOrderedColumnsState] = useState([]);
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id != over.id) {
      const oldIndex = orderedColumnsState.findIndex((c) => c._id === active.id);
      const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id);
      const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex);
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
      setOrderedColumnsState(dndOrderedColumns);
    }
  };
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id');
    setOrderedColumnsState(orderedColumns);
  }, [board]);
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
        <ListColumns columns={orderedColumnsState} />
      </Box>
    </DndContext>
  );
};
export default BoardContent;
