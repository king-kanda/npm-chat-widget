interface ChatWidgetOptions {
    title?: string;
    botAvatar?: string;
}
declare class ChatWidget {
    private container;
    private isOpen;
    private messages;
    private options;
    private button;
    private chatBox;
    private messagesContainer;
    private renderedMessageIds;
    constructor(options?: ChatWidgetOptions);
    private getDefaultBotAvatar;
    private init;
    private updateButtonIcon;
    private toggleChat;
    private addMessage;
    addBotMessage(text: string): void;
}
export default ChatWidget;
