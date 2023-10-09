// Select the input field and suggestions ul
const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");
const searchContainer = document.querySelector(".search-container");

const fruit = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

// Function to filter fruit based on user input
function search(str) {
  // Convert user input to lowercase for case-insensitive search then use it to filter for fruit names
  const userInput = input.value;
  // Validate that user input is not empty so we don't return an entire database
  if (userInput) {
    input.classList.add("has-content");
    const searchQuery = userInput.toLowerCase();
    // Return an array containing any fruit name that contains user input.
    return fruit.filter((afruit) => afruit.toLowerCase().includes(searchQuery));
  } else {
    searchContainer.classList.remove("has-suggestions");
    input.classList.remove("has-content");
  }
}

// Function to display matching suggestions
function showSuggestions(results, inputVal) {
  // Clear previous suggestions
  suggestions.innerHTML = "";
  // Iterate through the matching fruit names
  for (const result of results) {
    // Create a list item element for each suggestion and add a CSS class to the list item
    const fruitLi = document.createElement("li");
    fruitLi.classList.add("result-item");

    // Highlight the search term within the suggestion using a regular expression
    const highlightedWord = result.replace(
      new RegExp(`(${inputVal})`, "gi"),
      "<strong>$1</strong>" // Wrap the matched term in <strong> tags for bold styling
    );

    // Set the inner HTML of the list item to the highlighted suggestion
    fruitLi.innerHTML = highlightedWord;
    // Add the list item to the suggestions list
    suggestions.append(fruitLi);
    searchContainer.classList.add("has-suggestions");
  }
}

// Function to handle selecting a suggestion
function useSuggestion(e) {
  const clickedElement = e.target;
  // Find the nearest parent list item (li)
  const parentLi = clickedElement.closest("li");
  if (parentLi) {
    // Extract the selected word from the list item,
    const selectedWord = parentLi.innerText;
    input.value = selectedWord; // Set the input field value to the selected word and
    suggestions.innerHTML = ""; // clear the suggestions list
  }
}

// The next two function were written based on an explicit requiremt,
// However l believe this functionality is best implemnted in CSS

// Function to highlight a suggestion on hover
function highlightLi(e) {
  const hoveredElement = e.target;
  // Find the nearest parent list item (li)
  const parentLi = hoveredElement.closest("li");
  if (parentLi) {
    // Apply a background color when hovered
    parentLi.style.backgroundColor = "#df4f00";
  }
}

// Function to restore the original background color on mouseout
function restoreLi(e) {
  // Check if the target element is a list item (li)
  if (e.target.tagName === "LI") {
    e.target.style.backgroundColor = "initial";
  }
}

// Event listener for user input (keyup event)
input.addEventListener("input", () => {
  const results = search(input.value); // Filter and get matching fruit names based on the input
  showSuggestions(results, input.value); // Display the matching suggestions
});

// Event listener for clicking on a suggestion
suggestions.addEventListener("click", useSuggestion);

// Event listeners for hovering over suggestions
suggestions.addEventListener("mouseover", highlightLi);
suggestions.addEventListener("mouseout", restoreLi);
