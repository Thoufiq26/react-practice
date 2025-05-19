import React, { useState } from "react";


function KanbanBoard() {
  const [task, setTask] = useState("");
  const [tasks, setnewTasks] = useState("");
  const [draggedElement,setDraggedElement]=useState(null);

  const handleDragStart=(e)=>{
    setDraggedElement(e.target)
  }

  const handleDrop=(e)=>{
    e.preventDefault();
    if(draggedElement){
        e.target.appendChild(draggedElement);
        setDraggedElement(null);
    }
  }

  function addTask() {
    setnewTasks([...tasks, task]);
    console.log(tasks);
  }

  


  return (
    <div className="kanban">
      <h2>Kanban Board</h2>
      <div className="boards">
        
        <div className="b1 bx1" 
         
        >
          <h2 className="to-do">TO-DO</h2>
          <div className="inner-content">
            <input
              type="text"
              name="task"
              id="task"
              onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTask}>Add</button>
         
            {tasks.length === 0 ? (
              <div >No Tasks added</div>
            ) : (
              tasks.map((item) => (
                  <div draggable="true" onDragStart={handleDragStart}>{item}</div>
              ))
            )}
          </div>
         
        </div>
        
        <div className="b1 bx2"
        onDragOver={(e)=>e.preventDefault()} 
        onDrop={handleDrop}
         >
          <h2 className="in-pro"  
          >IN PROGRESS</h2>
          
        </div>
       
        <div className="b1 bx3" 
         onDragOver={(e)=>e.preventDefault()} 
         onDrop={handleDrop} >
          <h2 className="done">DONE</h2>
          
        </div>
      </div>
    
    </div>
  );
}

export default KanbanBoard;
