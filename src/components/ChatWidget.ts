interface ChatWidgetOptions {
  title?: string;
  onSendMessage?: (message: string) => void;
}

class ChatWidget {
  private container: HTMLDivElement;
  private isOpen: boolean = false;
  private messages: Array<{ text: string; isUser: boolean }> = [];
  private options: ChatWidgetOptions;

  constructor(options: ChatWidgetOptions = {}) {
    this.options = {
      title: options.title || 'Chat with us',
      onSendMessage: options.onSendMessage
    };
    this.container = document.createElement('div');
    this.init();
  }

  private init() {
    // Create widget container
    this.container.style.position = 'fixed';
    this.container.style.bottom = '20px';
    this.container.style.right = '20px';
    this.container.style.zIndex = '1000';

    // Create chat button
    const button = document.createElement('button');
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    button.style.cssText = `
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #1976d2;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    button.onclick = () => this.toggleChat();

    // Create chat box
    const chatBox = document.createElement('div');
    chatBox.style.cssText = `
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: none;
      flex-direction: column;
    `;

    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 16px;
      background: #1976d2;
      color: white;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    header.innerHTML = `
      <h3 style="margin: 0; font-size: 16px;">${this.options.title}</h3>
      <button style="background: none; border: none; color: white; cursor: pointer;">×</button>
    `;
    header.querySelector('button')!.onclick = () => this.toggleChat();

    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.style.cssText = `
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: #f5f5f5;
    `;

    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
      padding: 16px;
      background: white;
      border-top: 1px solid #e0e0e0;
      display: flex;
      gap: 8px;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type a message...';
    input.style.cssText = `
      flex: 1;
      padding: 8px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
    `;

    const sendButton = document.createElement('button');
    sendButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
    sendButton.style.cssText = `
      background: #1976d2;
      border: none;
      color: white;
      padding: 8px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const handleSendMessage = () => {
      const message = input.value.trim();
      if (message) {
        this.addMessage(message, true);
        if (this.options.onSendMessage) {
          this.options.onSendMessage(message);
        }
        input.value = '';
      }
    };

    input.onkeypress = (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    };

    sendButton.onclick = handleSendMessage;

    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);
    chatBox.appendChild(header);
    chatBox.appendChild(messagesContainer);
    chatBox.appendChild(inputContainer);
    this.container.appendChild(chatBox);
    this.container.appendChild(button);

    document.body.appendChild(this.container);
  }

  private toggleChat() {
    this.isOpen = !this.isOpen;
    const chatBox = this.container.querySelector('div')!;
    chatBox.style.display = this.isOpen ? 'flex' : 'none';
  }

  private addMessage(text: string, isUser: boolean) {
    this.messages.push({ text, isUser });
    const messagesContainer = this.container.querySelector('div > div:nth-child(2)')!;
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
      max-width: 80%;
      padding: 8px 12px;
      border-radius: 12px;
      margin-bottom: 8px;
      background: ${isUser ? '#1976d2' : '#e0e0e0'};
      color: ${isUser ? 'white' : 'black'};
      align-self: ${isUser ? 'flex-end' : 'flex-start'};
    `;
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  public addBotMessage(text: string) {
    this.addMessage(text, false);
  }
}

export default ChatWidget; 