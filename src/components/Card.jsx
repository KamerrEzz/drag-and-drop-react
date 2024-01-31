import { Draggable } from "@hello-pangea/dnd";

const Card = ({ data, index }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="text-white bg-gray-800/50 p-2 rounded-md"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
