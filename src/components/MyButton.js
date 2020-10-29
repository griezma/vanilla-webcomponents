import html from './html.js'

const template = html`
    <style>
        .container {
            padding: 8px;
        }
    
        button {
            display: inline-block;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            padding: 0 8px;
            min-width: 16em;
            width: 100%;
            height: 40px;
            box-sizing: border-box;
            border: 1px solid ${'color'};
            background: #ffffff;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
            color: ${'color'};
            cursor: pointer;
        }
    </style>
    
    <div class="container">
        <button>${'label'}</button>
    </div>
`;


export class MyButton extends HTMLElement {

    constructor() {
        super();

        // console.log("created", this.label);

        this.root = this.attachShadow({mode: 'open'});
        this.root.innerHTML = template(this);

        this.$button = this.root.querySelector("button");
        this.$container = this.root.querySelector(".container");

        const sClicks = this.getAttribute("clicks");
        sClicks && (this.clicks = parseInt(sClicks));

        if (this.asAtom) {
            this.$container.style.padding = '0';
        }
    }

    connectedCallback() {
        // console.log("connected", this.label);
        this.$button.addEventListener("click", this.handleClick);
        this.render();
    }

    disconnectedCallback() {
        // console.log("disconnected", this.label);
        this.$button.removeEventListener("click", this.handleClick);
    }

    handleClick = _ => {
        this.dispatchEvent(new CustomEvent('onClick', { detail: 'good click' }));
        
        if ('clicks' in this) {
            this.clicks++;
            this.render();
        }
    }

    static get observedAttributes() {
        return ['label', 'color'];
    }
    
    attributeChangedCallback(name, old, value) {
        console.log("changed", name, old, value);
        this.render();
    }
    
    get asAtom() {
        return this.hasAttribute('as-atom');
    }

    set onClick(handler) {
        this.addEventListener('onClick', handler);
    }

    get label() {
        return this.getAttribute("label");
    }

    set label(value) {
        console.log('setLabel', value);
        this.setAttribute('label', value);
    }

    get color() {
        return this.getAttribute("color") || "grey";
    }

    set color(value) {
        this.setAttribute("color", value);
    }

    get buttonStyle() {
        const color = this.color;
        return `color:${color};border-color:${color}`;
    }

    render() {
        this.$button.style.cssText = this.buttonStyle;

        const label = this.clicks ? `${this.label} (${this.clicks} clicks)` : this.label;
        this.$button.innerHTML = label;
    }
}

window.customElements.define('my-button', MyButton);
