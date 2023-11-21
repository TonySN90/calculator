import "./../scss/style.scss";

const calculator = function () {
  const btnsParentEl = document.querySelector(".inputBtns");
  const historyList = document.querySelector(".historyList");

  let currentNumber = 0,
    tempResult = 0,
    result = 0,
    btnNumber = "",
    operator = "";

  const calculate = function () {
    switch (operator) {
      case "+":
        result = tempResult + currentNumber;
        break;
      case "-":
        result = tempResult - currentNumber;
        break;
      case "/":
        result = tempResult / currentNumber;
        break;
      case "*":
        result = tempResult * currentNumber;
        break;
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

  const replaceComma = function (num) {
    return `${num}`.replace(".", ",");
  };

  const updateCurrentNumber = function () {
    const string = replaceComma(currentNumber);
    document.querySelector("#entryNumber").textContent = string;
  };

  const updateTempResult = function () {
    const string = replaceComma(tempResult) + ` ${operator}`;
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

    switch (true) {
      case el.classList.contains("number"):
        if (el.textContent == ",") {
          btnNumber = ".";
        } else {
          btnNumber = el.textContent;
        }
        createNumberChain();
        updateCurrentNumber();
        break;

      case el.classList.contains("operator"):
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
        break;

      case el.classList.contains("negativ"):
        currentNumber = -currentNumber;
        updateCurrentNumber();
        break;

      case el.classList.contains("pi"):
        currentNumber = Math.PI;
        updateCurrentNumber();
        break;

      case el.classList.contains("equal"):
        if (operator) {
          calculate();
          updateTempResult();
          resetData(tempResult);
        }
        break;

      case el.classList.contains("del"):
        if (currentNumber != 0) {
          let delNumber = `${currentNumber}`.slice(0, -1);
          if (delNumber.length == 0) {
            delNumber = 0;
          }
          currentNumber = delNumber;
          updateCurrentNumber();
        }
        break;

      case el.classList.contains("reset"):
        resetData();
        historyList.textContent = "";
        break;
    }
  });
};

calculator();
