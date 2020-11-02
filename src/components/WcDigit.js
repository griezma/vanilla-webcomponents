import { html, PlainElement } from "/plain-element.js"
import { interpInt, interpColor } from "/interpolate.js"

class WcDigit extends PlainElement {
    
    static get observedAttributes() {
        return ["freq", "first", "last"];
    }
    
    value = 0;
    first = 0;
    last = 9;
    
    constructor() {
        super(false);
        this.root.innerHTML = `<span>0<span>`;
        this.$out = this.root.firstElementChild;
    }

    disconnectedCallback() {
        this.stop();
    }

    start() {
        if (this._interv) {
            console.log("already started");
            return;
        }

        const first = parseInt(this.first) || 0;
        const last = parseInt(this.last) || 10;
        const freq = parseInt(this.freq);

        if (!freq) {
            console.log("freq required");
            return;
        }

        this._interv = setInterval(_ => this.tick(first, last), freq);
    }

    stop() {
        this._interv && clearInterval(this._interv);
        this._interv = null;
    }

    tick(first, last) {
        // console.log("tick", last);
        this.value = first + (this.value + 1) % (last + 1);
        this.updateView();
    }

    render() {
        const value = this.value;
        const out = this.$out;

        const steps = this.last - this.first;
        
        const fontWeight = interpInt(100, 900, steps)(value);
        const color = interpColor(0x007777, 0xff0000, steps)(value);
        const borderWidth = Math.round(2 * value);

        console.log("value", value, "fw", fontWeight, "color", color);

        const { style } = out;
        style.fontWeight = fontWeight;
        style.color = color;
        style.borderTop = `${borderWidth}px solid ${color}`;

        this.$out.innerText = this.value;
    }
}

customElements.define("wc-digit", WcDigit);