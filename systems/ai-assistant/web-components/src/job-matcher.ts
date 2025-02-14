class JobMatcherElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }
    connectedCallback() {
        const template = document.createElement('template');
        // language=html
        template.innerHTML = `<div>Hello World from Job Matcher</div>`
    }
}

customElements.define('portfolio-job-matcher', JobMatcherElement);