import { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display)
      const newValue = calculate(previousValue, inputValue, operation)
      
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div className="calculator-display">
        {display}
      </div>
      <div className="calculator-buttons">
        <button className="calculator-button clear" onClick={clear}>
          C
        </button>
        <button className="calculator-button" onClick={() => inputOperation('÷')}>
          ÷
        </button>
        <button className="calculator-button" onClick={() => inputOperation('×')}>
          ×
        </button>
        <button className="calculator-button" onClick={() => inputOperation('-')}>
          -
        </button>
        
        <button className="calculator-button" onClick={() => inputNumber('7')}>
          7
        </button>
        <button className="calculator-button" onClick={() => inputNumber('8')}>
          8
        </button>
        <button className="calculator-button" onClick={() => inputNumber('9')}>
          9
        </button>
        <button className="calculator-button operator" onClick={() => inputOperation('+')}>
          +
        </button>
        
        <button className="calculator-button" onClick={() => inputNumber('4')}>
          4
        </button>
        <button className="calculator-button" onClick={() => inputNumber('5')}>
          5
        </button>
        <button className="calculator-button" onClick={() => inputNumber('6')}>
          6
        </button>
        <button className="calculator-button equals" onClick={performCalculation}>
          =
        </button>
        
        <button className="calculator-button" onClick={() => inputNumber('1')}>
          1
        </button>
        <button className="calculator-button" onClick={() => inputNumber('2')}>
          2
        </button>
        <button className="calculator-button" onClick={() => inputNumber('3')}>
          3
        </button>
        <button className="calculator-button equals row-span-2" onClick={performCalculation}>
          =
        </button>
        
        <button className="calculator-button zero col-span-2" onClick={() => inputNumber('0')}>
          0
        </button>
        <button className="calculator-button" onClick={inputDecimal}>
          .
        </button>
      </div>
    </div>
  )
}

export default App
