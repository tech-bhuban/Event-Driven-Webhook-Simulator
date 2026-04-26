
const express = require('express');
const EventEmitter = require('events');
const axios = require('axios'); // Run: npm install axios

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Advanced: Custom Event Handler for Webhooks
class WebhookManager extends EventEmitter {}
const webhookManager = new WebhookManager();

// Mock database for registered webhooks
const subscribers = [];

// Listener: When an 'orderCreated' event happens, notify all subscribers
webhookManager.on('orderCreated', async (orderData) => {
    console.log(`[Event] Processing webhooks for Order: ${orderData.id}`);
    
    for (const url of subscribers) {
        try {
            await axios.post(url, orderData);
            console.log(`✅ Webhook sent to: ${url}`);
        } catch (err) {
            console.error(`❌ Failed to notify: ${url} - ${err.message}`);
        }
    }
});

// Endpoint to subscribe a URL to our hooks
app.post('/subscribe', (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).send('URL is required');
    subscribers.push(url);
    res.status(201).json({ message: 'Subscribed successfully', totalSubscribers: subscribers.length });
});

// Endpoint that triggers the event
app.post('/orders', (req, res) => {
    const newOrder = { id: Math.floor(Math.random() * 9999), item: 'Laptop', price: 1200 };
    
    // Trigger the event asynchronously
    webhookManager.emit('orderCreated', newOrder);
    
    res.json({ message: 'Order received. Webhooks triggered.', order: newOrder });
});

app.get('/', (req, res) => {
    res.send('<h2>Webhook Engine</h2><p>POST to /subscribe to listen for events.</p>');
});

app.listen(PORT, () => console.log(`Engine running at http://localhost:${PORT}`));

