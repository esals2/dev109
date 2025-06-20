// Function to create a new <li> element with text
function createListItem(text) {
  const li = document.createElement('li');         // Create a <li> element
  const textNode = document.createTextNode(text);  // Create a text node with the given text
  li.appendChild(textNode);                         // Add the text to the <li>
  return li;                                        // Return the completed <li>
}

// Function to insert the new <li> into the <ul> with ID "todo"
function insertListItem(item, targetSelector = '#todo') {
  const targetList = document.querySelector(targetSelector); // Find the <ul> element
  if (targetList) {
    targetList.appendChild(item);                            // Add <li> to the <ul>
  } else {
    console.error(`Target element '${targetSelector}' not found.`);
  }
}

// Add event listener to form to insert new item on submit
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();                                        // Prevent form from refreshing the page
  const input = document.getElementById('new-item');         // Get the input box
  const newItemText = input.value.trim();                    // Get the input text and trim spaces

  if (newItemText !== '') {
    const newItem = createListItem(newItemText);             // Create <li> from input
    insertListItem(newItem);                                 // Add it to the list
    input.value = '';                                        // Clear the input box
  }
});
