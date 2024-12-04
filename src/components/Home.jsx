import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

const Home = () => {
  const tasks = [
    {
      id: 1,
      title: "Title1",
      task: "jasdhasjdhasjkdhajhdajkhdjkahdjkahdjkahsdjkahdjkhajkdhajkshdjkahdjkahdjkhsadbajksdbajkshdajkhdjakshdjkahdjkahdjkahdjkahdkjhasdjkhakjhdkjahsd",
    },
    { id: 2, title: "Title2", task: "Task" },
    {
      id: 3,
      title: "Tilte3",
      task: "Task hdajshajkshdkjashiuwyeouaiodsjashdjaheuywoeuioasdjsahdiuwyeowuioajdsahdiuwyeowiueiosajdhiuwyeoiwueipasjdhsaiuryweiouajdjajheuiowaeipwajdsajhrueoeipwoauesajderhyoeiuapwiaojdsahduweyrwiaoeupsadjiarhyeuayioeuaisjdahrueayeiowuaeisajdahrueayiowaueipaosdjsahfueiyroiaueiapsdnjashrfueiyrioaueisajdahyroiawueipwaojdsaklhruoeiyipwaoueasjdnahroeuaipeupadj",
    },
  ];

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
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start gap-4 border border-gray-200 dark:border-gray-700 p-4 rounded-md shadow-sm"
          >
            <Checkbox id={`task-${task.id}`} />
            <div className="flex flex-col w-full overflow-auto break-words p-2  border-gray-300">
              {" "}
              <div className=" font-bold">
                <h1>{task.title}</h1>
              </div>
              <div className="">
                <p>{task.task}</p>
              </div>
            </div>

            <Button className="h-8 w-8 p-0" size="icon" variant="destructive">
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete task</span>
            </Button>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      <form className="mt-6 flex gap-2">
        <Input
          className="flex-1"
          placeholder="Add a new task"
          type="text"
          required
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
