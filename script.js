const calculatorScreen = document.querySelector(".calculator__screen");
const calculatorBtns = document.querySelector(".calculator__btns");

const c = {
  operator: null,
  num1: null,
  num2: null,
  needNum2: false,
  displayValue: "0",
};

//update screen with the stored displayValue
function updateScreen() {
  calculatorScreen.textContent = c.displayValue;
}
updateScreen();

//display numbers on screen when number buttons are pressed
//if displayValue is 0, overwrite it. if not, add to it
//if need num 2, overwrite displayValue
function displayNumbers(num) {
  if (c.displayValue === "0") {
    c.displayValue = num;
  } else {
    c.displayValue += num;
  }

  if (c.needNum2) {
    c.displayValue = num;
    c.needNum2 = false;
  }
}

//add decimal to display value (only once)
function addDecimal() {
  if (!c.displayValue.includes(".")) {
    c.displayValue += ".";
  }
}

//when user chooses an operator:
//if no num1: store operator, store display number as num1
function setOperator(op) {
  if (!c.num1) {
    c.operator = op;
    c.num1 = c.displayValue;
    c.needNum2 = true;
  }

  //if ready to operate: assign display number to num2, call operate function to perform calculation and display total, assign the total to num1 and clear num2
  if (!c.needNum2) {
    c.num2 = c.displayValue;
    c.needNum2 = true;
    operate(c.num1, c.num2, c.operator);
    c.num1 = c.displayValue;
    c.num2 = null;
    c.operator = op;
  }

  if (c.needNum2) {
    c.operator = op;
  }
}

//when equals button is pressed:
//must have operator and num1
//if no num2, store display value. if have num2 (user is pressing equals more than once in a row), keep it the same
function getTotal() {
  console.log(c);
  if (c.operator && c.num1) {
    if (!c.num2) {
      c.num2 = c.displayValue;
    }

    operate(c.num1, c.num2, c.operator);
    c.num1 = c.displayValue;
    c.needNum2 = true;
  }
}

//operate using stored num1, num2 and operator
//if user divides by 0, display infinity symbol
//return total, rounding to 3 decimal places
function operate(num1, num2, operator) {
  let total;
  const n1 = Number(num1);
  const n2 = Number(num2);

  if (operator === "+") {
    total = n1 + n2;
  }

  if (operator === "-") {
    total = n1 - n2;
  }

  if (operator === "*") {
    total = n1 * n2;
  }

  if (operator === "/") {
    if (n2 === 0) {
      total = "∞";
      return total;
    } else {
      total = n1 / n2;
    }
  }
  c.displayValue = Math.round(total * 1000) / 1000;
  updateScreen();
}

//reset c object when user presses clear
function clearScreen() {
  c.operator = null;
  c.num1 = null;
  c.num2 = null;
  c.needNum2 = false;
  c.displayValue = "0";
}

// delete button:
function deleteScreen() {
  if (c.needNum2) {
    c.operator = null;
  } else if (!c.num1) {
    c.displayValue = "0";
  } else {
    c.displayValue = c.num1;
    c.needNum2 = true;
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
document.addEventListener("keydown", (e) => {
  const key = e.key;

  switch (key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      displayNumbers(key);
      break;
    case ".":
      addDecimal();
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      setOperator(key);
      break;
    case "=":
    case "Enter":
      getTotal();
      break;
    case "c":
      clearScreen();
      break;
    case "d":
      deleteScreen();
      break;
  }

  updateScreen();
});
