```javascript
// app.js - Main application JavaScript file
// Basic Calculator Application

// Constants for keyboard mapping
const KEYBOARD_MAPPING = {
  'Enter': '=',
  'Escape': 'C',
  '.': '.',
  '+': '+',
  '-': '-', 
  '*': '×',
  '/': '÷',
  'Backspace': 'DEL'
};

// Initialize calculator state
let calculatorState = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  history: [],
  newNumberFlag: false,
  errorState: false
};

// Maximum digit limit to prevent overflow
const MAX_DIGITS = 12;

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeCalculator();
  attachKeyboardEvents();
});

// Main calculator initialization
function initializeCalculator() {
  const display = document.getElementById('display');
  const historyList = document.getElementById('history');
  
  // Initialize display
  updateDisplay();

  // Add click handlers for all buttons
  document.querySelectorAll('.calculator-button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
}

// Handle keyboard input
function attachKeyboardEvents() {
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Prevent default behavior for calculator keys
    if (Object.keys(KEYBOARD_MAPPING).includes(key)) {
      event.preventDefault();
    }

    // Map number keys
    if (/^[0-9]$/.test(key)) {
      handleNumber(key);
      return;
    }

    // Map operation keys
    const mappedKey = KEYBOARD_MAPPING[key];
    if (mappedKey) {
      handleOperation(mappedKey);
    }
  });
}

// Handle numeric input
function handleNumber(num) {
  if (calculatorState.errorState) {
    return;
  }

  if (calculatorState.newNumberFlag) {
    calculatorState.currentValue = num;
    calculatorState.newNumberFlag = false;
  } else {
    // Prevent leading zeros and check maximum length
    if (calculatorState.currentValue.length >= MAX_DIGITS) {
      return;
    }
    calculatorState.currentValue = calculatorState.currentValue === '0' ? 
      num : calculatorState.currentValue + num;
  }
  
  updateDisplay();
}

// Handle decimal point
function handleDecimal() {
  if (calculatorState.errorState || 
      calculatorState.currentValue.includes('.')) {
    return;
  }

  calculatorState.currentValue += '.';
  calculatorState.newNumberFlag = false;
  updateDisplay();
}

// Handle operations
function handleOperation(operation) {
  if (calculatorState.errorState && operation !== 'C') {
    return;
  }

  switch(operation) {
    case 'C':
      resetCalculator();
      break;
    case 'DEL':
      deleteLastDigit();
      break;
    case '=':
      calculateResult();
      break;
    default:
      setOperation(operation);
  }
  
  updateDisplay();
}

// Calculate final result
function calculateResult() {
  if (!calculatorState.operator || !calculatorState.previousValue) {
    return;
  }

  const prev = parseFloat(calculatorState.previousValue);
  const current = parseFloat(calculatorState.currentValue);
  let result;

  try {
    switch(calculatorState.operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) throw new Error('Division by zero');
        result = prev / current;
        break;
      default:
        return;
    }

    // Format and validate result
    result = formatResult(result);
    
    // Add to history
    addToHistory(`${calculatorState.previousValue} ${calculatorState.operator} ${calculatorState.currentValue} = ${result}`);
    
    // Update calculator state
    calculatorState.currentValue = result;
    calculatorState.previousValue = null;
    calculatorState.operator = null;
    calculatorState.newNumberFlag = true;
    
  } catch (error) {
    handleError(error);
  }
}

// Format numeric result
function formatResult(number) {
  if (!isFinite(number)) {
    throw new Error('Result is invalid');
  }
  
  const stringResult = number.toString();
  if (stringResult.length > MAX_DIGITS) {
    if (number > 999999999999) {
      return number.toExponential(6);
    }
    return number.toPrecision(MAX_DIGITS);
  }
  return stringResult;
}

// Add entry to calculation history
function addToHistory(entry) {
  calculatorState.history.push(entry);
  if (calculatorState.history.length > 10) {
    calculatorState.history.shift();
  }
  updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
  const historyList = document.getElementById('history');
  if (historyList) {
    historyList.innerHTML = calculatorState.history
      .map(entry => `<li>${entry}</li>`)
      .join('');
  }
}

// Handle calculation errors
function handleError(error) {
  calculatorState.currentValue = 'Error';
  calculatorState.errorState = true;
  calculatorState.previousValue = null;
  calculatorState.operator = null;
  console.error('Calculator error:', error);
}

// Reset calculator state
function resetCalculator() {
  calculatorState = {
    currentValue: '0',
    previousValue: null,
    operator: null,
    history: calculatorState.history,
    newNumberFlag: false,
    errorState: false
  };
}

// Delete last entered digit
function deleteLastDigit() {
  if (calculatorState.errorState || calculatorState.newNumberFlag) {
    return;
  }
  
  calculatorState.currentValue = calculatorState.currentValue.slice(0, -1);
  if (!calculatorState.currentValue) {
    calculatorState.currentValue = '0';
  }
}

// Set operation and prepare for next number
function setOperation(op) {
  if (calculatorState.operator && !calculatorState.newNumberFlag) {
    calculateResult();
  }
  
  calculatorState.operator = op;
  calculatorState.previousValue = calculatorState.currentValue;
  calculatorState.newNumberFlag = true;
}

// Update calculator display
function updateDisplay() {
  const display = document.getElementById('display');
  if (display) {
    display.textContent = calculatorState.currentValue;
  }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    handleNumber,
    handleOperation,
    calculateResult,
    resetCalculator
  };
}
```