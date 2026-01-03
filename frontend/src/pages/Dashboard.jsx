import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateProjectTasks, resetGeneratedTasks, clearError } from '../redux/projectSlice';
import LoadingSpinner from './LoadingSpinner';
import TaskCard from './TaskCard';

export default function Dashboard() {
  const [goal, setGoal] = useState('');
  const dispatch = useDispatch();
  const { loading, generatedTasks, error } = useSelector((state) => state.projects);

  const handleGenerateTasks = async (e) => {
    e.preventDefault();
    if (goal.trim() === '') {
      alert('Please enter a project goal');
      return;
    }
    dispatch(generateProjectTasks(goal));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const handleReset = () => {
    setGoal('');
    dispatch(resetGeneratedTasks());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">🎼 Orchestra AI</h1>
          <p className="text-xl text-gray-600">
            Transform your project vision into actionable tasks with AI
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleGenerateTasks}>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              What do you want to build?
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Build a mobile coffee delivery app, Create a fitness tracking website..."
                className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
              <button
                onClick={handleClearError}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <LoadingSpinner />}

        {/* Tasks Display */}
        {!loading && generatedTasks.length > 0 && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Generated Tasks</h2>
                  <p className="text-gray-600 mt-1">
                    Here are the AI-generated tasks for your project
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  New Project
                </button>
              </div>

              {/* Task List */}
              <div className="mt-6">
                {generatedTasks.map((task, index) => (
                  <TaskCard key={index} task={task} index={index} />
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">📋 Next Steps</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>✓ Review the generated tasks</li>
                  <li>✓ Adjust priorities and timelines as needed</li>
                  <li>✓ Save the project to your dashboard</li>
                  <li>✓ Start tracking progress on each task</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && generatedTasks.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to get started?</h2>
            <p className="text-gray-600">
              Enter your project goal above, and Orchestra AI will generate a complete task breakdown
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
