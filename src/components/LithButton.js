import { html, LithElement } from '/lith-element.js'

class LithButton extends LithElement {
    static get observedAttributes() {
        return ['label', 'color', 'asAtom', 'clicks'];
    }

    constructor() {
        super();
        console.log("create");
    }

    handleClick = () => {
        console.log("clicked");
        
        if ("clicks" in this) {
            this.clicks = parseInt(this.clicks);
            ++this.clicks;
            this.setAttribute("clicks", this.clicks);
        }

        this.dispatchEvent(new CustomEvent("onClick", {detail: this.label }))
    }

    getLabel() {
        const label = this.label || this.originalContent;
        return this.clicks !== undefined ? `${label} (${this.clicks})` : label;
    }

    render() {
        return html`
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
                    min-width: 8em;
                    width: 100%;
                    height: 40px;
                    box-sizing: border-box;
                    border: 1px solid ${this.color};
                    background: #ffffff;
                    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
                    color: ${this.color};
                    cursor: pointer;
                }
            </style>
            
            <div class="container">
                <button @click=${this.handleClick}>${this.getLabel()}</button>
            </div>
        `;
    }
}

customElements.define('lith-button', LithButton);
