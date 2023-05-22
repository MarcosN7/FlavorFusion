// Function to fetch recipes based on search criteria
async function fetchRecipes(searchCriteria) {
  const apiKey = '1';
  const url = `https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${searchCriteria}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.meals) {
      return data.meals;
    } else {
      throw new Error('No recipes found');
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

// Function to display search results or error message
function displaySearchResults(recipes) {
  const searchResultsSection = document.getElementById('search-results');
  searchResultsSection.innerHTML = '';

  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');

      const image = document.createElement('img');
      image.src = recipe.strMealThumb;
      image.alt = recipe.strMeal;

      const title = document.createElement('h3');
      title.textContent = recipe.strMeal;

      recipeCard.appendChild(image);
      recipeCard.appendChild(title);
      searchResultsSection.appendChild(recipeCard);

      // Add event listener to show recipe details on click
      recipeCard.addEventListener('click', () => {
        showRecipeDetails(recipe);
      });
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No recipes found. Please try a different search term.';
    searchResultsSection.appendChild(errorMessage);
  }
}

// Function to show recipe details
function showRecipeDetails(recipe) {
  const recipeDetailsSection = document.getElementById('recipe-details');
  recipeDetailsSection.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = recipe.strMeal;

  const instructions = document.createElement('p');
  instructions.textContent = recipe.strInstructions;

  recipeDetailsSection.appendChild(title);
  recipeDetailsSection.appendChild(instructions);

  recipeDetailsSection.style.display = 'block';
}

// Function to display loading animation in the search results area
function displayLoadingAnimation() {
  const searchResultsSection = document.getElementById('search-results');
  searchResultsSection.innerHTML = '';

  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.innerHTML = `<iframe src="https://giphy.com/embed/f41DwTEbk8YVsNZTPv" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;

  searchResultsSection.appendChild(loader);
}


// Function to fetch recommended recipes
async function fetchRecommendedRecipes() {
  const apiKey = '1';
  const url = `https://www.themealdb.com/api/json/v1/${apiKey}/randomselection.php`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.meals) {
      return data.meals;
    } else {
      throw new Error('No recommended recipes found');
    }
  } catch (error) {
    console.error('Error fetching recommended recipes:', error);
    throw error;
  }
}

// Function to display search results or error message
function displaySearchResults(recipes) {
  const searchResultsSection = document.getElementById('search-results');
  searchResultsSection.innerHTML = '';

  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card');

      const image = document.createElement('img');
      image.src = recipe.strMealThumb;
      image.alt = recipe.strMeal;

      const title = document.createElement('h3');
      title.textContent = recipe.strMeal;

      recipeCard.appendChild(image);
      recipeCard.appendChild(title);
      searchResultsSection.appendChild(recipeCard);

      // Add event listener to show recipe details on click
      recipeCard.addEventListener('click', () => {
        showRecipeDetails(recipe);
      });
    });
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'No recipes found. Please try a different search term.';
    searchResultsSection.appendChild(errorMessage);
  }
}



// Function to initialize the recipe finder
async function initializeRecipeFinder() {
  const searchForm = document.getElementById('search-form');
  const spinner = document.getElementById('spinner');

 

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input').value;

    // Show the loading animation
    displayLoadingAnimation();

    // Delay activation for 2 seconds (adjust as needed)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Fetch recipes based on search criteria
      const recipes = await fetchRecipes(searchInput);

      // Display search results or error message
      displaySearchResults(recipes);
    } catch (error) {
      // Display error message
      const searchResultsSection = document.getElementById('search-results');
      searchResultsSection.innerHTML = '';

      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'An error occurred while fetching recipes. Please try again later.';
      searchResultsSection.appendChild(errorMessage);

      console.error('Error fetching recipes:', error);
    } finally {
      // Hide the spinner
      spinner.style.display = 'none';
    }
  });
}

// Initialize the recipe finder
initializeRecipeFinder();
