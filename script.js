const calculator = document.querySelector(".calculator");
const calculatorScreen = calculator.querySelector(".calculator__screen");
const calculatorBtns = calculator.querySelector(".calculator__btns");

const storage = {
  operator: null,
  num1: null,
  num2: null,
  needNum2: false,
  displayValue: "0",
};

//update screen with the stored displayValue
function updateScreen() {
  calculatorScreen.textContent = storage.displayValue;
}
updateScreen();

//display numbers on screen when number buttons are pressed
//if displayValue is 0, overwrite it. if not, add to it
//if need num 2, overwrite displayValue
function displayNumbers(num) {
  if (storage.displayValue === "0") {
    storage.displayValue = num;
  } else {
    storage.displayValue += num;
  }

  if (storage.needNum2) {
    storage.displayValue = num;
    storage.needNum2 = false;
  }
  console.log(storage);
}

//add decimal to display value (only once)
function addDecimal() {
  if (!storage.displayValue.includes(".")) {
    storage.displayValue += ".";
  }
}

//when user chooses an operator:
//if no num1: store operator, store display number as num1
function setOperator(op) {
  if (!storage.num1) {
    storage.operator = op;
    storage.num1 = storage.displayValue;
    storage.needNum2 = true;
  }

  //if ready to operate: assign display number to num2, call operate function to perform calculation and display total, assign the total to num1 and clear num2
  if (!storage.needNum2) {
    storage.num2 = storage.displayValue;
    storage.needNum2 = true;
    operate(storage.num1, storage.num2, storage.operator);
    storage.num1 = storage.displayValue;
    storage.num2 = null;
    storage.operator = op;
  }

  if (storage.needNum2) {
    storage.operator = op;
  }
  console.log(storage);
}

//when equals button is pressed:
//must have operator and num1
//if no num2, store display value. if have num2 (user is pressing equals more than once in a row), keep it the same
function getTotal() {
  console.log(storage);
  if (storage.operator && storage.num1) {
    if (!storage.num2) {
      storage.num2 = storage.displayValue;
    }

    operate(storage.num1, storage.num2, storage.operator);
    storage.num1 = storage.displayValue;
    storage.needNum2 = true;
    console.log(storage);
  }
}

//operate using stored num1, num2 and operator
//if user divides by 0, display infinity symbol
//return total, rounding to 3 decimal places
function operate(num1, num2, operator) {
  let total;
  const n1 = Number(num1);
  const n2 = Number(num2);

  if (operator === "add") {
    total = n1 + n2;
  }

  if (operator === "subtract") {
    total = n1 - n2;
  }

  if (operator === "multiply") {
    total = n1 * n2;
  }

  if (operator === "divide") {
    if (n2 === 0) {
      total = "∞";
      return total;
    } else {
      total = n1 / n2;
    }
  }
  storage.displayValue = Math.round(total * 1000) / 1000;
  updateScreen();
}

//reset storage object when user presses clear
function clearScreen() {
  storage.operator = null;
  storage.num1 = null;
  storage.num2 = null;
  storage.needNum2 = false;
  storage.displayValue = "0";
}

// delete button:
function deleteScreen() {
  if (storage.needNum2) {
    storage.operator = null;
  } else if (!storage.num1) {
    storage.displayValue = "0";
  } else {
    storage.displayValue = storage.num1;
    storage.needNum2 = true;
  }
}

//Event listener for calculator buttons
calculatorBtns.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    if (e.target.classList.contains("number")) {
      displayNumbers(e.target.id);
    }

    if (e.target.classList.contains("decimal")) {
      addDecimal();
    }

    if (e.target.classList.contains("operator")) {
      setOperator(e.target.id);
    }

    if (e.target.classList.contains("equals")) {
      getTotal();
    }

    if (e.target.classList.contains("clear")) {
      clearScreen();
    }
    if (e.target.classList.contains("delete")) {
      deleteScreen();
    }

    updateScreen();
  }
});

//keyboard support
