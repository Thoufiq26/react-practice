// src/SnakeAndLadders.jsx
import React, { useState, useEffect, useCallback } from 'react';
import d1 from './assets/d-1.png';
import d2 from './assets/d-2.png';
import d3 from './assets/d-3.png';
import d4 from './assets/d-4.png';
import d5 from './assets/d-5.png';
import d6 from './assets/d-6.png';

const diceImages = [d1, d2, d3, d4, d5, d6];

const ladders = { 5: 58, 14: 49, 53: 72, 64: 83 };
const snakes = { 38: 20, 51: 10, 76: 54, 97: 61, 91: 73 };

function SnakeAndLadders() {
  const [players, setPlayers] = useState([
    { id: 1, count: 0, color: '#ff4444' },
    { id: 2, count: 0, color: '#00b7eb' },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [status, setStatus] = useState("Player 1's Turn");
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [confetti, setConfetti] = useState([]);

  // Play dice sound
  const playDiceSound = useCallback(() => {
    try {
      const dice = new Audio('/assets/dice-142528.mp3');
      dice.play();
    } catch (e) {
      console.log('Sound not available');
    }
  }, []);

  // Play win sound
  const playWinSound = useCallback(() => {
    try {
      const win = new Audio('/assets/mixkit-game-level-completed-2059.wav');
      win.play();
    } catch (e) {
      console.log('Sound not available');
    }
  }, []);

  // Create confetti effect
  const createConfetti = useCallback(() => {
    const newConfetti = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      left: Math.random() * 100,
      color: ['#ffd700', '#ff4444', '#00b7eb', '#ffffff'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 2,
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 3000);
  }, []);

  // Place player token on board
  const placeToken = useCallback((player, position) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === player.id ? { ...p, count: position } : p
      )
    );
  }, []);

  // Move player with animation
  const movePlayer = useCallback(
    (player, targetPosition, onComplete) => {
      setIsMoving(true);
      let currentPos = player.count;
      const steps = Array.from(
        { length: targetPosition - currentPos },
        (_, i) => currentPos + i + 1
      );

      const executeStep = (index) => {
        if (index >= steps.length) {
          placeToken(player, targetPosition);
          setIsMoving(false);
          onComplete();
          return;
        }
        placeToken(player, steps[index]);
        setTimeout(() => executeStep(index + 1), 300);
      };

      executeStep(0);
    },
    [placeToken]
  );

  // Handle snakes or ladders
  const handleSnakeOrLadder = useCallback(
    (player, position, onComplete) => {
      let targetPosition = position;
      let message = '';

      if (position in ladders) {
        targetPosition = ladders[position];
        message = `Player ${player.id} climbs a ladder to ${targetPosition}!`;
      } else if (position in snakes) {
        targetPosition = snakes[position];
        message = `Player ${player.id} slides down a snake to ${targetPosition}!`;
      }

      if (targetPosition !== position) {
        setStatus(message);
        setTimeout(() => {
          placeToken(player, targetPosition);
          onComplete();
        }, 500);
      } else {
        onComplete();
      }
    },
    [placeToken]
  );

  // Check for win
  const checkWin = useCallback(
    (player) => {
      if (player.count === 100) {
        setGameOver(true);
        setStatus(`Player ${player.id} wins!`);
        setWinner(player.id);
        playWinSound();
        createConfetti();
        return true;
      }
      return false;
    },
    [playWinSound, createConfetti]
  );

  // Switch player
  const switchPlayer = useCallback(() => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    setStatus(`Player ${currentPlayer === 1 ? 2 : 1}'s Turn`);
  }, [currentPlayer]);

  // Roll dice
  const roll = useCallback(
    (playerId) => {
      if (playerId !== currentPlayer || isMoving || gameOver) return;

      playDiceSound();
      const newDiceValue = Math.ceil(Math.random() * 6);
      setIsRolling(true);
      setTimeout(() => {
        setDiceValue(newDiceValue);
        setIsRolling(false);
      }, 500);

      const player = players.find((p) => p.id === playerId);
      const targetPosition = player.count + newDiceValue;

      setStatus(`Player ${playerId} rolled ${newDiceValue}`);

      if (targetPosition > 100) {
        setStatus(`Player ${playerId} needs exact roll to reach 100!`);
        setTimeout(() => {
          if (newDiceValue !== 6) {
            switchPlayer();
          } else {
            setStatus(`Player ${playerId} rolled a 6! Roll again.`);
          }
        }, 1000);
        return;
      }

      setTimeout(() => {
        movePlayer(player, targetPosition, () => {
          handleSnakeOrLadder(player, targetPosition, () => {
            if (!checkWin(player)) {
              if (newDiceValue !== 6) {
                switchPlayer();
              } else {
                setStatus(`Player ${playerId} rolled a 6! Roll again.`);
              }
            }
          });
        });
      }, 700);
    },
    [
      currentPlayer,
      isMoving,
      gameOver,
      players,
      playDiceSound,
      movePlayer,
      handleSnakeOrLadder,
      checkWin,
      switchPlayer,
    ]
  );

  // Initialize game
  useEffect(() => {
    setStatus(`Player ${currentPlayer}'s Turn`);
  }, [currentPlayer]);

  return (
    <div className="main">
      <div className="game-container">
        <div className="title">Snakes and Ladders</div>
        <div className="status">{status}</div>
        <div className="containers">
          {Array.from({ length: 100 }, (_, i) => 100 - i).map((num) => (
            <div key={num} className={`div div${num}`}>
              {num}
              {players.map(
                (player) =>
                  player.count === num && (
                    <div
                      key={player.id}
                      style={{ backgroundColor: player.color }}
                    ></div>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="controls">
        <div className="button">
          <button
            onClick={() => roll(1)}
            disabled={currentPlayer !== 1 || isMoving || gameOver}
          >
            Player 1 Roll
          </button>
          <button
            onClick={() => roll(2)}
            disabled={currentPlayer !== 2 || isMoving || gameOver}
          >
            Player 2 Roll
          </button>
        </div>
        <div className="imgg">
          <img
            src={diceImages[diceValue - 1]}
            alt="Dice"
            width={100}
            height={100}
            className={isRolling ? 'rolling' : ''}
          />
        </div>
      </div>
      <div className={`win-overlay ${winner ? 'show' : ''}`}>
        <div>
          Player <span>{winner}</span> Wins!
        </div>
      </div>
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            left: `${c.left}vw`,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default SnakeAndLadders;