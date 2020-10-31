import { PlainElement } from '/plain-element.js';

class UglyPaper extends PlainElement {
    constructor() {
        super();
        this.loadTemplate(import.meta.url);
    }
}

customElements.define("ugly-paper", UglyPaper);