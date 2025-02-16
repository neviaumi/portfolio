import { Task, TaskStatus } from '@lit/task';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/button/elevated-button.js';
import '@material/web/divider/divider.js';
import '@material/web/list/list.js';
import '@material/web/list/list-item.js';
import '@material/web/textfield/outlined-text-field';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

function sanitizeHtml(html: string) {
  const endIndex = html.indexOf('<'),
    startIndex = html.lastIndexOf('>');
  if (endIndex === -1 || startIndex === -1) {
    return html;
  }
  return html.substring(startIndex, endIndex);
}

@customElement('portfolio-chat-room')
export class PortfolioChatRoomElement extends LitElement {
  static override styles = [
    typescaleStyles,
    css`
      aside {
        width: 18rem;
        display: flex;
        gap: 1rem;
        flex-direction: column;
      }
      md-elevated-button {
        width: fit-content;
      }
      md-list {
        background-color: transparent;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        aspect-ratio: 1/1.2;
        max-height: max-content;
        height: fit-content;
      }

      md-list-item[data-message-role='user'] {
        background-color: lightblue; /* For odd list items */
        text-align: end;
      }

      md-list-item[data-message-role='assistant'] {
        background-color: lightgray; /* For even list items */
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
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
      const response = await fetch('http://localhost:8787', {
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
      const haveExtraListItemOnList =
        messageLength === 1 ||
        ([TaskStatus.PENDING] as TaskStatus[]).includes(
          this._chatToAssistantTask.status,
        );
      return html` <aside title="Portfolio AI assistant">
        <md-list aria-label="Messages">
          ${this.messages.map((message, index) => {
            return html`<md-list-item
              data-message-role=${message.role}
              id="${!haveExtraListItemOnList && index === messageLength - 1
                ? 'last-item'
                : undefined}"
            >
              ${unsafeHTML(sanitizeHtml(message.content))}
            </md-list-item>`;
          })}
          ${haveExtraListItemOnList
            ? html`<md-divider></md-divider
                ><md-list-item data-message-role="assistant" id="last-item">
                  Loading
                </md-list-item>`
            : null}
        </md-list>
        <form @submit="${this._handleTriggerRequest}">
          <md-outlined-text-field
            label="Ask me something"
            name="message"
            placeholder="Type your question here..."
            type="textarea"
            required
          >
          </md-outlined-text-field>
          <md-elevated-button type="submit">Ask</md-elevated-button>
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
    console.log(userMessage);
    this.messages = [...this.messages, { content: userMessage, role: 'user' }];
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
