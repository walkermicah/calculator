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
  const { displayValue } = storage;
  calculatorScreen.textContent = displayValue;
}
updateScreen();

//display numbers on screen when number buttons are pressed
//if displayValue is 0, overwrite it. if not, add to it
//if need num 2, overwrite displayValue
function displayNumbers(num) {
  let { displayValue } = storage;
  let { needNum2 } = storage;

  if (displayValue === "0") {
    storage.displayValue = num;
  } else {
    storage.displayValue += num;
  }

  if (needNum2) {
    storage.displayValue = num;
    storage.needNum2 = false;
  }
  console.log(storage);
}

//add decimal to display value (only once)
function addDecimal() {
  const { displayValue } = storage;

  if (!displayValue.includes(".")) {
    storage.displayValue += ".";
  }
}

//when user chooses an operator:
//if no num1, store operator, store display numbers as num1
function setOperator(op) {
  const { num1, displayValue } = storage;

  if (!num1) {
    storage.operator = op;
    storage.num1 = displayValue;
    storage.needNum2 = true;
    console.log(storage);
  }

  //if ready to operate, assign display numbers to num2, operate, display total, assign the total to num1 and clear num2
  if (storage.needNum2 === false) {
    storage.num2 = displayValue;
    storage.needNum2 = true;
    operate(storage.num1, storage.num2, storage.operator);
    storage.num1 = storage.displayValue;
    storage.num2 = null;
    storage.operator = op;
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

//Event listener for calculator buttons
calculatorBtns.addEventListener("click", (e) => {
  const { target } = e;

  if (target.matches("button")) {
    if (target.classList.contains("number")) {
      displayNumbers(target.id);
    }

    if (target.classList.contains("decimal")) {
      addDecimal();
    }

    if (target.classList.contains("operator")) {
      setOperator(target.id);
    }

    if (target.classList.contains("equals")) {
      console.log("Equals");
    }

    if (target.classList.contains("clear")) {
      console.log("Clear");
    }
    if (target.classList.contains("delete")) {
      console.log("Delete");
    }

    updateScreen();
  }
});

//equals button:
// if no op, do nothing
//
// if op:
// num2 = screencontent
// operate (num1, num2, op)
// displayValue = total
//num1=total
//num2 stays same
//waitingfornum2 = true

// clear button:
// reset all values of object to initial StaticRange

// delete button:
// if waitingnum2 = false, delete num2
// if waitingnum2 = true, delete op

//add keyboard support
