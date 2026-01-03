export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        <p className="mt-4 text-center text-gray-600 font-medium">Generating tasks...</p>
      </div>
    </div>
  );
}
