"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";


function TaskCard({task}) {
  const router = useRouter();
  const [edit,setEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`, {
        method: "DELETE"
      });
      if (res.status == 204){
        router.refresh();
      }
    }
  };
  const handleTaskDone = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`, {
      method: "POST"
    });
    if (res.status == 200){
      router.refresh();
    }
  }
  const handleUpdate = async (id) => {
   const res =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
      method: "PUT",
      body: JSON.stringify({title: newTitle, description: newDescription}),
      headers: {"content-type": "application/json"}
    });
    const data = await res.json();
    setNewTitle(data.title);
    setNewDescription(data.description);
    setEdit(!edit);
  }
  return (
    <div 
      key={task.id} 
      className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200 flex
      justify-between items-center">
      <div>
        {
          !edit ? (
            <div>
              <h2
              className="font-bold">
              {newTitle} 
              {task.done && <span className="text-green-500">✔</span>}
              
              </h2>
              <p>{newDescription}</p>
            </div>
          ) : (
            <div
            className="w-full"
            >
              <input type="text" placeholder={task.title} 
              className="bg-slate-500 p-2 border-none outline-none text-black block"
              onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea placeholder={task.description} 
              className="bg-slate-500 p-2 border-none outline-none text-black w-full"
              onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
          )
        }
 
      </div>
      <div className="flex justify-between gap-x-2">
      {edit && (
        <button
        className="bg-slate-300 text-black rounded-md p-2"
        onClick={() => handleUpdate(task.id)}
        >
          Guardar
        </button>
      )}
      <button
      className={" text-white rounded-md p-2" + (task.done ? " bg-gray-500" : " bg-green-500")}
      onClick={() => handleTaskDone(task.id)}>
        {(task.done ? "Desmarcar" : "Marcar")}
      </button>

      <button
      className="bg-red-500 text-white rounded-md p-2"
      onClick={() => handleDelete(task.id)}>
        Eliminar
      </button>
      
      <button
      className="bg-indigo-500 text-white rounded-md p-2"
      onClick={() =>setEdit(!edit)}>
        Editar
      </button>
      </div>

    </div>  
  );
}

export default TaskCard;