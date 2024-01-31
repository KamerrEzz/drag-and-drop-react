import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import List from "./components/List";
import { useState } from "react";

const data = [
  {
    title: "Task",
    type: "list",
    id: "1_asd",
    order: 0,
    cards: [
      { id: "1_card", title: "publish 1", type: "card", order: 0 },
      { id: "2_card", title: "publish 2", type: "card", order: 1 },
      { id: "3_card", title: "publish 3", type: "card", order: 2 },
      { id: "4_card", title: "publish 4", type: "card", order: 3 },
    ],
  },
  {
    title: "Complete",
    type: "list",
    id: "2_asd",
    order: 1,
    cards: [
      { id: "5_card", title: "publish 5", type: "card", order: 0 },
      { id: "6_card", title: "publish 6", type: "card", order: 1 },
      { id: "7_card", title: "publish 7", type: "card", order: 2 },
      { id: "8_card", title: "publish 8", type: "card", order: 3 },
    ],
  },
];

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const App = () => {
  const [order, setOrder] = useState(data);

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(order, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrder(items);
    }

    if (type === "card") {
      let newOrderedData = [...order];
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destList.cards) {
        destList.cards = [];
      }
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reorderedCards;
        setOrder(newOrderedData);
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        setOrder(newOrderedData);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full p-5 w-full"
          >
            {order.map((list, index) => {
              return <List key={list.id} data={list} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
