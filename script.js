const currencyElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');

const swapElement = document.getElementById('swap');
const rateElement = document.getElementById('rate');

/****** FUNCTIONS ******/
// Fetch exchange rates and update the DOM
const calculate = () => {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currencyTwo];

      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
};

calculate();

/****** EVENT LISTENERS ******/
currencyElementOne.addEventListener('change', calculate);
currencyElementTwo.addEventListener('change', calculate);

amountElementOne.addEventListener('input', calculate);
amountElementTwo.addEventListener('input', calculate);

swapElement.addEventListener('click', () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});
