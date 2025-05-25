function drawRhombus() {
  const height = parseInt(document.getElementById('rHeight').value);
  const colorEven = document.getElementById('colorEven').value;
  const colorOdd = document.getElementById('colorOdd').value;
  const symbol = document.getElementById('symbol').value;

  if (isNaN(height) || height % 2 === 0 || height < 1) {
    alert("Please enter a valid odd number for height.");
    return;
  }

  let rhombus = "";
  const mid = Math.floor(height / 2);

  for (let i = 0; i < height; i++) {
    let numSymbols = i <= mid ? i * 2 + 1 : (height - i - 1) * 2 + 1;
    let numSpaces = (height - numSymbols) / 2;

    rhombus += " ".repeat(numSpaces);
    for (let j = 0; j < numSymbols; j++) {
      const color = j % 2 === 0 ? colorOdd : colorEven;
      rhombus += `<span style="color:${color}">${symbol}</span>`;
    }
    rhombus += "\n";
  }

  document.getElementById('rhombusOutput').innerHTML = `<pre>${rhombus}</pre>`;
}
