import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "./features/taskSlice";

import Button from "./conponents/Button";
import "./App.css";
import Board from "./conponents/Board";

function App() {
  const dispatch = useDispatch();


  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit form
 const handleSubmit= useCallback((e)=>{
  
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addTask(form));

    setForm({
      title: "",
      description: "",
    });

    setShowForm(false);

 },[dispatch,setForm,form])
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-10">

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          📝 Todo Application
        </h1>
        <p className="text-gray-600">
          Manage your tasks efficiently
        </p>

        <Button
          onClick={() => setShowForm((prev) => !prev)}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition"
          name={showForm ? "Close Form" : "Add Task"}
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 mb-12 animate-slideDown">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Task description"
              rows="4"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
            />

            <Button
              type="submit"
              name="Add Task"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            />
          </form>
        </div>
      )}

<Board />
      {/* Task Grid */}
    
      </div>

  );
}

export default App;
