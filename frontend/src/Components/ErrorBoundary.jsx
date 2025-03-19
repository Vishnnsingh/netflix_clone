import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
                className="w-48 mb-8"
            />

            <div className="bg-gray-900 p-8 rounded-lg max-w-md w-full text-center">
                <h1 className="text-red-600 text-3xl font-bold mb-4">Oops! Something went wrong</h1>

                <p className="text-gray-300 mb-6">
                    {error?.status === 404
                        ? "We couldn't find what you were looking for."
                        : "We're experiencing some technical difficulties."}
                </p>

                <p className="text-gray-400 mb-8 text-sm">
                    Error details: {error?.statusText || error?.message || "Unknown error"}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-colors"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary; 