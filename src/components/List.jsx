import { Draggable, Droppable } from "@hello-pangea/dnd";
import Card from "./Card";

const List = ({ data, index }) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <div className="h-10 p-2 bg-white text-center">{data.title}</div>
            <div className="flex flex-col gap-3 p-3">
              <Droppable droppableId={data.id} type="card">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-3"
                  >
                    {data.cards.map((t, i) => (
                      <Card data={t} key={t.id} index={i} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
