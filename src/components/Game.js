import { useState, useEffect } from "react";
import { getRandomQuote, people, quotes } from "@/data/quotes";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Modal from "./Modal";

const TIMER_DURATION = 20; // seconds

export default function Game() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [shuffledAuthors, setShuffledAuthors] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "", isCorrect: false, isSessionComplete: false });
  const [seenQuoteIds, setSeenQuoteIds] = useState([]);
  
  const [score, setScore, scoreLoaded] = useLocalStorage("score", 0);
  const [history, setHistory, historyLoaded] = useLocalStorage("guessHistory", []);

  // Initialize game
  useEffect(() => {
    if (scoreLoaded && historyLoaded) {
      startNewRound();
    }
  }, [scoreLoaded, historyLoaded]);

  // Timer effect
  useEffect(() => {
    if (isModalOpen || !currentQuote) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return TIMER_DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isModalOpen, currentQuote]);

  const startNewRound = (currentSeenQuoteIds = seenQuoteIds) => {
    // Get unseen quotes
    const unseenQuotes = quotes.filter(q => !currentSeenQuoteIds.includes(q.id));
    
    // If all quotes have been seen, show session complete modal
    if (unseenQuotes.length === 0) {
      setModalContent({
        title: "You've Seen All Quotes!",
        message: "Congratulations! You've gone through all the quotes in this session. Would you like to start a new session?",
        isCorrect: true,
        isSessionComplete: true,
      });
      setIsModalOpen(true);
      return;
    }
    
    // Pick a random unseen quote
    const randomIndex = Math.floor(Math.random() * unseenQuotes.length);
    const quote = unseenQuotes[randomIndex];
    
    setCurrentQuote(quote);
    setShuffledAuthors(people);
    setTimeLeft(TIMER_DURATION);
  };

  const handleAuthorClick = (author) => {
    if (isModalOpen || !currentQuote) return;

    const isCorrect = author === currentQuote.correctAuthor;
    
    // Mark quote as seen
    setSeenQuoteIds([...seenQuoteIds, currentQuote.id]);
    
    // Update score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Add to history
    const guessRecord = {
      quote: currentQuote.text,
      correctAuthor: currentQuote.correctAuthor,
      guessedAuthor: author,
      isCorrect,
      timestamp: new Date().toLocaleTimeString(),
    };
    setHistory([...history, guessRecord]);

    // Show modal
    setModalContent({
      title: isCorrect ? "Correct!" : "Wrong!",
      message: isCorrect
        ? `"${currentQuote.text}" was said by ${currentQuote.correctAuthor}`
        : `The correct answer is ${currentQuote.correctAuthor}. You guessed ${author}.`,
      isCorrect,
      isSessionComplete: false,
    });
    setIsModalOpen(true);
  };

  const handleTimeUp = () => {
    if (!currentQuote) return;
    
    // Mark quote as seen
    setSeenQuoteIds([...seenQuoteIds, currentQuote.id]);
    
    const guessRecord = {
      quote: currentQuote.text,
      correctAuthor: currentQuote.correctAuthor,
      guessedAuthor: "Time's up",
      isCorrect: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setHistory([...history, guessRecord]);

    setModalContent({
      title: "Time's Up!",
      message: `The answer was ${currentQuote.correctAuthor}. "${currentQuote.text}"`,
      isCorrect: false,
      isSessionComplete: false,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    startNewRound();
  };

  const handleStartNewSession = () => {
    setModalContent({ title: "", message: "", isCorrect: false, isSessionComplete: false });
    setIsModalOpen(false);
    setSeenQuoteIds([]);
    startNewRound([]); // Pass empty array to start fresh
  };

  if (!scoreLoaded || !historyLoaded || !currentQuote) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Who Said It?</h1>
            <p className="text-gray-600 dark:text-gray-300">Guess the author of the quote</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{score}</div>
            <p className="text-gray-600 dark:text-gray-300">Score</p>
          </div>
        </div>

        {/* Quote Card */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white text-center mb-8">
            "{currentQuote.text}"
          </p>

          {/* Timer */}
          <div className="flex justify-center mb-8">
            <div className={`text-center ${timeLeft <= 3 ? "text-red-600" : "text-blue-600"}`}>
              <div className="text-4xl font-bold">{timeLeft}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300">seconds left</p>
            </div>
          </div>

          {/* Author Buttons */}
          <div className="grid grid-cols-1 gap-4">
            {shuffledAuthors.map((author) => (
              <button
                key={author}
                onClick={() => handleAuthorClick(author)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                {author}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-300">Total Guesses</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{history.length}</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300">Accuracy</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {history.length > 0
                  ? Math.round((history.filter((g) => g.isCorrect).length / history.length) * 100)
                  : 0}
                %
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm("Are you sure? This will clear your history.")) {
                  setScore(0);
                  setHistory([]);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalContent.isSessionComplete ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="p-8">
              <div className="text-5xl mb-4 text-yellow-500">🎉</div>
              <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
                {modalContent.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {modalContent.message}
              </p>
              <button
                onClick={handleStartNewSession}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Start New Session
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Modal
          isOpen={isModalOpen}
          title={modalContent.title}
          message={modalContent.message}
          isCorrect={modalContent.isCorrect}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
