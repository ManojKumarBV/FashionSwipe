import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../capacitor.config";

const useServerStatus = () => {
    const [isServerDown, setIsServerDown] = useState(false);

    useEffect(() => {
        const checkServer = async () => {
            try {
                const { server } = await config;
                const serverUrl = server?.url || "http://localhost:8080";
                console.log("Checking server status:", serverUrl);

                const response = await axios.get(serverUrl, { timeout: 3000 });
                console.log("Server response:", response.status);

                if (response.status === 200) {
                    setIsServerDown(false);
                } else {
                    setIsServerDown(true);
                }
            } catch (error) {
                console.error("Error checking server status:", error);
                setIsServerDown(true);
            }
        };

        checkServer();

        const interval = setInterval(checkServer, 10000);
        return () => clearInterval(interval);
    }, []);

    return isServerDown;
};

export default useServerStatus;
