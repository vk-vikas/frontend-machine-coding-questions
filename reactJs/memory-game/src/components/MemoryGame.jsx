import { useState, useEffect } from "react";

const MemoryGame = () => {
  // grid size
  const [gridSize, setGridSize] = useState(4);
  // cards holds all the cards shuffled
  const [cards, setCards] = useState([]);
  // arr of 2 len, holds the indices of the flipped cards
  const [flipped, setFlipped] = useState([]);
  // stores the indices of the solved cards
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
    }
  }, [solved, cards]);

  const initializeGame = () => {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
  };

  const handleClick = (id) => {
    console.log(flipped);
    if (disabled || won) return;
    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }
    if (flipped.length === 1) {
      setDisabled(true);
      if (id !== flipped[0]) {
        setFlipped([...flipped, id]);
        checkMatch(id);
      } else {
        setFlipped([]);
        setDisabled(false);
      }
    }
  };

  const checkMatch = (secondId) => {
    // firstId, secondId are the indexes of the cards

    const [firstId] = flipped;
    if (cards[firstId].number === cards[secondId].number) {
      // if the value at the indexes are the same, add them to solved
      setSolved([...solved, firstId, secondId]);
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved = (id) => solved.includes(id);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) {
      setGridSize(size);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Memory Game</h1>

      {/* Grid size input */}
      <div className="mb-4">
        <label htmlFor="gridSize" className="mr-2">
          Grid Size: (max 10)
        </label>
        <input
          id="gridSize"
          type="number"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 border-gray-300 rounded px-2 py-1"
        />
      </div>

      {/* Game */}
      <div
        className={`grid gap-2 mb-4`}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `min(100%, ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`aspect-square flex items-center justify-center text-xl font-bold rounded-lg cursor-pointer transition-all duration-300 ${
              isFlipped(card.id)
                ? isSolved(card.id)
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-400"
            }`}
          >
            {isFlipped(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>

      {/* Result */}
      {won && (
        <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">
          You Won!
        </div>
      )}

      {/* Play Again / Reset */}
      <button
        onClick={initializeGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        {won ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
};

export default MemoryGame;
