import { Task, TaskStatus } from '@lit/task';
import closeIcon from '@material-symbols/svg-400/outlined/close.svg?raw';
import sendIcon from '@material-symbols/svg-400/outlined/send.svg?raw';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/button/elevated-button.js';
import '@material/web/divider/divider.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/textfield/filled-text-field';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/progress/linear-progress.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import chatBotIcon from './assets/chat-bot-256x256.png';

const WORKER_BASE_URL = import.meta.env['VITE_WORKER_BASE_URL'];

function sanitizeHtml(html: string) {
  const endIndex = html.indexOf('<'),
    startIndex = html.lastIndexOf('>');
  if (endIndex === -1 || startIndex === -1) {
    return html;
  }
  return html.substring(startIndex, endIndex);
}

function space(factor: number) {
  return unsafeCSS(`${factor * 0.25}rem`);
}

const theme = {
  color: css`
    :host {
      --md-sys-color-primary: rgb(101 85 143);
      --md-sys-color-surface-tint: rgb(103 80 164);
      --md-sys-color-on-primary: rgb(255 255 255);
      --md-sys-color-primary-container: rgb(234 221 255);
      --md-sys-color-on-primary-container: rgb(33 0 93);
      --md-sys-color-secondary: rgb(98 91 113);
      --md-sys-color-on-secondary: rgb(255 255 255);
      --md-sys-color-secondary-container: rgb(232 222 248);
      --md-sys-color-on-secondary-container: rgb(29 25 43);
      --md-sys-color-tertiary: rgb(125 82 96);
      --md-sys-color-on-tertiary: rgb(255 255 255);
      --md-sys-color-tertiary-container: rgb(255 216 228);
      --md-sys-color-on-tertiary-container: rgb(49 17 29);
      --md-sys-color-error: rgb(179 38 30);
      --md-sys-color-on-error: rgb(255 255 255);
      --md-sys-color-error-container: rgb(249 222 220);
      --md-sys-color-on-error-container: rgb(65 14 11);
      --md-sys-color-background: rgb(254 247 255);
      --md-sys-color-on-background: rgb(29 27 32);
      --md-sys-color-surface: rgb(254 247 255);
      --md-sys-color-on-surface: rgb(29 27 32);
      --md-sys-color-surface-variant: rgb(231 224 236);
      --md-sys-color-on-surface-variant: rgb(73 69 79);
      --md-sys-color-outline: rgb(121 116 126);
      --md-sys-color-outline-variant: rgb(202 196 208);
      --md-sys-color-shadow: rgb(0 0 0);
      --md-sys-color-scrim: rgb(0 0 0);
      --md-sys-color-inverse-surface: rgb(50 47 53);
      --md-sys-color-inverse-on-surface: rgb(245 239 247);
      --md-sys-color-inverse-primary: rgb(208 188 255);
      --md-sys-color-primary-fixed: rgb(234 221 255);
      --md-sys-color-on-primary-fixed: rgb(33 0 93);
      --md-sys-color-primary-fixed-dim: rgb(208 188 255);
      --md-sys-color-on-primary-fixed-variant: rgb(79 55 139);
      --md-sys-color-secondary-fixed: rgb(232 222 248);
      --md-sys-color-on-secondary-fixed: rgb(29 25 43);
      --md-sys-color-secondary-fixed-dim: rgb(204 194 220);
      --md-sys-color-on-secondary-fixed-variant: rgb(74 68 88);
      --md-sys-color-tertiary-fixed: rgb(255 216 228);
      --md-sys-color-on-tertiary-fixed: rgb(49 17 29);
      --md-sys-color-tertiary-fixed-dim: rgb(239 184 200);
      --md-sys-color-on-tertiary-fixed-variant: rgb(99 59 72);
      --md-sys-color-surface-dim: rgb(222 216 225);
      --md-sys-color-surface-bright: rgb(254 247 255);
      --md-sys-color-surface-container-lowest: rgb(255 255 255);
      --md-sys-color-surface-container-low: rgb(247 242 250);
      --md-sys-color-surface-container: rgb(243 237 247);
      --md-sys-color-surface-container-high: rgb(236 230 240);
      --md-sys-color-surface-container-highest: rgb(230 224 233);
    }
  `,
  shape: css`
    :host {
      --md-sys-shape-corner-extra-large: 28px;
      --md-sys-shape-corner-extra-large-top: 28px 28px 0px 0px;
      --md-sys-shape-corner-extra-small: 4px;
      --md-sys-shape-corner-extra-small-top: 4px 4px 0px 0px;
      --md-sys-shape-corner-full: 9999px;
      --md-sys-shape-corner-large: 16px;
      --md-sys-shape-corner-large-end: 0px 16px 16px 0px;
      --md-sys-shape-corner-large-start: 16px 0px 0px 16px;
      --md-sys-shape-corner-large-top: 16px 16px 0px 0px;
      --md-sys-shape-corner-medium: 12px;
      --md-sys-shape-corner-none: 0px;
      --md-sys-shape-corner-small: 8px;
    }
  `,
};

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
      aside > header {
        background-color: var(--md-sys-color-primary);
        padding: ${space(2)} ${space(2)} ${space(2)} ${space(8)};
        display: flex;
        justify-content: space-between;
        color: var(--md-sys-color-on-primary);
      }
      aside > header > h1 {
        margin: 0;
      }
      aside > header > md-icon-button {
        --md-icon-button-icon-color: var(--md-sys-color-on-primary);
      }

      aside > form {
        margin: ${space(2)} 0 ${space(4)};
        padding: 0 ${space(2)} 0 ${space(2)};
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: ${space(2)};
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
        padding: ${space(2)} ${space(4)} ${space(2)} ${space(4)};
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
      await new Promise(resolve => setTimeout(resolve, 4000));
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
      const messageLength = this.messages.length;
      const isPendingInitializationOrTask =
        messageLength === 1 ||
        ([TaskStatus.PENDING] as TaskStatus[]).includes(
          this._chatToAssistantTask.status,
        );
      return html`<aside title="Meet David">
        <header>
          <h1 class="md-typescale-headline-large">Meet David</h1>
          <md-icon-button title="Close the chat room">
            ${unsafeHTML(closeIcon)}
          </md-icon-button>
        </header>
        <md-list aria-label="Messages">
          ${this.messages.map((message, index) => {
            return html`<md-list-item
                data-message-role=${message.role}
                id="${!isPendingInitializationOrTask &&
                index === messageLength - 1
                  ? 'last-item'
                  : undefined}"
              >
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
          ${isPendingInitializationOrTask
            ? html` <md-divider></md-divider>
                <md-list-item data-message-role="assistant" id="last-item">
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
        <form @submit="${this._handleTriggerRequest}">
          <md-filled-text-field
            ?disabled="${isPendingInitializationOrTask}"
            label="Type your question..."
            name="message"
            placeholder="Got a question? Type here..."
            type="textarea"
            required
            @paste="${this._handleOnPasteAndSanitizeContent}"
          >
          </md-filled-text-field>
          <md-filled-icon-button
            title="Ask question to bot"
            type="submit"
            ?disabled="${isPendingInitializationOrTask}"
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
      error: error => html`<p>Oops, something went wrong: ${error}</p>`,

      initial: () => html`<p>Waiting to start task</p>`,
      pending: renderChatRoom,
    })}`;
  }

  override async updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('messages')) {
      await this.updateComplete;
      this.jumpToLastListItem(); // Jump to the top of the last assistant message
    }
  }

  private _handleOnPasteAndSanitizeContent(event: ClipboardEvent): void {
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

  private async _handleTriggerRequest(event: Event) {
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

  private jumpToLastListItem() {
    const lastItem = this.shadowRoot?.querySelector('#last-item');
    if (lastItem) {
      lastItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'portfolio-chat-room': PortfolioChatRoomElement;
  }
}
