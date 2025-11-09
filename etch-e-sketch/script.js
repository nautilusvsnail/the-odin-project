const container = document.querySelector('#container');
const size = 16;

for (let i = 0; i < size * size; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
}





