import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { removeTask, updateTaskStatus } from "../features/taskSlice";
import React, { useCallback } from "react";
import { updateTask } from "../features/taskSlice";
const Column = React.memo(({ title, status,count })=>{
const { task } = useSelector((state) => state.task);
const dispatch = useDispatch()
 console.log("task",task)
  const filteredTasks = task.filter((t) => t.status === status);
 const handleDrop=useCallback((e)=>{
 e.preventDefault()
       const id = e.dataTransfer.getData("taskId");
       console.log("drag,",id)
        if(id){
          dispatch(updateTaskStatus({id  , status}))
        }
 },[dispatch,status])  

 const handleDelete= (id)=>{
    if(id){
        dispatch(removeTask(id))
    }
}

 const handleUpdate = (updateTasks)=>{

   dispatch(updateTask(updateTasks))
 }
  return (
    <div     onDragOver={(e) => e.preventDefault()}  onDrop={handleDrop} className="bg-gray-100 rounded-2xl p-4 min-h-[450px] shadow-inner">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-700">
        {title}   {count}
      </h2>

      <div className="flex flex-col gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks here</p>
        ) : (
          filteredTasks.map((item) => (
            <Card key={item.id} task={item} status={status} handleDelete={()=>handleDelete(item.id)  } handleUpdate={ handleUpdate}/>
          ))
        )}
      </div>
    </div>
  );
})
export default  Column
  

