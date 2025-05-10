import { useState, useEffect } from "react";

const ServerDown = () => {
    const [message, setMessage] = useState("Checking server status...");

    useEffect(() => {
        const interval = setInterval(() => {
            setMessage((prev) => prev === "Checking server status..." ? "Still working on it..." : "Checking server status...");
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark text-white p-4">
            <div className="text-center p-8 md:p-12 w-full max-w-sm md:max-w-md lg:max-w-lg bg-dark/30 rounded-2xl shadow-lg">
                <h1 className="text-7xl md:text-9xl font-extrabold text-primary mb-4 animate-bounce">404</h1>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    Oops! Server is Down.
                </h2>
                <p className="text-md md:text-lg lg:text-xl text-gray-400 mb-6">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default ServerDown;