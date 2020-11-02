import { html, PlainElement } from "/plain-element.js"
import './WcDigit.js'

const template = html`
    <div style="margin-left:24px">
        <div style="display:flex; align-items:flex-end; font-size:3em; height:2em; width:5em; font-family:Arial,sans-serif">
            <wc-digit id="h" last="24" freq="3600000"></wc-digit>
            <wc-digit id="m" freq="60000"></wc-digit>
            :
            <wc-digit id="ts" last="6" freq="10000"></wc-digit>
            <wc-digit id="s" freq="1000"></wc-digit>
            .
            <wc-digit id="ths" freq="100"></wc-digit>
            <wc-digit id="hhs" freq="10"></wc-digit>
            <wc-digit id="ms" freq="1"></wc-digit>
        </div>    
        <button>On</button>
    </div>
`;

class WcTimer extends PlainElement {

    constructor() {
        super();
        this.shadowRoot.innerHTML = template(this);

        this.$button = this.shadowRoot.querySelector("button");
        this.$button.onclick = this.toggle;
        
        this.$digits = this.shadowRoot.querySelectorAll("wc-digit");
    }

    on = false;

    toggle = _ => {
        if (this.on) {
            this.stop();
        } else {
            this.start();
        }
    }

    start() {
        this.$digits.forEach(el => el.start());
        this.$button.innerText = "Off"
        this.on = true;
    }

    stop() {
        this.$digits.forEach(el => el.stop());
        this.$button.innerText = "On";
        this.on = false;
    }
}

customElements.define("wc-timer", WcTimer);


