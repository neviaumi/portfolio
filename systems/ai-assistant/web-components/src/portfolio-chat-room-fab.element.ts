import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import chatBotIcon from './assets/chat-bot-256x256.png';

import '@material/web/fab/branded-fab.js';

// import * as theme from './theme.ts';

@customElement('portfolio-chat-room-fab')
export class PortfolioChatRoomFabElementElement extends LitElement {
  override render() {
    return html`
      <md-branded-fab label="Chat with AI" disabled>
        <img slot="icon" alt="Chat Bot Icon" src="${chatBotIcon}" />
      </md-branded-fab>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'portfolio-chat-room-fab': PortfolioChatRoomFabElementElement;
  }
}
