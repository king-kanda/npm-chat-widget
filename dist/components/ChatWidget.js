var ChatWidget = /** @class */ (function () {
    function ChatWidget(options) {
        if (options === void 0) { options = {}; }
        this.isOpen = false;
        this.messages = [];
        this.options = {
            title: options.title || 'Chat with us',
            onSendMessage: options.onSendMessage
        };
        this.container = document.createElement('div');
        this.init();
    }
    ChatWidget.prototype.init = function () {
        var _this = this;
        // Create widget container
        this.container.style.position = 'fixed';
        this.container.style.bottom = '20px';
        this.container.style.right = '20px';
        this.container.style.zIndex = '1000';
        // Create chat button
        var button = document.createElement('button');
        button.innerHTML = "\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>\n      </svg>\n    ";
        button.style.cssText = "\n      width: 50px;\n      height: 50px;\n      border-radius: 50%;\n      background: #1976d2;\n      border: none;\n      color: white;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      box-shadow: 0 2px 5px rgba(0,0,0,0.2);\n    ";
        button.onclick = function () { return _this.toggleChat(); };
        // Create chat box
        var chatBox = document.createElement('div');
        chatBox.style.cssText = "\n      position: absolute;\n      bottom: 70px;\n      right: 0;\n      width: 350px;\n      height: 500px;\n      background: white;\n      border-radius: 10px;\n      box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n      display: none;\n      flex-direction: column;\n    ";
        // Create header
        var header = document.createElement('div');
        header.style.cssText = "\n      padding: 16px;\n      background: #1976d2;\n      color: white;\n      border-top-left-radius: 10px;\n      border-top-right-radius: 10px;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    ";
        header.innerHTML = "\n      <h3 style=\"margin: 0; font-size: 16px;\">".concat(this.options.title, "</h3>\n      <button style=\"background: none; border: none; color: white; cursor: pointer;\">\u00D7</button>\n    ");
        header.querySelector('button').onclick = function () { return _this.toggleChat(); };
        // Create messages container
        var messagesContainer = document.createElement('div');
        messagesContainer.style.cssText = "\n      max-width: 90%;\n      flex: 1;\n      padding: 16px;\n      overflow-y: auto;\n      background: #f5f5f5;\n      display: flex;\n      flex-direction: column;\n    ";
        // Create input container
        var inputContainer = document.createElement('div');
        inputContainer.style.cssText = "\n      padding: 16px;\n      background: white;\n      border-top: 1px solid #e0e0e0;\n      display: flex;\n      gap: 8px;\n    ";
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type a message...';
        input.style.cssText = "\n      flex: 1;\n      padding: 8px;\n      border: 1px solid #e0e0e0;\n      border-radius: 4px;\n      outline: none;\n    ";
        var sendButton = document.createElement('button');
        sendButton.innerHTML = "\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n        <line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line>\n        <polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon>\n      </svg>\n    ";
        sendButton.style.cssText = "\n      background: #1976d2;\n      border: none;\n      color: white;\n      padding: 8px;\n      border-radius: 4px;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    ";
        var handleSendMessage = function () {
            var message = input.value.trim();
            if (message) {
                _this.addMessage(message, true);
                if (_this.options.onSendMessage) {
                    _this.options.onSendMessage(message);
                }
                input.value = '';
            }
        };
        input.onkeypress = function (e) {
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
    };
    ChatWidget.prototype.toggleChat = function () {
        this.isOpen = !this.isOpen;
        var chatBox = this.container.querySelector('div');
        chatBox.style.display = this.isOpen ? 'flex' : 'none';
    };
    ChatWidget.prototype.addMessage = function (text, isUser) {
        this.messages.push({ text: text, isUser: isUser });
        var messagesContainer = this.container.querySelector('div > div:nth-child(2)');
        var messageElement = document.createElement('div');
        messageElement.style.cssText = "\n      max-width: 75%;\n      padding: 8px 12px;\n      border-radius: 12px;\n      margin-bottom: 8px;\n      word-break: break-word;\n      white-space: pre-wrap;\n      background: ".concat(isUser ? '#1976d2' : '#e0e0e0', ";\n      color: ").concat(isUser ? 'white' : 'black', ";\n      align-self: ").concat(isUser ? 'flex-end' : 'flex-start', ";\n    ");
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
    ChatWidget.prototype.addBotMessage = function (text) {
        this.addMessage(text, false);
    };
    return ChatWidget;
}());
export default ChatWidget;
