import createServer from "./app";
import { disconnectFromDatabase } from "./common/DbCon";
import { PORT, SERVICE_NAME } from "./config/config";

const startServer = async () => {
    try {
        const app = await createServer();
        const PORT = process.env.PORT || 3001;

        const server = app.listen(PORT, () => {
            console.log(`${SERVICE_NAME} is running on http://localhost:${PORT}`);
        });

        // Handle graceful shutdown
        process.on("SIGINT", async () => {
            console.log("SIGINT received. Shutting down...");
            server.close(async () => {
                await disconnectFromDatabase();
                console.log("Server shut down gracefully");
                process.exit(0);
            });
        });

        process.on("SIGTERM", async () => {
            console.log("SIGTERM received. Shutting down...");
            server.close(async () => {
                await disconnectFromDatabase();
                console.log("Server shut down gracefully");
                process.exit(0);
            });
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();
