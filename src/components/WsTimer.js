import { html, PlainElement } from "/plain-element.js"
import './WsDigit.js'

const template = html`
    <div style="margin: 8px">
        <div style="padding: 8px; font-size: 3em; font-family: sans-serif">
            <ws-digit id="h" last="24" freq="3600000"></ws-digit>
            <ws-digit id="m" freq="60000"></ws-digit>
            :
            <ws-digit id="ts" last="6" freq="10000"></ws-digit>
            <ws-digit id="s" freq="1000"></ws-digit>
            ,
            <ws-digit id="ths" freq="100"></ws-digit>
            <ws-digit id="hhs" freq="10"></ws-digit>
            <ws-digit id="ms" freq="1"></ws-digit>
            <button style="margin-left:4px">On</button>
        <div>
    </div>
`;

class WsTimer extends PlainElement {

    constructor() {
        super();
        this.shadowRoot.innerHTML = template(this);

        this.$button = this.shadowRoot.querySelector("button");
        this.$button.onclick = this.toggle;
        
        this.$digits = this.shadowRoot.querySelectorAll("ws-digit");
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

customElements.define("ws-timer", WsTimer);


