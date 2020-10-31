export { html, PlainElement }

function html(strings, ...keys) {
    return function(dict) {    
        const result = [strings[0]];
        keys.forEach((k, i) => result.push(dict[k], strings[i + 1]))
        return result.join('');
    }
}

async function loadHtml(metaurl, base) {
    console.log("loadHtml", base);
    const url = new URL(`${base}.html`, metaurl);
    const html = await fetch(url)
        .then(resp => resp.text());

    const span = document.createElement("span");
    span.innerHTML = html;
    // console.log("loaded", span.firstElementChild);
    return span.firstElementChild;
}

const loading = new Set();

async function fetchTemplate(metaurl, basename) {
    console.log("fetchTemplate", basename);

    const foundTemplate = document.getElementById(basename);
    if (foundTemplate) {
        return foundTemplate;
    }

    if (loading.has(basename)) {
        do {
            console.log("waiting", basename, "...");
            await wait(10);
        } while (loading.has(basename));
        return document.getElementById(basename);
    }

    loading.add(basename);

    try {
        const loadedTemplate = await loadHtml(metaurl, basename);
        loadedTemplate.id=basename;
        document.body.appendChild(loadedTemplate);
        return loadedTemplate;
    } finally {
        loading.delete(basename);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class PlainElement extends HTMLElement {

    constructor() {
        super();
        this.originalContent = this.firstChild?.data;
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        console.log("connected", this.tagName);
        this.updateView();
    }

    attributeChangedCallback(name, old, value) {
        console.log("changed", name, old, value);
        
        if (value !== old) {
            this[name] = value;
            this.updateView();
        }
    }

    loadTemplate(metaurl, basename = this.tagName.toLowerCase()) {
        fetchTemplate(metaurl, basename).then(templ => {
            this.templateId = basename;
            this.templateLoaded();
        });
    }

    templateLoaded() {
        this.root.appendChild(this.template);
        this.updateView();
    }

    get template() {
        if (!this.templateContent) {
            this.templateContent = document.getElementById(this.templateId)?.content.cloneNode(true);
        }
        return this.templateContent;
    }

    render() {}

    updateView() {
        console.log("updateView");
        this.render();
    }
}
