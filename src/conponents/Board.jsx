import { useSelector } from "react-redux";
import Column from "./Column";
import { useEffect, useState } from "react";

export default function Board() {
  const [count ,setCount] = useState({})

  const {task}= useSelector(state=>state.task)
 useEffect(()=>{
 
  const feq = {"todo":0,"progress":0,"done":0}
  task.forEach(item=>{
    feq[item.status]+=1
  })
   setCount(feq)
 },[task])

  return (
    <div className="max-w-6xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Column title="Todo" status="todo" count={count.todo} />
      <Column title="In Progress" status="progress"  count={count.progress}/>
      <Column title="Completed" status="done" count={count.done}/>
    </div>
  );
}
