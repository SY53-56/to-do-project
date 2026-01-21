import { CheckCircle, Trash2, Edit2 } from "lucide-react";
import React, { useState } from "react";

const Card = React.memo(({ task, status, handleDelete, handleUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [edit, setEdit] = useState(false);

  const handleDrag = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  const saveUpdate = () => {
    handleUpdate({
      id: task.id,
      title,
      description,
    });
    setEdit(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDrag}
      className={` ${
        status === "done"
          ? "bg-green-600 text-white"
          : status === "progress"
          ? "bg-blue-600 text-white"
          : "bg-white text-black"
      } rounded-2xl p-4 shadow-md cursor-grab active:cursor-grabbing hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        {edit ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
        ) : (
          <h3 className="font-semibold text-lg">{task?.title}</h3>
        )}

        <div className="flex gap-2">
          <button className="cursor-pointer">
            <CheckCircle size={18} />
          </button>

          <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
            <Trash2 size={18} />
          </button>

          <button
            onClick={() => setEdit((prev) => !prev)}
            className="cursor-pointer"
          >
            <Edit2 size={18} />
          </button>
        </div>
      </div>

      {edit ? (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-2 border rounded-md px-2 py-1"
        />
      ) : (
        <p className="text-sm mt-2">{task?.description}</p>
      )}

      {edit && (
        <button
          onClick={saveUpdate}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          Save
        </button>
      )}

      <div className="mt-3 text-xs">Drag to move →</div>
    </div>
  );
});

export default Card;


/*export default function Card({ task }) {
  return (
    <div className="bg-white cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between">

     
      <div className="flex items-start justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h2>

        <button className="text-gray-400 hover:text-red-500 transition">
          <Trash2 size={18} />
        </button>
      </div>

    
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        {task.description}
      </p>

  
      <div className="flex items-center justify-between mt-5">
        <span className={`text-xs px-3 py-1 rounded-full font-medium 
          ${task.isCompleted 
            ? "bg-green-100 text-green-700" 
            : "bg-yellow-100 text-yellow-700"}`}
        >
          {task.isCompleted ? "Completed" : "Pending"}
        </span>

        <button className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition">
          <CheckCircle size={16} />
          Done
        </button>
      </div>
    </div>
  );
}*/