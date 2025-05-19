import React, { useState, useEffect } from 'react';
import d1 from "./assets/d-1.png";
import d2 from "./assets/d-2.png";
import d3 from "./assets/d-3.png";
import d4 from "./assets/d-4.png";
import d5 from "./assets/d-5.png";
import d6 from "./assets/d-6.png";
import { auth, db } from './Firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

function Game() {
  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [selectedBet, setSelectedBet] = useState('');
  const [diceSum, setDiceSum] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const diceImages = [null, d1, d2, d3, d4, d5, d6];

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserDetails(data);
            setBalance(data.Balance || 0);
          } else {
            toast.error("User data not found!");
          }
        } catch (error) {
          toast.error("Error fetching user data: " + error.message);
        }
      } else {
        toast.error("User not logged in!");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const updateBalanceInFirestore = async (newBalance) => {
    if (auth.currentUser) {
      try {
        const userRef = doc(db, "Users", auth.currentUser.uid);
        await updateDoc(userRef, { Balance: newBalance });
        setBalance(newBalance);
      } catch (error) {
        toast.error("Error updating balance: " + error.message);
      }
    }
  };

  const rollDice = () => {
    if (!selectedBet) {
      toast.error("Please select a bet!");
      return;
    }
    if (betAmount <= 0 || betAmount > balance) {
      toast.error("Invalid bet amount!");
      return;
    }
    if (isRolling) {
      return; 
    }

    setIsRolling(true);

    setTimeout(() => {
      const dice1 = Math.floor(Math.random() * 6) + 1;
      const dice2 = Math.floor(Math.random() * 6) + 1;
      const sum = dice1 + dice2;

      setNumber1(dice1);
      setNumber2(dice2);
      setDiceSum(sum);

      let message = '';
      let newBalance = balance;

      if (selectedBet === 'seven-up' && sum > 7) {
        message = 'You win! ';
        newBalance += betAmount;
      } else if (selectedBet === 'seven-down' && sum < 7) {
        message = 'You win! ';
        newBalance += betAmount;
      } else if (selectedBet === 'exactly-seven' && sum === 7) {
        message = 'You win! ';
        newBalance += betAmount * 4;
      } else {
        message = 'You lose. Better luck next time! ';
        newBalance -= betAmount;
      }

      setResultMessage(message);
      updateBalanceInFirestore(newBalance);
      setIsRolling(false);
    }, 1000); 
  };

  const selectBet = (bet) => {
    setSelectedBet(bet);
  };

  const Logout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (e) {
      toast.error("Error logging out: " + e.message);
    }
  };

  return (
    <div>
      {userDetails ? (
        <>
          <h1 className='welcome'>Welcome {userDetails.firstName}</h1>
          <button type="submit" className="logout" onClick={Logout}>
            Log Out
          </button>
          <h1 className="game-title">🎲 7 UP/DOWN DICE GAME 🎲</h1>
          <div className="balance-display">
            Balance: $<span id="balance">{balance}</span>
          </div>

          <div className="container">
            <div className="betting-option div1" onClick={() => selectBet('seven-up')}>
              7 UP
            </div>
            <div className="betting-option div2" onClick={() => selectBet('exactly-seven')}>
              EXACTLY 7
            </div>
            <div className="betting-option div3" onClick={() => selectBet('seven-down')}>
              7 DOWN
            </div>
          </div>

          <div className="result-container">
            <input
              type="number"
              id="bet-amount"
              className="bet-input"
              placeholder="Enter bet amount"
              min="10"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
            />
            <button className="bet-button" onClick={rollDice} disabled={isRolling}>
              ROLL
            </button>
          </div>

          <div className="payout-info">
            <div className="payout-card">7 UP: 1x</div>
            <div className="payout-card">EXACTLY 7: 4x</div>
            <div className="payout-card">7 DOWN: 1x</div>
          </div>

          <div className="dice-container">
            <img
              src={diceImages[number1]}
              alt="dice1"
              className={`dice ${isRolling ? 'rolling' : ''}`}
            />
            <img
              src={diceImages[number2]}
              alt="dice2"
              className={`dice ${isRolling ? 'rolling' : ''}`}
            />
          </div>

          <div className="dice-sum">
            Sum: <span id="dice-sum">{diceSum}</span>
          </div>

          <h1 className="result-message" id="result-message">
            {resultMessage}
          </h1>
        </>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
}

export default Game;