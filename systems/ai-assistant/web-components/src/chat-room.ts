class ChatRoomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
    }
    connectedCallback() {
        const template = document.createElement('template');
        // language=html
        template.innerHTML = `<div>
            Hello World from ChatRoom
            <pre id="result"></pre>
        </div>`;
        fetch("https://ai-assistant-worker.david-ng-dev.workers.dev/")
            .then(res => res.text()).then(text => {
                document.getElementById('result').innerHTML = text;
        })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('portfolio-chat-room', ChatRoomElement);