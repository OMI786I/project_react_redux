import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addTask, deleteTask, toggleUpdate, updateTask } from "@/TodoReducer";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [selectedTask, setSelectedTask] = useState(null);
  const [toggle, setToggle] = useState(false);

  const [search, setSearch] = useState("");
  console.log(search);
  const task = useSelector((state) => state.tasks);
  console.log(task);
  const [filteredData, setFilteredData] = useState(task);
  const handleFilter = (type) => {
    switch (type) {
      case "all":
        setFilteredData(task);
        break;
      case "completed":
        setFilteredData(task.filter((t) => t.completed === true));
        break;
      case "pending":
        setFilteredData(task.filter((t) => t.completed === false));
        break;
      case "overdue":
        setFilteredData(
          task.filter((t) => new Date(t.date) < new Date() && !t.completed)
        );
        break;
      default:
        setFilteredData(task);
    }
  };
  useEffect(() => {
    setFilteredData(task);
  }, [task]);
  const handleToggle = (id, status) => {
    const handlestatus = !status;
    console.log(id, handlestatus, toggle);
    dispatch(
      toggleUpdate({
        id: id,
        completed: handlestatus,
      })
    );
    console.log(task);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    const filteredTasks = task.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredTasks);
  };

  const onSubmit = (data) => {
    const newId = task.length > 0 ? task[task.length - 1].id + 1 : 1;

    dispatch(
      addTask({
        id: newId,
        title: data.title,
        task: data.task,
        date: data.date,
      })
    );

    reset();
  };

  // Click on the update button
  const handleUpdate = (id) => {
    const filteredTask = task.find((t) => t.id === id);
    setSelectedTask(filteredTask);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask({ id: id }));
  };

  const onSubmit2 = (e) => {
    e.preventDefault();
    console.log("Updated Task:", selectedTask);
    dispatch(
      updateTask({
        id: selectedTask.id,
        title: selectedTask.title,
        task: selectedTask.task,
      })
    );

    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center">To-Do List</h1>
        <p className="text-center text-gray-600">
          Add and manage your tasks efficiently.
        </p>
      </header>
      {task.length != 0 ? (
        <label className="input input-bordered flex items-center gap-2 my-5">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      ) : (
        ""
      )}

      {task.length != 0 ? (
        <div className="flex justify-between">
          <p className="font-bold">Completed</p>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary btn-sm m-1"
            >
              Sort
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => handleFilter("all")}>All Tasks</a>
              </li>
              <li>
                <a onClick={() => handleFilter("completed")}>Completed Tasks</a>
              </li>
              <li>
                <a onClick={() => handleFilter("pending")}>Pending Tasks</a>
              </li>
              <li>
                <a onClick={() => handleFilter("overdue")}>Overdue Tasks</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="space-y-4 border">
        {filteredData.length == 0 ? (
          <p className="text-center my-5">Please add a task</p>
        ) : (
          filteredData.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-around gap-4 border border-gray-200 dark:border-gray-700 p-4 rounded-md shadow-sm"
            >
              <input
                type="checkbox"
                onChange={() => handleToggle(task.id, task.completed)}
              />

              <div className="flex flex-col w-full overflow-auto break-words p-2 border-gray-300">
                <div className="font-bold">
                  <h1>{task.title}</h1>
                </div>
                <div>
                  <p>{task.task}</p>
                </div>
                <div>
                  <p>{task.date}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="tooltip" data-tip="Delete">
                  {" "}
                  <Button
                    className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700 rounded-lg text-white"
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete task</span>
                  </Button>
                </div>
                <div className="tooltip modal-action" data-tip="Update">
                  {" "}
                  <Button
                    className="h-8 w-8 p-0 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white"
                    size="icon"
                    variant="destructive"
                    onClick={() => handleUpdate(task.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Update task</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex gap-2">
        <Input
          className="flex-1"
          placeholder="Add a title"
          type="text"
          {...register("title", { required: true })}
        />
        <Input
          className="flex-1"
          placeholder="Add a new task"
          type="text"
          {...register("task", { required: true })}
        />
        <Input
          className="flex-1"
          placeholder="Add a new task"
          type="date"
          {...register("date", { required: true })}
        />
        <Button
          type="submit"
          className="bg-green-600 text-white hover:bg-green-700"
          variant="default"
        >
          Add Task
        </Button>
      </form>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex  items-center justify-center">
          <div
            className="fixed inset-0 bg-white opacity-50  mx-auto"
            onClick={closeModal}
          ></div>

          <div className="modal mx-auto  modal-open modal-box bg-white rounded-lg p-4 z-50 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Update Task
            </h2>
            <form onSubmit={onSubmit2}>
              <div className="mb-4">
                <label htmlFor="title" className="label">
                  <span className="label-text text-white">Task Title</span>
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter task title"
                  className="input input-bordered w-full"
                  value={selectedTask?.title || ""}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, title: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label htmlFor="task" className="label">
                  <span className="label-text text-white">
                    Task Description
                  </span>
                </label>
                <textarea
                  id="task"
                  placeholder="Enter task description"
                  className="textarea textarea-bordered w-full"
                  value={selectedTask?.task || ""}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, task: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
