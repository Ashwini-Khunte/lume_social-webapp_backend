import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv';

dotenv.config();

// app.listen(port, () => {
//     console.log(`Server at http://localhost:${port}`);
// })

connectDB()
.then(
    app.listen(process.env.PORT || 4000, () => {
        console.log(`\n Server is running on port http://localhost:${process.env.PORT}`);
        
    })
)
.catch((error) => {
    console.log('Error starting server:', error);

});

