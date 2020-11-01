import { html, render } from 'http://unpkg.com/lit-html@1.3.0/lit-html.js?module';

export { html, render, LithElement }

class LithElement extends HTMLElement {

    constructor() {
        super();
        // sets this.shadowRoot
        this.attachShadow({mode: 'open'}); 
    }

    connectedCallback() {
        // console.log("connected", this.tagName);
        this.updateView();
    }

    attributeChangedCallback(name, old, value) {
        // console.log("changed", name, old, value);
        this[name] = value;
        this.updateView();
    }

    get childText() {
        return this.firstChild?.data;
    }

    render() {}

    updateView() {
        // console.log("updateView");
        render(this.render(), this.shadowRoot);
    }
}
