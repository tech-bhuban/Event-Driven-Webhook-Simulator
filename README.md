# 🪝 Event-Driven Webhook Engine

A specialized Node.js service that implements a **Publisher-Subscriber (Pub/Sub)** pattern. This engine allows external services to register URLs and receive real-time notifications when specific system events occur.

## 🛠 Advanced Engineering
- **EventEmitter Integration**: Extends the native Node.js `events` module to handle internal system signals.
- **Asynchronous Dispatch**: Uses `axios` to perform non-blocking HTTP POST requests to third-party endpoints.
- **Decoupled Architecture**: Separates the order processing logic from the notification logic using events.
- **Error Resiliency**: Implements `try/catch` blocks within the event loop to ensure one failing subscriber doesn't crash the entire notification queue.

## 🚀 Setup
1. **Clone the repo**:
   ```bash
   git clone <repo-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install express axios
   ```
3. **Run**:
   ```bash
   node server.js
   ```

## 🧪 Testing the Hook
1. **Subscribe**: Send a POST to `/subscribe` with a URL (you can use a [Webhook.site](https://webhook.site) URL to test).
   ```json
   { "url": "https://webhook.site" }
   ```
2. **Trigger**: Send a POST to `/orders`.
3. **Verify**: Check your test URL to see the order data arrive instantly.

## 📜 Technical Choices
I used a custom class extending `EventEmitter` to maintain a clean separation of concerns. This allows the system to scale; adding new event types (like `userSignup` or `paymentFailed`) requires zero changes to the core order logic.

## License
MIT
