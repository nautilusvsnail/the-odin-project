
// CSS
// body {
//   display: flex; - “Lay out this element’s children using the Flexbox model.”
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   margin: 0;
// } → This centers the container (the body’s child) horizontally and vertically in the viewport.

// #container {
//   display: flex; 
//   flex-wrap: wrap;
//   width: 640px;
//   height: 640px;
// } → This makes the container’s children (the .square divs) line up in a flexbox grid that wraps to multiple rows. — "display" is not inherited.

// Each element needs its own "display: flex;" if you want its children to use flex layout.

// .square {
//   box-sizing: border-box;
//   width: 40px;
//   height: 40px;
//   border: 1px solid #ddd;
// }

// CSS naming: Those things — body, .square, #container, * 
// — are all /selectors/ that target /elements/.

// CSS ID selector — the # symbol means “select by ID.”
// HTML:  <div id="container"></div>
// CSS: #container { ... }
// IDs must be unique on a page (only one container), whereas classes (.square) can be reused for many elements.

// ==================================================================

// getting DOM elements

const container = document.querySelector('#container');
const resetBtn = document.querySelector('#reset');
const allSquares = document.querySelectorAll('.square');

// document.querySelector(selector) – first match.
// document.querySelectorAll(selector) – NodeList of all matches.

// NodeLists are array-like, but not true arrays. If you ever need real array methods:
const squareArray = Array.from(allSquares);

const div = document.createElement('div');  // in memory
container.appendChild(div);                 // into DOM
// parent.appendChild(child) – put it at the end of the parent’s children

// ==================================================================

// for document.createElement('div') what is the argument? is that an element type? if so, what are the type options?
// Yes — in document.createElement('div'), the argument 'div' is a tag name string that tells the browser which kind of HTML element to create.
document.createElement('p');       // <p>
document.createElement('span');    // <span>
document.createElement('button');  // <button>
document.createElement('input');   // <input>
document.createElement('img');     // <img>
document.createElement('ul');      // <ul>
document.createElement('li');      // <li>
document.createElement('section'); // <section>
document.createElement('canvas');  // <canvas>
document.createElement('div');     // <div>

// You can even create custom elements (e.g. document.createElement('my-widget')) as long as the name includes a dash — that’s part of the spec for [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement#creating_custom_elements)

// layout and content primitives:
// Container-type: div, section, article, main
// Inline text: span, p, a
// Interactive: button, input
// Structural: ul, li, header, footer
// Media: img, canvas

// Each tag starts out empty — it’s just a DOM node until you add attributes, classes, styles, or children.

// ==================================================================

// is `document` a keyword for the html that is importing/running the script?
// Exactly — document is a built-in global object that represents the HTML page currently loaded in the browser — i.e., the one running your script.
// It’s the root of the entire DOM tree — everything on the page (elements, text, attributes) lives under it.
// The window object sits one level higher; it represents the browser tab. window.document is the same object as document.

// ==================================================================


// Changing attributes, classes, styles, and content
div.setAttribute('id', 'theDiv');
const id = div.getAttribute('id');
div.removeAttribute('id');

// Classes
// Use classes for “hovered” pixels instead of inline styles if you want CSS to control appearance:
div.classList.add('square');
div.classList.remove('square');
div.classList.toggle('active');  // flip on/off

// square.classList.add('square'); what is this? are classes the css dot things?
// In CSS, a class is what you target with the “dot syntax,” like:
const square = document.createElement('div');
square.classList.add('square');
// => <div class="square"></div> effectively in html so...
// .square {
//   background-color: black;
// }
// will apply to it.

// Each CSS property becomes camelCase on .style (e.g. backgroundColor, borderRadius).

// ALTERNATIVELY you can use Inline styles from JS:
square.style.backgroundColor = 'black';
square.style.opacity = 0.3;
// but then you're stuck hunting through js code if you want to change the look of the page

// ==================================================================

// Text vs HTML content
// You probably won’t put text in the grid boxes, but good to know:

div.textContent = 'Hello';            // text only
div.innerHTML = '<span>Hello</span>'; // parses HTML
// Use textContent unless you need HTML.

// ==================================================================

// Attaching event listeners (lambda/anonymous function, js calls "arrow" function)
const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  alert('Hello World');
});

// With a named handler:
function handleClick() {
  alert('YAY! YOU DID IT!');
}
btn.addEventListener('click', handleClick);

// For the grid:
square.addEventListener('mouseenter', () => {
  square.classList.add('drawn');
});
// or
square.addEventListener('mouseover', () => { ... })

