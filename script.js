let resultCalculatedContainer = document.querySelector('.result-success');
let emptyResultContainer = document.querySelector('.result-fail');
let mortgageAmountError = document.getElementById('mortgage-amount');
let mortgageTermError = document.getElementById('mortgage-term');
let interestRateError = document.getElementById('interest-rate');
let mortgageTypeError = document.querySelector('.typeOfMortgage span');


function calculateRepaymentMortgage( principal , years, annualRate) {
    const r = (annualRate / 100) / 12;
    const n = years * 12;
    if (r === 0) {
        const monthlyPayment = principal / n;
        const totalPayment = principal;
        return { monthlyPayment, totalPayment};
    }

    const monthlyPayment = principal * ( r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
        return { monthlyPayment, totalPayment};
}

function calculateInterestOnlyMortgage(principal , years , annualRate) {
    const monthlyInterestRate = (annualRate / 100) / 12;
    const monthlyPayment = principal * monthlyInterestRate;
    const totalPayment = (monthlyPayment * 12 * years); // over the term
  
    return { monthlyPayment, totalPayment };
  }
  
/* */

    document.querySelector('.calculateBtn').addEventListener('click', (e) => {
    e.preventDefault(); 
    
    let selectedRadio = document.querySelector('input[name="mortgage-type"]:checked');

    document.querySelectorAll('.error-message').forEach(error => error.style.display = "none");

    mortgageAmountError.parentElement.classList.remove('error'); 
    mortgageTermError.parentElement.classList.remove('error');
    interestRateError.parentElement.classList.remove('error'); 
    document.querySelector('.amount .symbol').classList.remove('error-symbol'); 
    document.querySelector('.years .symbol').classList.remove('error-symbol');
    document.querySelector('.interest .symbol').classList.remove('error-symbol');
    mortgageTypeError.style.display = "none";
    

     let hasError = false;


    if (!mortgageAmountError.value.trim()) {
        mortgageAmountError.parentElement.parentElement.querySelector('.error-message').style.display = "block";
        mortgageAmountError.parentElement.classList.add('error'); 
        document.querySelector('.amount .symbol').classList.add('error-symbol'); 
        hasError = true;
    }

    if (!mortgageTermError.value.trim()) {
        mortgageTermError.parentElement.parentElement.querySelector('.error-message').style.display = "block";
        mortgageTermError.parentElement.classList.add('error'); 
        document.querySelector('.input-wrapper input').classList.remove('success');
        document.querySelector('.years .symbol').classList.add('error-symbol');
        hasError = true;
    }

    if(!interestRateError.value.trim()) {
        interestRateError.parentElement.parentElement.querySelector('.error-message').style.display = "block";
        interestRateError.parentElement.classList.add('error'); 
        document.querySelector('.interest .symbol').classList.add('error-symbol');
        hasError = true;
    }

    if(!selectedRadio) {
        mortgageTypeError.style.display = "block"; 
        hasError = true;
    }

    if(hasError) {
        resultCalculatedContainer.style.display = "none";
        emptyResultContainer.style.display = "block";
        return;
    }
  
    let mortgageAmount = parseFloat(document.getElementById('mortgage-amount').value);
    let mortgageTerm = parseFloat(document.getElementById('mortgage-term').value);
    let interestRate = parseFloat(document.getElementById('interest-rate').value);
    let mortgageType = document.querySelector('input[name="mortgage-type"]:checked')?.value;
        
    let result;
    if( mortgageType === 'repayment') {
      result = calculateRepaymentMortgage (mortgageAmount, mortgageTerm, interestRate);
    }
    else if(mortgageType === 'interest-only') {
        result = calculateInterestOnlyMortgage ( mortgageAmount, mortgageTerm, interestRate);
     }

     document.querySelector('.monthly-repay').textContent = `£${result.monthlyPayment.toFixed(2)}`;
     document.querySelector('.total-repay').textContent = `£${result.totalPayment.toFixed(2)}`;
     resultCalculatedContainer.style.display = "block";
     emptyResultContainer.style.display = "none";


     });
  
    function clearAll() {
    document.querySelectorAll('.error-message').forEach(error => error.style.display = "none");
    mortgageAmountError.parentElement.classList.remove('error'); 
    mortgageTermError.parentElement.classList.remove('error');
    interestRateError.parentElement.classList.remove('error'); 
    document.querySelector('.amount .symbol').classList.remove('error-symbol'); 
    document.querySelector('.years .symbol').classList.remove('error-symbol');
    document.querySelector('.interest .symbol').classList.remove('error-symbol');



    let clearButton = document.querySelector('.clearForm');
    let elements = document.querySelectorAll('#form input, #form select');

    clearButton.addEventListener('click', () => {
    elements.forEach(element => {
        if (element.type === 'radio' || element.type === 'checkbox') {
            element.checked = false;
        } else {
            element.value = '';
        }
        })
    })
 
    
    resultCalculatedContainer.style.display = "none";
    emptyResultContainer.style.display = "block";
 }
clearAll();
