Here’s a focused Etch-a-Sketch cheatsheet so you can jump straight into coding without wading through Odin’s prose.

I’ll group things by *what you actually do* in this project.

---

## 1. Page + script wiring

**Basic HTML skeleton**

You only really need:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Etch-a-Sketch</title>
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <button id="reset">Reset Grid</button>
  <div id="container"></div>
</body>
</html>
```

* `defer` makes sure the JS runs **after** the DOM is parsed. 

If you don’t use `defer`, put the `<script>` tag at the *end* of `<body>` so DOM nodes exist when your JS runs. 

---

## 2. Getting & creating DOM nodes

### Selecting elements

You’ll live on these:

```javascript
const container = document.querySelector('#container');
const resetBtn = document.querySelector('#reset');
const allSquares = document.querySelectorAll('.square');
```

* `document.querySelector(selector)` – first match.
* `document.querySelectorAll(selector)` – NodeList of all matches. 

NodeLists are *array-like*, but not true arrays. If you ever need real array methods:

```javascript
const squareArray = Array.from(allSquares);
```



### Creating and inserting elements

For grid squares and wrapper divs:

```javascript
const div = document.createElement('div');  // in memory
container.appendChild(div);                 // into DOM
```

* `document.createElement(tagName)` – create element (not yet in DOM). 
* `parent.appendChild(child)` – put it at the end of the parent’s children. 

For Etch-a-Sketch, you’ll do something like:

```javascript
for (let i = 0; i < size * size; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  container.appendChild(square);
}
```

---

## 3. Changing attributes, classes, styles, and content

### Attributes

```javascript
div.setAttribute('id', 'theDiv');
const id = div.getAttribute('id');
div.removeAttribute('id');
```



You likely won’t use this heavily in Etch-a-Sketch, but it’s handy.

### Classes

Use classes for “hovered” pixels instead of inline styles if you want CSS to control appearance:

```javascript
div.classList.add('square');
div.classList.remove('square');
div.classList.toggle('active');  // flip on/off
```



Typical Etch-a-Sketch pattern:

```javascript
square.classList.add('drawn');
// or
square.classList.toggle('drawn');
```

…with a CSS rule like:

```css
.square.drawn {
  background-color: black;
}
```

### Inline styles from JS

```javascript
square.style.backgroundColor = 'black';
square.style.opacity = 0.3;
```

Each CSS property becomes `camelCase` on `.style` (e.g. `backgroundColor`, `borderRadius`).

### Text vs HTML content

You probably won’t put text in the grid boxes, but good to know:

```javascript
div.textContent = 'Hello';            // text only
div.innerHTML = '<span>Hello</span>'; // parses HTML
```



Use `textContent` unless you *need* HTML.

---

## 4. Events for drawing & buttons

You need to react to:

* mouse entering a square (for drawing)
* clicking a button (for reset / resize)

### Attaching event listeners

```javascript
const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  alert('Hello World');
});
```



With a named handler:

```javascript
function handleClick() {
  alert('YAY! YOU DID IT!');
}

btn.addEventListener('click', handleClick);
```



For the grid:

```javascript
square.addEventListener('mouseenter', () => {
  square.classList.add('drawn');
});

// or
square.addEventListener('mouseover', () => { ... });
```

### Event object & target

If you want one handler for all squares:

```javascript
container.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('square')) {
    e.target.classList.add('drawn');
  }
});
```

Key idea: `e.target` is the actual element that triggered the event.

---

## 5. Prompting user / resetting grid

You’ll use the built-in `prompt`:

```javascript
const input = prompt('Grid size? (max 100)');
const size = Number(input);
```

Reset flow:

1. Ask user for size (`prompt`).
2. Clear current grid.
3. Recreate grid with new size.

Clearing the container:

```javascript
container.innerHTML = ''; // simplest: wipe children
```

Or loop and remove children:

```javascript
while (container.firstChild) {
  container.removeChild(container.firstChild);
}
```

---

## 6. Flexbox & layout for the grid

Your container is a flexbox that wraps the squares.

```css
#container {
  display: flex;
  flex-wrap: wrap;
  width: 640px;    /* or 960px per project text */
  height: 640px;   /* keep it square */
}
```

Core flexbox properties you’ll actually touch:

* `display: flex;` – enable flexbox.
* `flex-direction: row | column;` – main axis horizontal vs vertical. 
* `flex-wrap: wrap;` – allows items to wrap to next line.
* `justify-content: ...;` – align items along **main** axis.
  Common values:

  * `flex-start`, `center`, `space-between`, `space-around`. 
* `align-items: ...;` – align along **cross** axis (`flex-start`, `center`, `stretch`). 
* `gap: 2px;` – spacing between squares without fiddling with margins. 

To fully center something in a flex container (often used around the canvas):

```css
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
```



### Making perfect squares

Given `N x N` grid and a fixed container size:

```css
.square {
  box-sizing: border-box;
  border: 1px solid #ddd;
}
```

Then in JS, compute size:

```javascript
const size = 16;
const containerSize = 640; // must match CSS width/height
const squareSize = containerSize / size;

square.style.width = `${squareSize}px`;
square.style.height = `${squareSize}px`;
```

Important bits:

* `box-sizing: border-box;` includes border and padding in the element’s width/height calculations (so borders don’t break your math). 
* Borders and margins enlarge boxes unless you account for them; use `box-sizing: border-box` and avoid margins on `.square` if you want an exact fit.

---

## 7. Box model essentials you’ll actually care about

For your layout sanity:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

* `padding` – inside border, between content and border.
* `border` – line around padding + content.
* `margin` – outside border, space between elements. 

Use:

* `margin` to move elements away from each other (e.g. space between button and grid).
* `padding` to add breathing room inside an element.

---

## 8. Display types that affect layout

Relevant mostly for understanding why things stack or sit side-by-side:

* Block elements (`div`, `p`, `h1`, etc.)

  * Take full width, start on new line (`display: block`).
* Inline elements (`span`, `a`)

  * Flow inside a line of text; width/height behave differently. 

Your grid is all block elements (`div`s) but flexbox overrides how they lay out.

---

## 9. Debugging / “OMG, why isn’t my grid being created???”

Checklist straight from the project brief: 

* Is `style.css` linked correctly in `<head>`?
* Is `script.js` either:

  * loaded with `defer` in `<head>`, or
  * included at bottom of `<body>`?
* Open DevTools:

  * **Console**: any JS errors?
  * **Elements** panel: are squares in the DOM but invisible due to CSS?
* Add `console.log` in your JS to verify code is running.

Example:

```javascript
console.log('building grid with size', size);
```

---

If you want, next step I can help you sketch the actual `createGrid(size)` and event-wiring functions using only this toolkit.
