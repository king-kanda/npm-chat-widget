interface ChatWidgetOptions {
  title?: string;
  onSendMessage?: (message: string) => void;
  botAvatar?: string; // URL to bot avatar image
}

class ChatWidget {
  private container: HTMLDivElement;
  private isOpen: boolean = false;
  private messages: Array<{ text: string; isUser: boolean }> = [];
  private options: ChatWidgetOptions;
  private button: HTMLButtonElement;
  private chatBox: HTMLDivElement;
  private messagesContainer!: HTMLDivElement;

  

  constructor(options: ChatWidgetOptions = {}) {
    this.options = {
      title: options.title || 'Chat with us',
      onSendMessage: options.onSendMessage,
      botAvatar: options.botAvatar || this.getDefaultBotAvatar()
    };
    this.container = document.createElement('div');
    this.button = document.createElement('button');
    this.chatBox = document.createElement('div');
    this.init();
  }

  private getDefaultBotAvatar(): string {
    return 'https://img.freepik.com/free-psd/futuristic-robot-waiter-serves-cup-coffee-tray-showcasing-advanced-technology-robotic-service_632498-29036.jpg?uid=R25120111&ga=GA1.1.771649099.1742823816&semt=ais_hybrid&w=740';
  }

  private init() {
    // Create widget container
    this.container.style.position = 'fixed';
    this.container.style.bottom = '20px';
    this.container.style.right = '20px';
    this.container.style.zIndex = '1000';

    // Create chat button with initial icon
    this.updateButtonIcon();
    
    this.button.style.cssText = `
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #6452df;
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    this.button.onclick = () => this.toggleChat();

    // Create chat box
    this.chatBox.style.cssText = `
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: none;
      flex-direction: column;
      overflow: hidden;
    `;

    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 12px 16px;
      background: #6452df;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    
    // Create navigation buttons like in the reference
    header.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 0 8px;">
        <div>
          <div style="font-weight: 600; font-size: 14px;">${this.options.title || 'Assistant'}</div>
          <div style="font-size: 12px; opacity: 0.8;">online</div>
        </div>
        <button style="background: none; border: none; cursor: pointer; padding: 4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      
    `;
    
    // Set click handlers for both buttons to toggle chat
    const backButton = header.querySelector('button:first-child') as HTMLButtonElement | null;
    const minimizeButton = header.querySelector('button:last-child') as HTMLButtonElement | null;
    if (backButton) backButton.onclick = () => this.toggleChat();
    if (minimizeButton) minimizeButton.onclick = () => this.toggleChat();

    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: white;
      display: flex;
      border-radius: 16px;
      flex-direction: column;
      gap: 16px;
    `;

    this.messagesContainer = messagesContainer;

    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
      position: sticky;
      bottom: 0;
      padding: 12px 16px;
      background: white;
      border-top: 1px solid #f0f0f5;
      display: flex;
      gap: 8px;
      align-items: center;
      z-index: 1;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.style.cssText = `
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      color: #333;
      outline: none;
      font-size: 14px;
    `;


    // Create send button
    const sendButton = document.createElement('button');
    sendButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
    sendButton.style.cssText = `
      background: none;
      border: none;
      color: #6452df;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Create footer
    const footer = document.createElement('div');
    footer.style.cssText = `
      padding: 8px 16px;
      background: white;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      border-top: 1px solid #f0f0f5;
    `;
    footer.innerHTML = `
      <div style="display: flex; align-items: center; gap: 4px;">
        Powered by <span style="font-weight: 600;">NexusWave AI</span>
      </div>
      <a href="#" style="color: #999; text-decoration: none;">Privacy Policy</a>
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
    
    this.chatBox.appendChild(header);
    this.chatBox.appendChild(this.messagesContainer);
    this.chatBox.appendChild(inputContainer);
    this.chatBox.appendChild(footer);
    
  
    this.container.appendChild(this.chatBox);
    this.container.appendChild(this.button);

    document.body.appendChild(this.container);
    
    // Add initial bot message
    setTimeout(() => {
      this.addBotMessage("Hello! How can I assist you today?");
    }, 500);
  }

  private updateButtonIcon() {
    this.button.innerHTML = this.isOpen 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>`;
  }

  private toggleChat() {
    this.isOpen = !this.isOpen;
    this.chatBox.style.display = this.isOpen ? 'flex' : 'none';
    this.updateButtonIcon();
  }

private addMessage(text: string, isUser: boolean) {
  this.messages.push({ text, isUser });
  const messagesContainer = this.messagesContainer;

  
  const messageWrapper = document.createElement('div');
  messageWrapper.style.cssText = `
    display: flex;
    flex-direction: ${isUser ? 'row-reverse' : 'row'};
    gap: 8px;
    align-items: flex-start;
    max-width: 100%;
  `;

  // Only create avatar for bot messages
  if (!isUser) {
    const avatar = document.createElement('div');
    avatar.style.cssText = `
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #d9d9ff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    `;

    const avatarImg = document.createElement('img');
    avatarImg.src = this.options.botAvatar!;
    avatarImg.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
    `;
    avatar.appendChild(avatarImg);
    messageWrapper.appendChild(avatar);
  }

  const messageElement = document.createElement('div');
  messageElement.style.cssText = `
    max-width: 100%;
    padding: 10px 14px;
    border-radius: 16px;
    border-top-${isUser ? 'right' : 'left'}-radius: 4px;
    word-break: break-word;
    white-space: pre-wrap;
    font-size: 14px;
    background: ${isUser ? '#6452df' : '#f0f0f5'};
    color: ${isUser ? 'white' : '#333'};

  `;
  messageElement.textContent = text;

  const timestamp = document.createElement('div');
  timestamp.style.cssText = `
    font-size: 10px;
    color: #999;
    margin-top: 4px;
    text-align: ${isUser ? 'right' : 'left'};
  `;
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  timestamp.textContent = `${hours}:${minutes}`;

  const messageContent = document.createElement('div');
  messageContent.style.cssText = `
    display: flex;
    flex-direction: column;
  `;
  messageContent.appendChild(messageElement);
  messageContent.appendChild(timestamp);

  messageWrapper.appendChild(messageContent);
  messagesContainer.appendChild(messageWrapper);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


  public addBotMessage(text: string) {
    this.addMessage(text, false);
  }
}

export default ChatWidget;