// If you want one handler for all squares:
container.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('square')) {
    e.target.classList.add('drawn');
  }
});
// Key idea: e.target is the actual element that triggered the event.

// Common Event Categories
//  Mouse / Pointer
// click
// dblclick
// mousedown
// mouseup
// mousemove
// mouseenter / mouseleave
// mouseover / mouseout
// contextmenu (right-click)
//  Keyboard
// keydown
// keypress (deprecated, but still seen)
// keyup
//  Form / Input
// input (fires on every change)
// change (fires when leaving field)
// focus
// blur
// submit
//  Window / Document
// load (page finished loading)
// resize
// scroll
// beforeunload
// DOMContentLoaded
//  Touch / Mobile
// touchstart
// touchmove
// touchend
//  Drag & Drop
// dragstart, drag, dragenter, dragover, dragleave, drop, drage

// ==================================================================

// prompt
const input = prompt('Grid size? (max 100)');

// ==================================================================

// Clearing the container:
container.innerHTML = ''; // simplest: wipe children
// or
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// ==================================================================

// Flexbox & layout for the grid
// Your container is a flexbox that wraps the squares.
// #container {
//   display: flex;
//   flex-wrap: wrap;
//   width: 640px;    /* or 960px per project text */
//   height: 640px;   /* keep it square */
// }

// Core flexbox properties you’ll actually touch:
// display: flex; – enable flexbox.
// flex-direction: row | column; – main axis horizontal vs vertical.
// flex-wrap: wrap; – allows items to wrap to next line.
// justify-content: ...; – align items along main axis. Common values:
//      flex-start, center, space-between, space-around.
// align-items: ...; – align along cross axis (flex-start, center, stretch).
// gap: 2px; – spacing between squares without fiddling with margins.

// To fully center something in a flex container (often used around the canvas):
// .wrapper {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// Making perfect squares
// Given N x N grid and a fixed container size:
// .square {
//   box-sizing: border-box;
//   border: 1px solid #ddd;
// }
// Then in JS, compute size:
const size = 16;
const containerSize = 640; // must match CSS width/height
const squareSize = containerSize / size;

square.style.width = `${squareSize}px`;
square.style.height = `${squareSize}px`;
// Important bits:
// box-sizing: border-box; includes border and padding in the element’s width/height calculations (so borders don’t break your math).
// Borders and margins enlarge boxes unless you account for them; use box-sizing: border-box and avoid margins on .square if you want an exact fit.

// ==================================================================

// Box model essentials you’ll actually care about
// For your layout sanity:

// * {
//   box-sizing: border-box;
// }

// body {
//   margin: 0;
// }
// padding – inside border, between content and border.
// border – line around padding + content.
// margin – outside border, space between elements.
// Use:
// margin to move elements away from each other (e.g. space between button and grid).
// padding to add breathing room inside an element.

// more context:
// The Box Model — Every Element Is a Box

// Every HTML element is rendered as a rectangular box made of four parts:
// +---------------------------+
// |        margin             |  ← space *outside* the element
// |  +---------------------+  |
// |  |      border         |  |  ← visible line around element
// |  |  +---------------+  |  |
// |  |  |   padding     |  |  |  ← space *inside* border, before content
// |  |  |  +---------+  |  |  |
// |  |  |  | content |  |  |  |  ← actual content area (text, image, etc.)
// |  |  |  +---------+  |  |  |
// |  |  +---------------+  |  |
// |  +---------------------+  |
// +---------------------------+
// When you set width and height in CSS, by default they apply only to the content area — margins, borders, and padding add extra size on top of that.
// That’s often what causes elements to “mysteriously” overflow containers.

// The Fix: box-sizing: border-box;
// If you include this line (which most developers do globally):
// * {
//   box-sizing: border-box;
// }
// …it changes the math so that: total element size = width + height (you set)
// and the border + padding fit inside that box instead of expanding it.
// That makes layout math predictable, especially for things like your grid squares where you want exact sizing.

// Flexbox still uses the box model underneath.
// When Flexbox decides how to wrap and size your .square divs, it looks at their computed widths and heights — which include padding, borders, and margins according to these box model rules.
// So if you forget box-sizing: border-box, your grid math (640px / 16 = 40px) will be off, because each border adds extra pixels.

// ==================================================================

// Display types that affect layout
// Relevant mostly for understanding why things stack or sit side-by-side:
// Block elements (div, p, h1, etc.) take full width, start on new line (display: block).
// Inline elements (span, a) flow inside a line of text; width/height behave differently.
// Your grid is all block elements (divs) but flexbox overrides how they lay out.

// ==================================================================

// debug prints:
console.log('building grid with size', size);