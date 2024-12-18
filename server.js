const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config()

const port = process.env.PORT;

(async () => {
    try {
        // Attempt to connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure if MongoDB connection fails
    }
})();

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})