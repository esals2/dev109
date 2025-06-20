// Function to create a new li element with text
function createListItem(text) {
  const li = document.createElement('li');         // Create an element
  const textNode = document.createTextNode(text);  // Create a text node with the given text
  li.appendChild(textNode);                         // Add the text to the element
  return li;                                        // Return the completed element
}

// Function to insert the new  li element into the ul element
function insertListItem(item, targetSelector = '#todo') {
  const targetList = document.querySelector(targetSelector); // Find the ul element
  if (targetList) {
    targetList.appendChild(item);                            // Add li element to the ul element
  } else {
    console.error(`Target element not found.`);
  }
}

// Add event listener to form to insert new item on submit
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();                                        // Prevent form from refreshing the page
  const input = document.getElementById('new-item');         // Get the input box

  if (newItemText !== '') {
    const newItem = createListItem(newItemText);             // Create li element from input
    insertListItem(newItem);                                 // Add it to the list
    input.value = '';                                        // Clear the input box
  }
});
