import { Task, TaskStatus } from '@lit/task';
import closeIcon from '@material-symbols/svg-400/outlined/close.svg?raw';
import sendIcon from '@material-symbols/svg-400/outlined/send.svg?raw';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
        margin: 0 ${theme.space(4)} 0 ${theme.space(6)};
        flex-grow: 1;
      }

      /* Close Button */
      md-icon-button {
        --md-icon-button-state-layer-height: var(--chat-room-header-icon-size);
        --md-icon-button-state-layer-width: var(--chat-room-header-icon-size);
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

@customElement('chat-room-message-list')
export class ChatRoomMessageListElement extends LitElement {
  static override styles = [
    typescaleStyles,
    theme.color,
    theme.shape,
    css`
      :host {
        flex-grow: 1;
        max-height: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        background-color: var(--md-sys-color-surface);
      }
      md-list {
        border-radius: var(--md-sys-shape-corner-medium);

        padding: 0;
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
        --md-list-item-leading-image-height: 3.5rem;
        --md-list-item-leading-image-width: 3.5rem;
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

  /** Property to store error state */
  @property({ attribute: 'is-error', type: Boolean })
  private isError: boolean = false;

  /** Property to indicate loading state */
  @property({ attribute: 'is-loading', type: Boolean })
  private isLoading: boolean = false;

  @property()
  private messages: Array<{ content: string; role: 'assistant' | 'user' }> = [];

  override render() {
    return html`
      <md-list>
        ${this.messages.map(message => {
          return html`<md-list-item data-message-role=${message.role}>
              ${message.role === 'assistant'
                ? html`<img slot="start" alt="ChatBot" src="${chatBotIcon}" />`
                : null}
              <p>${unsafeHTML(sanitizeHtml(message.content))}</p> </md-list-item
            >${message.role === 'assistant'
              ? html`<md-divider></md-divider>`
              : null}`;
        })}
        ${this.isError
          ? html` <md-divider></md-divider>
              <md-list-item
                data-message-role="assistant"
                data-message-status="error"
              >
                <img slot="start" alt="ChatBot" src="${chatBotIcon}" />
                <p>I couldn't complete that request. Please try again!</p>
              </md-list-item>`
          : null}
        ${this.isLoading
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
    `;
  }
}

@customElement('chat-room-message-form')
export class ChatRoomMessageForm extends LitElement {
  static override styles = [
    typescaleStyles,
    theme.color,
    theme.shape,
    css`
      svg {
        fill: currentColor;
      }

      form {
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
    `,
  ];

  @property({
    type: Array<{
      content: string;
      role: 'assistant' | 'user';
    }>,
  })
  messages: Array<{
    content: string;
    role: 'assistant' | 'user';
  }> = [];

  /** Property to store error state */
  @property({ attribute: 'is-error', type: Boolean })
  private isError: boolean = false;

  /** Property to indicate loading state */
  @property({ attribute: 'is-loading', type: Boolean })
  private isLoading: boolean = false;

  processPastedContent(event: ClipboardEvent) {
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

  override render() {
    const lastMessageContent =
      this.isError && this.messages.length > 2
        ? this.messages[this.messages.length - 1].content
        : '';

    return html`
      <form @submit=${this.submitUserMessage}>
        <md-filled-text-field
          ?disabled=${this.isLoading}
          label="Type your question..."
          name="message"
          placeholder="Got a question? Type here..."
          type="textarea"
          value=${lastMessageContent}
          required
          @paste=${this.processPastedContent}
        >
        </md-filled-text-field>
        <md-filled-icon-button
          title="Ask question to bot"
          type="submit"
          ?disabled=${this.isLoading}
        >
          ${unsafeHTML(sendIcon)}
        </md-filled-icon-button>
      </form>
    `;
  }

  submitUserMessage(event: Event) {
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

    // Emit a custom event to notify the parent
    this.dispatchEvent(
      new CustomEvent('submit-user-message', {
        detail: { content: userMessage, role: 'user' },
      }),
    );
    form.reset();
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

      aside {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: var(--md-sys-color-surface-container);
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
        <chat-room-message-list
          .messages=${this.messages}
          ?is-error=${isFetchingTaskError}
          ?is-loading=${isFetchingTaskPending}
        ></chat-room-message-list>
        <chat-room-message-form
          .messages=${this.messages}
          ?is-error=${isFetchingTaskError}
          ?is-loading=${isFetchingTaskPending}
          @submit-user-message=${this.submitUserMessage}
        ></chat-room-message-form>
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
      const list = this.shadowRoot?.querySelector('chat-room-message-list');
      const lastItem = list?.shadowRoot?.querySelector(
        'md-list-item:last-child',
      );
      if (lastItem) {
        lastItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }

  private async submitUserMessage(event: CustomEvent) {
    this.messages = [...this.messages, event.detail];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'chat-room-message-form': ChatRoomMessageForm;
    'portfolio-chat-room': PortfolioChatRoomElement;
  }
}
