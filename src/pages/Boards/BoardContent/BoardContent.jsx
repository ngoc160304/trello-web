import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '../../../utils/sorts';
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
};
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

  // overlay dnd
  // cùng một thời điểm chỉ có một phẩn tử được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);

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
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };
  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current);
  };

  // hieu ung tha column , card
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  };
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id');
    setOrderedColumnsState(orderedColumns);
  }, [board]);
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
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
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  );
};
export default BoardContent;
