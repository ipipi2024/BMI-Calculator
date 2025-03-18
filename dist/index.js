// Function to calculate BMR using Mifflin-St Jeor equation
function calculateBMR(data) {
    var bmr;
    if (data.gender === 'male') {
        // For men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
        bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5;
    }
    else {
        // For women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
        bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161;
    }
    return {
        bmr: Math.round(bmr), // Round to nearest whole number
        formula: 'Mifflin-St Jeor'
    };
}
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var data = {
        age: parseInt(form.elements.namedItem('age').value) || 0,
        weight: parseFloat(form.elements.namedItem('weight').value) || 0,
        height: parseFloat(form.elements.namedItem('height').value) || 0,
        gender: form.elements.namedItem('gender').value || ''
    };
    // Log the data (for testing)
    console.log(data);
    // Calculate BMR
    var result = calculateBMR(data);
    // Display the result
    var resultElement = document.getElementById('bmr-result');
    if (resultElement) {
        resultElement.textContent = "Your Basal Metabolic Rate (BMR) is ".concat(result.bmr, " calories per day (using ").concat(result.formula, " equation).");
        resultElement.style.display = 'block';
    }
}
// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    var form = document.querySelector('form');
    // Add submit event listener
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
