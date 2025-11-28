import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNum = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
    } else if (operator) {
      const result = calculate();
      setDisplay(String(result));
      setPrevValue(result);
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    const current = parseFloat(display);
    if (prevValue === null || !operator) return current;

    switch (operator) {
      case '+': return prevValue + current;
      case '-': return prevValue - current;
      case '×': return prevValue * current;
      case '÷': return prevValue / current;
      default: return current;
    }
  };

  const handleEqual = () => {
    if (!operator) return;
    const result = calculate();
    setDisplay(String(result));
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const btnClass = "flex-1 p-3 text-lg font-medium hover:bg-gray-100 transition-colors border-t border-r border-gray-100";
  const opClass = "flex-1 p-3 text-lg font-medium bg-gray-50 hover:bg-gray-200 transition-colors border-t border-r border-gray-100 text-blue-600";

  return (
    <div className="h-full flex flex-col bg-[#f3f3f3]">
      <div className="h-24 flex items-end justify-end px-4 pb-2 text-4xl font-light bg-[#f3f3f3] select-all">
        {display}
      </div>
      <div className="flex-1 grid grid-cols-4 grid-rows-5 bg-white border-t">
        <button onClick={handleClear} className="col-span-3 p-3 text-sm font-bold bg-gray-50 hover:bg-gray-100 border-t border-r">C</button>
        <button onClick={() => handleOp('÷')} className={opClass}>÷</button>
        
        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNum(String(n))} className={btnClass}>{n}</button>)}
        <button onClick={() => handleOp('×')} className={opClass}>×</button>
        
        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNum(String(n))} className={btnClass}>{n}</button>)}
        <button onClick={() => handleOp('-')} className={opClass}>−</button>
        
        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNum(String(n))} className={btnClass}>{n}</button>)}
        <button onClick={() => handleOp('+')} className={opClass}>+</button>
        
        <button onClick={() => handleNum('0')} className="col-span-2 p-3 text-lg font-medium hover:bg-gray-100 border-t border-r">0</button>
        <button onClick={() => handleNum('.')} className={btnClass}>.</button>
        <button onClick={handleEqual} className="p-3 bg-blue-500 hover:bg-blue-600 text-white border-t border-r">=</button>
      </div>
    </div>
  );
};

export default Calculator;