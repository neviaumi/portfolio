import { Task, TaskStatus } from '@lit/task';
import closeIcon from '@material-symbols/svg-400/outlined/close.svg?raw';
import sendIcon from '@material-symbols/svg-400/outlined/send.svg?raw';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@material/web/button/elevated-button.js';
import '@material/web/divider/divider.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/textfield/filled-text-field';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/progress/linear-progress.js';

import chatBotIcon from './assets/chat-bot-256x256.png';
import * as theme from './theme.ts';

const WORKER_BASE_URL = import.meta.env['VITE_WORKER_BASE_URL'];

function sanitizeHtml(html: string) {
  const endIndex = html.indexOf('<'),
    startIndex = html.lastIndexOf('>');
  if (endIndex === -1 || startIndex === -1) {
    return html;
  }
  return html.substring(startIndex, endIndex);
}

@customElement('chat-room-header')
export class ChatRoomHeaderElement extends LitElement {
  static override styles = [
    typescaleStyles,
    theme.color,
    theme.shape,

    css`
      :host {
        /* Customizable variable for icon size */
        --chat-room-header-icon-size: ${theme.space(6)};
      }

      svg {
        fill: currentColor;
      }

      header {
        /* Material Design color and shape tokens */
        background-color: var(--md-sys-color-primary);
        padding: 0 ${theme.space(4)};
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--md-sys-color-on-primary);
      }

      /* Chat Bot Icon */
      header img {
        width: var(--chat-room-header-icon-size);
        height: var(--chat-room-header-icon-size);
        aspect-ratio: 1;
      }

      /* Title */
      header h1 {
        margin: 0 ${theme.space(4)};
        flex-grow: 1;
      }

      /* Close Button */
      md-icon-button {
        --md-icon-button-icon-size: var(--chat-room-header-icon-size);
        --md-icon-button-icon-color: var(--md-sys-color-on-primary);
      }
    `,
  ];

  override render() {
    return html`
      <header>
        <img src="${chatBotIcon}" alt="Chat Bot Icon" />
        <h1 class="md-typescale-headline-large">Meet David</h1>
        <md-icon-button @click=${this.handleClose}>
          ${unsafeHTML(closeIcon)}
        </md-icon-button>
      </header>
    `;
  }

  private handleClose() {
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
        detail: { reason: 'user action' },
      }),
    );
  }
}

@customElement('portfolio-chat-room')
export class PortfolioChatRoomElement extends LitElement {
  static override styles = [
    typescaleStyles,
    theme.color,
    theme.shape,
    css`
      :host {
        display: block;
        width: 20rem;
        aspect-ratio: 1/2;
        max-height: 100vh;
      }
      svg {
        fill: currentColor;
      }

      aside {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: var(--md-sys-color-surface-container);
      }

      aside > form {
        margin: ${theme.space(2)} 0 ${theme.space(4)};
        padding: 0 ${theme.space(2)} 0 ${theme.space(2)};
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: ${theme.space(2)};
      }

      md-filled-text-field {
        width: 100%;
      }

      md-list {
        background-color: var(--md-sys-color-surface);
        border-radius: var(--md-sys-shape-corner-medium);
        width: 100%;
        flex-grow: 1;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 100%;
        height: fit-content;
        padding-top: 0;
      }

      md-list-item {
        --md-list-item-container-shape: var(--md-sys-shape-corner-medium);
      }

      md-list-item p {
        border-radius: var(--md-list-item-container-shape);
        padding: ${theme.space(2)} ${theme.space(4)} ${theme.space(2)}
          ${theme.space(4)};
        margin: 0px;
        display: block;
      }

      md-list-item[data-message-role='user'] p {
        background-color: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
      }

      md-list-item[data-message-role='assistant'] {
        --md-list-item-leading-image-height: 56px;
        --md-list-item-leading-image-width: 56px;
      }

      md-list-item[data-message-role='assistant'] img {
        height: var(--md-list-item-leading-image-height);
        width: var(--md-list-item-leading-image-width);
      }

      md-list-item[data-message-role='assistant'] p {
        background-color: var(--md-sys-color-secondary-container);
        color: var(--md-sys-color-on-secondary-container);
      }

      md-list-item[data-message-role='assistant'][data-message-status='error']
        p {
        background-color: var(--md-sys-color-error-container);
        color: var(--md-sys-color-on-error-container);
      }

      md-divider {
        height: var(--md-divider-thickness, 1px);
        min-height: var(--md-divider-thickness, 1px);
      }

      md-list-item[data-message-role='assistant'] p h2,
      md-list-item[data-message-role='assistant'] p h1 {
        margin-top: 0;
      }
    `,
  ];

