import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();


const PORT = process.env.PORT || 3000;

// Start Server
const startServer = async () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (error) {
        console.log("Failed ot start server:", error);

    }
}

startServer();