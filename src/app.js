import './components/MyButton.js'
import './components/MyDropdown.js'
import './components/LithButton.js'
import './components/UglyPaper.js'
import './components/WcTimer.js'

const first = document.querySelector("my-button")
setTimeout(_ => { first.label = "Click me now" }, 2000);

const second = document.querySelector("my-button:nth-child(2)");
second.addEventListener("onClick", ({ detail }) => console.log("handling onClick: " + detail));

const last = document.querySelector("my-button:last-child");
last.onClick = ({ detail }) => console.log("triggered outside onClick: " + detail);