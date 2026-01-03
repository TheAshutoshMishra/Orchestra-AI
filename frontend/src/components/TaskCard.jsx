export default function TaskCard({ task, index }) {
  const priorityColors = {
    High: 'bg-red-100 text-red-800 border-red-300',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Low: 'bg-green-100 text-green-800 border-green-300',
  };

  const priorityColor = priorityColors[task.priority] || priorityColors.Medium;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-5 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          </div>
          <p className="text-gray-600 mb-3 ml-11">{task.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-11">
        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${priorityColor}`}>
          {task.priority} Priority
        </span>
      </div>
    </div>
  );
}
