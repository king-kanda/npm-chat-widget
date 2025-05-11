interface ChatWidgetOptions {
    title?: string;
    onSendMessage?: (message: string) => void;
}
declare class ChatWidget {
    private container;
    private isOpen;
    private messages;
    private options;
    constructor(options?: ChatWidgetOptions);
    private init;
    private toggleChat;
    private addMessage;
    addBotMessage(text: string): void;
}
export default ChatWidget;
