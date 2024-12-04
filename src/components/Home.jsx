import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addTask } from "@/TodoReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const task = useSelector((state) => state.tasks);
  console.log(task);

  const onSubmit = (data) => {
    dispatch(
      addTask({
        id: task.length > 0 ? task[task.length - 1].id + 1 : 1,
        title: data.title,
        task: data.task,
      })
    );

    console.log(data);
    reset();
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

      {/* Task List */}
      <div className="space-y-4 border">
        {task.length == 0 ? (
          <p className="text-center my-5">Please add a task</p>
        ) : (
          task.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-4 border border-gray-200 dark:border-gray-700 p-4 rounded-md shadow-sm"
            >
              <Checkbox id={`task-${task.id}`} />
              <div className="flex flex-col w-full overflow-auto break-words p-2 border-gray-300">
                <div className="font-bold">
                  <h1>{task.title}</h1>
                </div>
                <div>
                  <p>{task.task}</p>
                </div>
              </div>

              <Button
                className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700 rounded-lg text-white"
                size="icon"
                variant="destructive"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete task</span>
              </Button>
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
        <Button
          type="submit"
          className="bg-green-600 text-white hover:bg-green-700"
          variant="default"
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default Home;
