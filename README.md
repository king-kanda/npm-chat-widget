# Chat Widget

A framework-agnostic chat widget that can be easily integrated into any website. The widget appears as a floating button in the bottom right corner of your website and expands into a chat interface when clicked.

## Installation

```bash
npm install okanda-chat-widget
```

## Usage (Support for React,Vue  and Angular will be introduced in a week)

```html
<!-- Add this to your HTML file -->
<script src="node_modules/chat-widget/dist/index.js"></script>
```

```javascript
// Initialize the chat widget
const chatWidget = new ChatWidget({
  title: 'Chat with us',
  onSendMessage: (message) => {
    // Handle the message here
    console.log('Message sent:', message);
    
    // Example: Send a response
    setTimeout(() => {
      chatWidget.addBotMessage('Thanks for your message!');
    }, 1000);
  },
  botAvatar : "image/url";
});
```

## API

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| title | string | 'Chat with us' | The title displayed in the chat header |
| onSendMessage | function | undefined | Callback function that receives the message when user sends a message |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| addBotMessage | text: string | Add a message from the bot/agent to the chat |

## Features

- Framework-agnostic (works with any website)
- Floating chat button in the bottom right corner
- Expandable chat interface
- Message history display
- Customizable title
- Modern design
- Fully responsive
- TypeScript support

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the package
npm run build
```

## License & Contribution

MIT 

