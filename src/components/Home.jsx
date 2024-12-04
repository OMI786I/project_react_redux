import { Link } from "react-router-dom";

const Home = () => {
  const tasks = [
    { id: 1, name: "Hasan", task: "Task" },
    { id: 1, name: "Hasan", task: "Task" },
    { id: 1, name: "Hasan", task: "Task" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <Link to="/create">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600">
            Create Task
          </button>
        </Link>
      </div>

      <div className="relative overflow-x-auto rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Task
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((res) => (
              <tr key={res.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{res.id}</td>
                <td className="px-6 py-4">{res.name}</td>
                <td className="px-6 py-4">{res.task}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/update/${res.id}`}>
                    <button className="px-3 py-1 mr-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
                      Edit
                    </button>
                  </Link>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
