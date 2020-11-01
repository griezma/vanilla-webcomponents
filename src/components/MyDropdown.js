import './MyButton.js'

const template = `
    <style>
        :host {
            font-family: sans-serif;
        }
        .dropdown {
            width: 100%;
        }
        .list-container {
            padding: 8px 16px 16px;
        }
        .label {
            display: block;
            margin-bottom: 4px;
            font-size: 1.1em;
        }
        ul {
            display: none;
            width: 100%;
            max-height: 10em;
            overflow-y: auto;
            margin-top: 4px;
            padding: 0;
            border: 1px solid #a1a1a1;
            list-style: none;
            box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
        }
        .dropdown.open ul {
            display: flex;
            flex-direction: column;
        }
        li {
            display: flex;
            align-items: center;
            padding: 0 16px;
            height: 2em;
            cursor: pointer;
        }
        li.selected {
            font-weight: 600;
        }
    </style>

    <div class="dropdown">
        <span class="label">Label</span>
        <div class="list-container">
            <my-button as-atom label="Select Option"></my-button>
            <ul>
        </div>
    </div>
`;

class MyDropdown extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;

        this.$dropdown = this.shadowRoot.querySelector(".dropdown");
        this.$label = this.shadowRoot.querySelector(".label");
        this.$button = this.shadowRoot.querySelector("my-button");
        this.$ul = this.shadowRoot.querySelector("ul");

        this.$button.onClick = this.toggleOpen;
        this.$ul.onclick = this.selectOption;
    }

    static get observedAttributes() {
        return ['label', 'option', 'options'];
    }

    attributeChangedCallback(name, old, value) {
        console.log("changed", name, old, value);
        this.render();
    }

    get option() {
        return this.getAttribute("option");
    }

    set option(value) {
        this.setAttribute('option', value);
    }

    get options() {
        return JSON.parse(this.getAttribute("options"));
    }

    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
    }

    get label() {
        return this.getAttribute("label");
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    toggleOpen = _ => {
        const cl = this.$dropdown.classList;
        cl.contains("open") ? cl.remove("open") : cl.add("open");
    }

    selectOption = ev => {
        console.log("selectOption:", ev);
        this.option = ev.path[0].key;
        this.toggleOpen();
    }

    get selectedOption() {
        return this.option && this.options[this.option];
    }

    render() {
        this.$label.innerHTML = this.label;
        this.$button.label = this.selectedOption?.label || "Select Option";

        const ul = this.$ul;
        ul.innerHTML = "";

        Object.keys(this.options).forEach(key => {
            const option = this.options[key];
            const li = document.createElement("li");
            li.key = key;
            li.innerHTML = option.label;
            (key === this.option) && li.classList.add("selected");
            ul.appendChild(li);
        })
    }
}

customElements.define('my-dropdown', MyDropdown);