import React, { useState, useEffect } from 'react';
import './App.css';

const HiddenWordWithTimer = () => {
  const hiddenWord = 're-school'; 
  const [inputValue, setInputValue] = useState(''); 
  const [typedWords, setTypedWords] = useState(''); 
  const [isGuessed, setIsGuessed] = useState(false); 
  const [time, setTime] = useState(0); 
  const [isActive, setIsActive] = useState(false); 
  const [isPaused, setIsPaused] = useState(false); 

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Backspace') {
        setTypedWords((prev) => prev.slice(0, -1));
      } else {
        setTypedWords((prev) => prev + event.key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (typedWords.includes(hiddenWord)) {
      setIsGuessed(true);
    } else {
      setIsGuessed(false);
    }
  }, [typedWords]);

  useEffect(() => {
    let timer;
    if (isActive && !isPaused) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isPaused]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTime(0);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTypedWords((prev) => prev + inputValue);
    setInputValue('');
  };

  const handleClear = () => {
    setTypedWords('');
  };

  return (
    <div className="outer-container">
      <div className="container">
        <h1>გამარჯობა, მასწავლებელო... აბა, გამოიცანით სიტყვა!</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange} 
            placeholder="აქ ჩაწერე, აქ" 
          />
        </form>
        <button onClick={handleClear}>რესეტი</button>
        {isGuessed && (
          <div className="info-container">
            <h2>საღოლ მას, აპლოდისმენტები! დამალული სიტყვა მართლაც "{hiddenWord}"-ია</h2>
          </div>
        )}
        <h2>ტაიმერი: {time} წამი</h2>
        <div>
          {!isActive && !isPaused ? (
            <button onClick={startTimer}>დაწყება</button>
          ) : isPaused ? (
            <button onClick={resumeTimer}>გაგრძელება("JOJO" გაგიგონიათ? 'Dio Brando"-ს გავხართ,მაგიც დროს აჩერებს)</button>
          ) : (
            <button onClick={pauseTimer}>შეჩერება</button>
          )}
          <button onClick={resetTimer}>რესეტი</button>
        </div>
      </div>
    </div>
  );
};

export default HiddenWordWithTimer;

