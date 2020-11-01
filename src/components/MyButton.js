import { html, PlainElement } from '/plain-element.js'

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


class MyButton extends PlainElement {
    
    static get observedAttributes() {
        return ['color', 'clicks', 'label'];
    }

    constructor() {
        super();
        this.shadowRoot.innerHTML = template(this);
        this.$button = this.shadowRoot.querySelector("button");
        this.$container = this.shadowRoot.querySelector(".container");
    }

    connectedCallback() {
        this.$button.addEventListener("click", this._handleClick);
        this.updateView();
    }

    disconnectedCallback() {
        // console.log("disconnected", this.label);
        this.$button.removeEventListener("click", this._handleClick);
    }

    _handleClick = _ => {
        this.dispatchEvent(new CustomEvent('onClick', { detail: 'good click' }));
        
        if ('clicks' in this) {
            this.clicks++;
            this.render();
        }
    }

    set onClick(handler) {
        this.addEventListener('onClick', handler);
    }

    get buttonStyle() {
        const color = this.color;
        return `color:${color};border-color:${color}`;
    }

    get label() {
        return this.getAttribute("label") || this.innerHTML;
    }

    set label(value) {
        this.setAttribute("label", value);
    }

    render() {
        this.$button.style.cssText = this.buttonStyle;
        const label = this.clicks>0 ? `${this.label} (${this.clicks} clicks)` : this.label;
        this.$button.innerText = label;
        if ('as-atom' in this) {
            this.$container.style.padding = '0';
        }
    }
}

window.customElements.define('my-button', MyButton);
