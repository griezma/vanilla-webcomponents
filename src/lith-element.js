import { html, render } from 'http://unpkg.com/lit-html@1.3.0/lit-html.js?module';

export { html, render, LithElement }

class LithElement extends HTMLElement {

    constructor() {
        super();
        this.originalContent = this.firstChild?.data;
        this.root = this.attachShadow({mode: 'open'}); 
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

    render() {}

    updateView() {
        // console.log("updateView");
        render(this.render(), this.root);
    }
}
