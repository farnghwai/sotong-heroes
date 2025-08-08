import React, { useState, useEffect } from 'react';
import { Heart, Star, Award, Waves, Fish } from 'lucide-react';

const SaveTheSotongGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('intro'); // intro, playing, result, complete
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [savedSotongs, setSavedSotongs] = useState([]);

  const sotongData = [
    {
      id: 1,
      name: "Common Squid",
      image: "🦑",
      description: "The friendly neighborhood squid!",
      threat: "Plastic pollution in the ocean",
      solution: "Use reusable bags and bottles",
      funFact: "They have 8 arms and 2 tentacles!",
      options: ["Common Squid", "Octopus", "Jellyfish"]
    },
    {
      id: 2,
      name: "Cuttlefish",
      image: "🐙",
      description: "The master of disguise!",
      threat: "Overfishing by big boats",
      solution: "Choose sustainable seafood",
      funFact: "They can change colors like a rainbow!",
      options: ["Shark", "Cuttlefish", "Whale"]
    },
    {
      id: 3,
      name: "Baby Squid",
      image: "🦑",
      description: "Tiny and adorable!",
      threat: "Ocean water getting too warm",
      solution: "Save energy at home",
      funFact: "Baby squids are smaller than your finger!",
      options: ["Baby Squid", "Shrimp", "Small Fish"]
    },
    {
      id: 4,
      name: "Giant Squid",
      image: "🦑",
      description: "The ocean giant!",
      threat: "Deep sea habitat destruction",
      solution: "Protect marine parks",
      funFact: "They can grow as long as a school bus!",
      options: ["Blue Whale", "Giant Squid", "Shark"]
    },
    {
      id: 5,
      name: "Reef Squid",
      image: "🦑",
      description: "The colorful coral friend!",
      threat: "Coral reefs getting damaged",
      solution: "Don't touch corals when swimming",
      funFact: "They live in beautiful coral gardens!",
      options: ["Reef Squid", "Sea Turtle", "Clownfish"]
    }
  ];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === sotongData[currentQuestion].name;
    
    if (isCorrect) {
      setScore(score + 1);
      setSavedSotongs([...savedSotongs, sotongData[currentQuestion]]);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentQuestion < sotongData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
        setGameState('playing');
      } else {
        setGameState('complete');
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setShowFeedback(false);
    setSavedSotongs([]);
    setGameState('intro');
  };

  const startGame = () => {
    setGameState('playing');
  };

  if (gameState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="text-6xl mb-4">🌊🦑🌊</div>
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Save the Sotong Heroes!</h1>
          <div className="text-lg text-gray-700 mb-6 space-y-3">
            <p>🎯 <strong>Mission:</strong> Learn to identify different sotong to help save them!</p>
            <p>🦸‍♀️ Become a Sotong Protector and learn how to help our ocean friends!</p>
            <p>🏆 Save all the sotong to earn your Hero Certificate!</p>
          </div>
          <button 
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            🚀 Start Your Mission!
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && !showFeedback) {
    const current = sotongData[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Heart className="text-red-500" />
                <span className="font-bold">Sotongs Saved: {savedSotongs.length}</span>
              </div>
              <div className="text-lg font-bold text-blue-800">
                Question {currentQuestion + 1} of {sotongData.length}
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-500" />
                <span className="font-bold">Score: {score}</span>
              </div>
            </div>
          </div>

          {/* Main Game */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              🔍 What type of sotong is this?
            </h2>
            
            {/* Sotong Display */}
            <div className="bg-blue-100 rounded-2xl p-8 mb-8">
              <div className="text-8xl mb-4">{current.image}</div>
              <p className="text-xl text-blue-700 italic">"{current.description}"</p>
            </div>

            {/* Answer Options */}
            <div className="grid gap-4 max-w-md mx-auto">
              {current.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg text-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    const current = sotongData[currentQuestion];
    const isCorrect = selectedAnswer === current.name;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          {isCorrect ? (
            <div>
              <div className="text-6xl mb-4">🎉✨🦑✨🎉</div>
              <h2 className="text-3xl font-bold text-green-600 mb-4">
                Amazing! You saved the {current.name}!
              </h2>
              <div className="bg-green-100 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-3">🛡️ How you're helping:</h3>
                <p className="text-lg mb-3"><strong>Threat:</strong> {current.threat}</p>
                <p className="text-lg mb-3"><strong>Solution:</strong> {current.solution}</p>
                <p className="text-lg text-blue-700"><strong>Fun Fact:</strong> {current.funFact}</p>
              </div>
              <p className="text-xl text-green-600 font-bold">🌟 You're a true Sotong Hero! 🌟</p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">💙🦑💙</div>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                Good try! This is a {current.name}
              </h2>
              <div className="bg-blue-100 rounded-2xl p-6 mb-6">
                <p className="text-lg mb-3">Don't worry - every hero learns by trying!</p>
                <p className="text-lg text-blue-700"><strong>Remember:</strong> {current.funFact}</p>
              </div>
              <p className="text-xl text-blue-600 font-bold">💪 Keep going, future Sotong Hero! 💪</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="text-6xl mb-4">🏆🦑🌟🦑🏆</div>
          <h1 className="text-4xl font-bold text-green-600 mb-6">
            Congratulations, Sotong Hero!
          </h1>
          
          <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 mb-6">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">🎖️ HERO CERTIFICATE 🎖️</h2>
            <p className="text-lg mb-2">You saved <strong>{savedSotongs.length}</strong> out of {sotongData.length} sotong!</p>
            <p className="text-lg mb-2">Final Score: <strong>{score}/{sotongData.length}</strong></p>
            <p className="text-lg text-blue-700">You're now an official Sotong Protector! 🛡️</p>
          </div>

          <div className="bg-blue-100 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3">🌊 Remember These Ocean-Saving Tips:</h3>
            <div className="text-left space-y-2">
              <p>• 🛍️ Use reusable bags and bottles</p>
              <p>• 🐟 Choose sustainable seafood</p>
              <p>• 💡 Save energy at home</p>
              <p>• 🏖️ Keep beaches clean</p>
              <p>• 🐠 Protect coral reefs</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xl text-green-600 font-bold">
              🌟 Every small action helps save our ocean friends! 🌟
            </p>
            <button 
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SaveTheSotongGame;