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
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep } from 'lodash';
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

  // tim column theo cardId
  const findColumnByCardId = (cardId) => {
    // dung cards.map thay vi cardOrderIds.map vi o buoc dragOver chung ta se lam du lieu cho cards hoan chinh truoc r moi tao ra cardOrderIds moi
    return orderedColumnsState.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };
  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current);
  };
  const handleDragOver = (e) => {
    // keo column thi k lam gi
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = e;
    if (!active && !over) return;
    const {
      id: activeDragingCardId,
      data: { current: activeDragingCardData }
    } = active;
    const { id: overCardId } = over;
    // tim 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDragingCardId);
    const overColumn = findColumnByCardId(overCardId);

    // neu khong ton tai 1 trong 2 column k lam j het
    if (!activeColumn || !overColumn) return;
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumnsState((prevColumns) => {
        // tim vi tri ma active card sap duoc tha
        const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId);
        let newCardIndex;
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex =
          overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id);
        const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id);
        if (nextActiveColumn) {
          //
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDragingCardId
          );
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
        }
        if (nextOverColumn) {
          //
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDragingCardId
          );
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDragingCardData
          );
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id);
        }
        return nextColumns;
      });
    }
  };
  const handleDragEnd = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('Hanh dong keo tha card - tam thoi chua lam chi');
      return;
    }

    const { active, over } = e;
    if (!active && !over) return;
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
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >
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