  @state()
  messages: Array<{ content: string; role: 'assistant' | 'user' }> = [
    {
      content: 'Can you provide some example questions I can ask ?',
      role: 'user',
    },
  ];

  private _chatToAssistantTask = new Task(this, {
    args: () => [this.messages],
    task: async ([messages], { signal }) => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Put some delay before fetching
      const response = await fetch(WORKER_BASE_URL, {
        body: JSON.stringify({
          messages: messages,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        signal, // Attach the signal to the fetch request
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      return await response.json();
    },
  });

  override render() {
    const renderChatRoom = () => {
      const fetchingTaskState = this._chatToAssistantTask.status;
      const isFetchingTaskError = fetchingTaskState === TaskStatus.ERROR;
      const isFetchingTaskPending = fetchingTaskState === TaskStatus.PENDING;

      return html`<aside title="Meet David">
        <chat-room-header></chat-room-header>
        <md-list aria-label="Messages">
          ${this.messages.map(message => {
            return html`<md-list-item data-message-role=${message.role}>
                ${message.role === 'assistant'
                  ? html`<img
                      slot="start"
                      alt="ChatBot"
                      src="${chatBotIcon}"
                    />`
                  : null}
                <p>
                  ${unsafeHTML(sanitizeHtml(message.content))}
                </p> </md-list-item
              >${message.role === 'assistant'
                ? html`<md-divider></md-divider>`
                : null}`;
          })}
          ${isFetchingTaskError
            ? html` <md-divider></md-divider>
                <md-list-item
                  data-message-role="assistant"
                  data-message-status="error"
                >
                  <img slot="start" alt="ChatBot" src="${chatBotIcon}" />
                  <p>I couldn't complete that request. Please try again!</p>
                </md-list-item>`
            : null}
          ${isFetchingTaskPending
            ? html` <md-divider></md-divider>
                <md-list-item data-message-role="assistant">
                  <img slot="start" alt="ChatBot" src="${chatBotIcon}" />
                  <p>
                    <md-linear-progress
                      aria-label="Loading..."
                      four-color
                      indeterminate
                    ></md-linear-progress>
                  </p>
                </md-list-item>`
            : null}
        </md-list>
        <form @submit="${this.submitUserMessage}">
          <md-filled-text-field
            ?disabled="${isFetchingTaskPending}"
            label="Type your question..."
            name="message"
            placeholder="Got a question? Type here..."
            type="textarea"
            value="${isFetchingTaskError && this.messages.length > 2
              ? this.messages[this.messages.length - 1].content
              : ''}"
            required
            @paste="${this.processPastedContent}"
          >
          </md-filled-text-field>
          <md-filled-icon-button
            title="Ask question to bot"
            type="submit"
            ?disabled="${isFetchingTaskPending}"
          >
            ${unsafeHTML(sendIcon)}
          </md-filled-icon-button>
        </form>
      </aside>`;
    };

    return html`${this._chatToAssistantTask.render({
      complete: messages => {
        this.messages = messages;
        return renderChatRoom();
      },
      error: () => renderChatRoom(),

      initial: () => html`<p>Waiting to start task</p>`,
      pending: () => renderChatRoom(),
    })}`;
  }

  override async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('messages')) {
      await this.updateComplete;
      this.jumpToLastListItem(); // Jump to the top of the last assistant message
    }
  }

  private jumpToLastListItem() {
    setTimeout(() => {
      const lastItem = this.shadowRoot?.querySelector(
        'md-list-item:last-child',
      );
      if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400);
  }

  private processPastedContent(event: ClipboardEvent): void {
    const textarea = event.target as HTMLTextAreaElement;

    // Retrieve pasted data from the clipboard
    const pastedData = event.clipboardData?.getData('text') || ''; // Safeguard with optional chaining

    // Sanitize pasted data: remove line breaks and trim whitespaces
    const sanitizedValue = pastedData.trim();

    // Prevent default paste behavior
    event.preventDefault();

    // Insert sanitized value into the textarea
    textarea.value += sanitizedValue;
  }

  private async submitUserMessage(event: Event) {
    // Prevent the form's default submit behavior (page reload)
    event.preventDefault();
    // Get the textarea value from the form
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      return;
    }
    const input = form.elements.namedItem('message') as HTMLTextAreaElement;
    const userMessage = input.value.trim();

    // Ensure the input is not empty
    if (!userMessage) return;
    this.messages = [...this.messages, { content: userMessage, role: 'user' }];
    form.reset();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'portfolio-chat-room': PortfolioChatRoomElement;
  }
}
