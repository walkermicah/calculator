const calculator = document.querySelector(".calculator");
const calculatorScreen = calculator.querySelector(".calculator__screen");
const calculatorBtns = calculator.querySelector(".calculator__btns");

const storage = {
  operator: null,
  num1: null,
  num2: null,
  readyForNum2: false,
  displayValue: 0,
};

//update screen with the stored displayValue
function updateScreen() {
  const { displayValue } = storage;
  calculatorScreen.textContent = displayValue;
}

updateScreen();

//Event listener for calculator buttons
calculatorBtns.addEventListener("click", (e) => {
  const { target } = e;

  if (target.matches("button")) {
    if (target.classList.contains("number")) {
      console.log(`Number: ${target.id}`);
    }

    if (target.classList.contains("operator")) {
      console.log(`Operator: ${target.id}`);
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

//operate:
// if/else for each operator
// convert strings to numbers before calculating
//if divide by 0, display infinity symbol
// return total as a rounded number (cap decimals and display long answers as exponents)

//if user clicks a number:
//[[if waitingfornum2 = true, overwrite displayValue with number entered and set waiting=false]]
// get number using textcontent of the button
//check length: if longer than x, write nothing
//if displayValue is 0, overwrite it. if not, add to it
//if clicks a decimal, allow only 1 (make decimal a number key)

// if user clicks an operator:
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