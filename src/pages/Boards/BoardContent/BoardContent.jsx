import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
// import { mapOrder } from '../../../utils/sorts';
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  // MouseSensor,
  // TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  // rectIntersection,
  getFirstCollision
  // closestCenter
} from '@dnd-kit/core';
import { MouseSensor, TouchSensor } from '../../../customLibraries/DndKitSensors';
import { useCallback, useEffect, useRef, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep, isEmpty } from 'lodash';
import { generatePlaceholderCard } from '../../../utils/formatters';
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
};

const BoardContent = ({
  board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn
}) => {
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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);
  // diem va cham cuoi cung truoc do (xu ly thuat toan phat hien va cham);
  const lastOverId = useRef(null);

  // tim column theo cardId
  const findColumnByCardId = (cardId) => {
    // dung cards.map thay vi cardOrderIds.map vi o buoc dragOver chung ta se lam du lieu cho cards hoan chinh truoc r moi tao ra cardOrderIds moi
    return orderedColumnsState.find((column) =>
      column.cards.map((card) => card._id)?.includes(cardId)
    );
  };
  // cap nhat lai sate trong truong hop di chuyen card giua nhieu card khac nhau
  const moveCardBetweenDifferntColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDragingCardData
  ) => {
    setOrderedColumnsState((prevColumns) => {
      // tim vi tri ma active card sap duoc tha
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId);
      let newCardIndex;
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id);
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id);
      // column cu
      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDragingCardId
        );
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id);
      }
      if (nextOverColumn) {
        //
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDragingCardId
        );
        // const rebuild_activeDragginfCardData = {
        //   ...activeDragingCardData,
        //   columnId: nextOverColumn._id
        // };
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDragingCardData,
          columnId: nextOverColumn._id
        });
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard);
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id);
      }

      return nextColumns;
    });
  };
  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(e?.active?.data?.current);
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id));
    }
  };
  const handleDragOver = (e) => {
    // keo column thi k lam gi
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = e;
    if (!active || !over) return;
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
      moveCardBetweenDifferntColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragingCardId,
        activeDragingCardData
      );
    }
  };
  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!active || !over) return;
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
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
      // if(activeDragItemData.columnId != overColumn._id){ // kiem tra them truong hop nay
      if (oldColumnWhenDraggingCard._id != overColumn._id) {
        // keo tha giua card giua 2 column khac nhau
        moveCardBetweenDifferntColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDragingCardData
        );
      } else {
        // keo tha card trong 1 column
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId);
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );
        const dndOrderdCardIds = dndOrderedCards.map((c) => c._id);
        setOrderedColumnsState((prevColumns) => {
          const nextColumns = cloneDeep(prevColumns);
          // tim toi column dang tha
          const targetColumn = nextColumns.find((c) => c._id === overColumn._id);
          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderdCardIds;
          return nextColumns;
        });
        moveCardInTheSameColumn(dndOrderedCards, dndOrderdCardIds, oldColumnWhenDraggingCard._id);
      }
    }
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id != over.id) {
        const oldColumnIndex = orderedColumnsState.findIndex((c) => c._id === active.id);
        const newColumnIndex = orderedColumnsState.findIndex((c) => c._id === over.id);
        const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex);
        setOrderedColumnsState(dndOrderedColumns);
        moveColumns(dndOrderedColumns);
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id);
      }
    }
    // nhung data sau khi keo tha luon phai dua ve gia tri null ban dau
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
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
  // custom thuat toan va cham
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }
      // tim cac diem giao nhau, va cham voi con tro
      const pointerIntersections = pointerWithin(args);
      if (!pointerIntersections?.length) {
        return;
      }
      // thuat toan phat hien va cham se tra ve mot mang cac va cham o day
      // const intersections =
      //   pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args);

      // tim overId dau tien trong intersections o tren
      let overId = getFirstCollision(pointerIntersections, 'id');

      if (overId) {
        const checkColumn = orderedColumnsState.find((column) => column._id === overId);
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) =>
                container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id;
        }
        lastOverId.current = overId;
        return [
          {
            id: overId
          }
        ];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumnsState]
  );
  useEffect(() => {
    setOrderedColumnsState(board?.columns);
  }, [board]);

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
        <ListColumns
          columns={orderedColumnsState}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
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
