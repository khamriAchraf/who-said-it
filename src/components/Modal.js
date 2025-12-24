export default function Modal({ isOpen, title, message, onClose, isCorrect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <div className="p-8">
          <div className={`text-5xl mb-4 ${isCorrect ? "text-green-500" : "text-red-500"}`}>
            {isCorrect ? "✓" : "✗"}
          </div>
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Next Quote
          </button>
        </div>
      </div>
    </div>
  );
}
