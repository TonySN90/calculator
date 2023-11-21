import "./../scss/style.scss";

const calcucaltor = function () {
  const btnsParentEl = document.querySelector(".inputBtns");
  const historyList = document.querySelector(".historyList");

  let currentNumber = 0,
    tempResult = 0,
    result = 0,
    btnNumber,
    operator;

  const calculate = function () {
    if (operator == "+") {
      result = tempResult + currentNumber;
    } else if (operator == "-") {
      result = tempResult - currentNumber;
    } else if (operator == "/") {
      result = tempResult / currentNumber;
    } else if (operator == "*") {
      result = tempResult * currentNumber;
    }
    updateHistoryList();
    tempResult = result;
  };

  const createNumberChain = function () {
    // check if comma is included
    if (btnNumber === ".") {
      if (currentNumber.toString().includes(".")) return;

      currentNumber = currentNumber + ".";
    } else {
      currentNumber = Number(currentNumber + btnNumber);
    }
  };

  const replaceComma = function (string) {
    return `${string}`.replace(".", ",");
  };

  const updateCurrentNumber = function () {
    let string = replaceComma(currentNumber);
    document.querySelector("#entryNumber").textContent = string;
  };

  const updateTempResult = function () {
    let string = replaceComma(tempResult) + ` ${operator}`;
    document.querySelector("#tempResult").textContent = string;
  };

  const updateHistoryList = function () {
    const htmlMarkup = `<div class="historyEntry">${tempResult} ${operator} ${currentNumber} = ${result}</div>`;
    historyList.insertAdjacentHTML("afterbegin", htmlMarkup);
  };

  const resetData = function (tempResult = 0) {
    currentNumber = tempResult;
    tempResult = 0;
    operator = null;
    updateCurrentNumber();
    document.querySelector("#tempResult").textContent = "";
  };

  // Click Event
  btnsParentEl.addEventListener("click", (e) => {
    // guard clause
    const el = e.target.closest(".btn");
    if (!el) return;

    if (el.classList.contains("number")) {
      if (el.textContent == ",") {
        btnNumber = ".";
      } else {
        btnNumber = el.textContent;
      }
      createNumberChain();
      updateCurrentNumber();
    }

    if (el.classList.contains("operator")) {
      if (currentNumber == 0 && !operator) return;

      if (operator) {
        calculate();
        updateTempResult();
      } else {
        tempResult = currentNumber;
      }
      operator = el.textContent;
      currentNumber = 0;
      updateTempResult();
      updateCurrentNumber();
    }

    if (el.classList.contains("negativ")) {
      currentNumber = -currentNumber;
      updateCurrentNumber();
    }

    if (el.classList.contains("pi")) {
      let pi = 3.14159265359;
      currentNumber = pi;
      updateCurrentNumber();
    }

    if (el.classList.contains("equal")) {
      if (operator) {
        calculate();
        updateTempResult();
        resetData(tempResult);
      }
    }

    if (el.classList.contains("del")) {
      if (currentNumber != 0) {
        let delNumber = `${currentNumber}`.slice(0, -1);
        if (delNumber.length == 0) {
          delNumber = 0;
        }
        currentNumber = delNumber;
        updateCurrentNumber();
      }
    }

    if (el.classList.contains("reset")) {
      resetData();
      historyList.textContent = "";
    }
  });
};

calcucaltor();
