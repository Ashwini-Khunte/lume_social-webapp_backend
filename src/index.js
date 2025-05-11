import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv';

dotenv.config();

connectDB()
.then(
    app.listen(process.env.PORT || 6000, () => {
        console.log(`\n Server is running on port ${process.env.PORT}`);
        
    })
)
.catch((error) => {
    console.log('Error starting server:', error);
});

