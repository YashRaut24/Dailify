import { useState } from "react";
import './Calculator.css'

function Calculator({ title, description }) {
  const [operation, setOperation] = useState('');
  const [resultDisplayed, setResultDisplayed] = useState(false);

  const displayOperation = (text) => {
    if (text === "C") { setOperation(''); setResultDisplayed(false); return; }
    if (text === "CE") { setOperation((prev) => prev.replace(/(\d+\.?\d*)$/, '')); return; }
    if (text === "=") {
      try {
        const evalStr = operation.replace(/×/g, '*').replace(/÷/g, '/');
        setOperation(eval(evalStr).toString());
        setResultDisplayed(true);
      } catch {
        setOperation("Error");
        setResultDisplayed(true);
      }
      return;
    }
    if (text === "⌫") {
      setOperation(prev => resultDisplayed ? '' : prev.slice(0, -1));
      setResultDisplayed(false);
      return;
    }
    if (text === "+/-") {
      setOperation(prev => {
        const match = prev.match(/(-?\d+\.?\d*)$/);
        if (match) {
          const number = match[0];
          const toggled = number.startsWith('-') ? number.slice(1) : '-' + number;
          return prev.slice(0, -number.length) + toggled;
        }
        return prev;
      });
      return;
    }
    if (text === "1/x") { try { setOperation((1 / eval(operation)).toString()); setResultDisplayed(true); } catch { setOperation("Error"); setResultDisplayed(true); } return; }
    if (text === "x²") { try { setOperation((eval(operation) ** 2).toString()); setResultDisplayed(true); } catch { setOperation("Error"); setResultDisplayed(true); } return; }
    if (text === "√x") { try { setOperation(Math.sqrt(eval(operation)).toString()); setResultDisplayed(true); } catch { setOperation("Error"); setResultDisplayed(true); } return; }

    // Continue from last result
    if (resultDisplayed) {
      if (/[0-9.]/.test(text)) { setOperation(text); } 
      else { setOperation(prev => prev + text); }
      setResultDisplayed(false);
    } else {
      setOperation(prev => {
        if (text === ".") {
          const parts = prev.split(/[\+\-\×\÷]/);
          if (parts[parts.length - 1].includes(".")) return prev;
        }
        return prev + text;
      });
    }
  };

  const buttons = [
    { label: "%", type: "operator" },
    { label: "CE", type: "operator" },
    { label: "C", type: "operator" },
    { label: "⌫", type: "operator" },
    { label: "1/x", type: "operator" },
    { label: "x²", type: "operator" },
    { label: "√x", type: "operator" },
    { label: "÷", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "×", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "-", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: "+/-", type: "number" },
    { label: "0", type: "number" },
    { label: ".", type: "number" },
    { label: "=", type: "equal" }
  ];

  return (
    <div className="tool-card expand">
      <div className="calculator">
        <div className="display">{operation}</div>
        <div className="buttons">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={`btn ${btn.type === 'operator' ? 'operator' : ''} ${btn.type === 'equal' ? 'equal' : ''}`}
              onClick={() => displayOperation(btn.label)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
