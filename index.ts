// TypeScript for handling form submission in the browser
// This will be compiled to JavaScript
// Define interface for form data
interface CalorieFormData {
  age: number;
  weight: number;
  height: number;
  gender: string;
}

// Define interface for BMR result
interface BMRResult {
  bmr: number;
  formula: string;
}

// Function to calculate BMR using Mifflin-St Jeor equation
function calculateBMR(data: CalorieFormData): BMRResult {
  let bmr: number;
  
  if (data.gender === 'male') {
    // For men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5;
  } else {
    // For women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161;
  }
  
  return {
    bmr: Math.round(bmr), // Round to nearest whole number
    formula: 'Mifflin-St Jeor'
  };
}

// Function to handle form submission
function handleFormSubmit(event: Event): void {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  
  const data: CalorieFormData = {
    age: parseInt((form.elements.namedItem('age') as HTMLInputElement).value) || 0,
    weight: parseFloat((form.elements.namedItem('weight') as HTMLInputElement).value) || 0,
    height: parseFloat((form.elements.namedItem('height') as HTMLInputElement).value) || 0,
    gender: (form.elements.namedItem('gender') as HTMLInputElement).value || ''
  };
  
  // Log the data (for testing)
  console.log(data);
  
  // Calculate BMR
  const result = calculateBMR(data);
  
  // Display the result
  const resultElement = document.getElementById('bmr-result');
  if (resultElement) {
    resultElement.textContent = `Your Basal Metabolic Rate (BMR) is ${result.bmr} calories per day (using ${result.formula} equation).`;
    resultElement.style.display = 'block';
  }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the form element
  const form = document.querySelector('form');
  
  // Add submit event listener
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});