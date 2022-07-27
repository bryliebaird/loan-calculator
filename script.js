// Grab the form using DOM method and store in variable
let loanForm = document.getElementById('loan-form');

// Add event listener to form (submit button) to run function that will calculate the results of the loan information
loanForm.addEventListener('submit', calculateResults);

// Once event listener is fired (user hits 'submit') the function below will run

function calculateResults(e){

    // //UI Variables: User Input - place the user input into variables using DOM methods
    const amount = document.getElementById('amount');
    const rate = document.getElementById('interest');
    const years = document.getElementById('years');
    // test - console.log(amount, rate, years);
    

    // //UI Variables: Results - grab the results input and store in variable using DOM method
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    // console.log(monthlyPayment, totalPayment, totalInterest);


    // // Convert user input from string to number
    const principal = parseFloat(amount.value);
    const calcInterest = parseFloat(rate.value) / 100 / 12;
    const calcYears = parseFloat(years.value) * 12;
    // console.log(principal, calcInterest, calcYears);


    // //Formula to Compute Monthly Payments, aka the ~fancy~ math formula to actually figure out the rates/years, etc.
    const x = Math.pow(1 + calcInterest, calcYears);
    const monthly = (principal*x*calcInterest)/(x-1);
    console.log(`The users monthly payment comes to a total of ${monthly}`);

    // Check if the monthlyPay variable is a finite number - method in JS called 'isFinite' which checks this.
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calcYears).toFixed(2);
        totalInterest.value = ((monthly * calcYears) - principal).toFixed(2);
    } else {
        showError("Please check your numbers");
    }
    
    // // Prevents the Form from using default submit behavior (makes the console work)
    e.preventDefault();
}

function showError(error){

    const errorDiv = document.createElement('div');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);

}

function clearError(){
    document.querySelector('.alert').remove();
}

