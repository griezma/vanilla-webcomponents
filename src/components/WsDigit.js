import { html, PlainElement } from "/plain-element.js"

function interp(from, to, steps, index) {
    const inc = (to - from) / (steps - 1);
    return from + inc * index; 
}

function pad(value, width, pad='0') {
    return value.padStart(width, pad);

}

class WsDigit extends PlainElement {
    
    static get observedAttributes() {
        return ["freq", "first", "last"];
    }
    
    value = 0;
    first = 0;
    last = 10;
    
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
        this.value = (this.value + 1) % last + first;
        this.updateView();
    }

    render() {
        const value = this.value;
        const out = this.$out;

        const steps = this.last - this.first;
        const fw = Math.round(interp(100, 900, steps, value));
        
        const nColor = Math.round(interp(0x007777, 0xff0000, steps, value));    
        const color = '#' + pad(nColor.toString(16), 6, '0');

        const bw = Math.round(3 * value);

        // console.log("value", value, "fw", fw, "color", color);

        const { style } = out;
        style.fontWeight = fw;
        style.color = color;
        style.borderTop = `${bw}px solid ${color}`;

        this.$out.innerText = this.value;
    }
}

customElements.define("ws-digit", WsDigit);