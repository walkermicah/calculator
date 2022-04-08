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

function addDecimal() {
  const { displayValue } = storage;

  if (!displayValue.includes(".")) {
    storage.displayValue += ".";
  }

  //change decimal from number class
  //if clicks a decimal, allow only 1 (make decimal a number key)
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

  return Math.round(total * 1000) / 1000;
}

//Event listener for calculator buttons
calculatorBtns.addEventListener("click", (e) => {
  const { target } = e;

  if (target.matches("button")) {
    if (target.classList.contains("number")) {
      displayNumbers(target.id);
    }

    if (target.classList.contains("operator")) {
      console.log(`Operator: ${target.id}`);
    }

    if (target.classList.contains("decimal")) {
      addDecimal();
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

// if user clicks an operator: event listener: setOperator(target.id) // above: setOperator(operator)
//  if no num1
// store numbers on the screen as num1
// // store operator
//waitingnum2 = true
//clear displayValue
// if num1 & waitingnum2=false
//  // store screencontent as num2 and call operate(num1, num2, op)
// displayValue = total
//num1=total
//num2 cleared
//waitingnum2=true

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
