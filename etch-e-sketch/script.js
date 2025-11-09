const container = document.querySelector('#container');
const containerStyle = getComputedStyle(container);
const containerHeight = parseFloat(containerStyle.height);
const containerWidth = parseFloat(containerStyle.width);

const size = 16;
const containerSize = Math.min(containerHeight, containerWidth);

const resetButton = document.querySelector("#reset");
resetButton.addEventListener('click', resetGrid);


createGrid(size);


function createGrid(size) {
    const squareSize = containerSize / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);

        square.style.height = `${squareSize}px`;
        square.style.width = `${squareSize}px`;
        square.addEventListener('mouseenter', handleMouseOver);
    }
}

function resetGrid() {
    let input;
    do {
        input = prompt('Grid size? (max 100)');
    } while ( input < 1 || input > 100 )

    container.innerHTML = '';
    createGrid(input);
}

function handleMouseOver(e) {
    const r = Math.round(255 * Math.random());
    const g = Math.round(255 * Math.random());
    const b = Math.round(255 * Math.random());

    let targetOpacity = parseFloat(getComputedStyle(e.target).opacity);

    if (targetOpacity == 1) {
        targetOpacity = 0;
    }
    targetOpacity += .1;
    e.target.style.opacity = targetOpacity;

    // e.target.classList.toggle('hover');
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}





