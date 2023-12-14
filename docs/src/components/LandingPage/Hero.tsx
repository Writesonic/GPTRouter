import React from 'react';

export default function Hero() {
    return (
        <>
            {/* Hero Section: Subtle Gradient with Header Links */}
            <div className="relative overflow-hidden bg-gradient-to-tr from-indigo-50 via-violet-50 to-amber-50 dark:from-indigo-950 dark:via-indigo-950 dark:to-orange-950 dark:text-gray-100">
                {/* Main Header */}
                <header
                    id="page-header"
                    className="relative flex flex-none items-center py-8"
                >
                    {/* Main Header Content */}
                    <div className="container mx-auto flex flex-col space-y-4 px-4 text-center md:flex-row md:items-center md:justify-between md:space-x-8 md:space-y-0 lg:px-8 xl:max-w-7xl">
                        {/* Brand */}
                        <div className="flex flex-none items-center justify-center">
                            <a
                                href="/"
                                className="inline-flex items-center space-x-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
                            >
                                <img src='https://d1q5p2nadm4152.cloudfront.net/public/images/logo.svg' />
                            </a>
                        </div>
                        {/* END Brand */}
                        <div className="flex grow flex-col space-y-4 text-center md:flex-row md:items-center md:justify-between md:space-x-8 md:space-y-0">
                            {/* Navigation */}
                            <nav className="space-x-3 md:space-x-6">
                                <a
                                    href="/docs/Getting%20Started/Developing%20Locally"
                                    className="text-sm font-semibold text-gray-900 hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400"
                                >
                                    <span>Quick Start</span>
                                </a>
                                <a
                                    href="/docs/examples/"
                                    className="text-sm font-semibold text-gray-900 hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400"
                                >
                                    <span>Examples</span>
                                </a>
                            </nav>
                            {/* END Navigation */}

                            {/* Actions */}
                            <div className="flex items-center justify-center space-x-2">
                                <a
                                    href="/docs"
                                    className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                                >
                                    <svg
                                        className="hi-mini hi-document-text inline-block h-5 w-5 text-indigo-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm2.25 8.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 3a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Docs</span>
                                </a>
                                <a
                                    href="https://github.com/Writesonic/gptrouter/"
                                    className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-900 dark:bg-opacity-50 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                                >
                                    <svg
                                        className="bi bi-github inline-block h-5 w-5 text-indigo-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        aria-hidden="true"
                                    >
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                            </div>
                            {/* END Actions */}
                        </div>
                    </div>
                    {/* END Main Header Content */}
                </header>
                {/* END Main Header */}

                {/* Hero Content */}
                <div className="container relative mx-auto px-4 py-12 text-center lg:px-8 lg:py-32 xl:max-w-7xl">
                    <div className="mx-auto my-10 flex h-24 w-24 rotate-6 items-center justify-center rounded-2xl border border-indigo-800 bg-indigo-600 text-white ring-4 ring-indigo-300 dark:border-indigo-500 dark:ring-indigo-900">
                        <svg
                            className="hi-outline hi-bolt inline-block h-12 w-12"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 16.0l10.5-11.25L12 10.5h8.25L9.75 21.75 12 16.0H3.75z"
                            />
                        </svg>
                    </div>
                    <h1 className="mb-4 text-4xl font-black text-black dark:text-white">
                        Revamp the Way You Manage AI Models: GPTRouter - Powerfully Agile, Proactively Reliable
                    </h1>
                    <h2 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
                        Open-Source AI Model Router Engineered for Efficiency & Optimized for Performance
                    </h2>
                    <div className="flex flex-col space-y-2 py-10 sm:flex-row sm:items-center sm:justify-center sm:space-x-2 sm:space-y-0">
                        <div className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white/50 px-6 py-4 font-medium leading-6 text-gray-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
                            <span className="font-semibold text-gray-500 opacity-75">
                                &gt;
                            </span>
                            <code>pip install GPTRouter</code>
                        </div>
                        <a
                            href="/docs"
                            className="inline-flex items-center justify-center space-x-2 rounded-lg border border-indigo-700 bg-indigo-700 px-8 py-4 font-semibold leading-6 text-white hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring focus:ring-indigo-400 focus:ring-opacity-50 active:border-indigo-700 active:bg-indigo-700 dark:focus:ring-indigo-400 dark:focus:ring-opacity-90"
                        >
                            <span>Get Started</span>
                            <svg
                                className="hi-mini hi-arrow-right inline-block h-5 w-5 opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>

                    {/* <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
              <a
                href="#"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <span>Currently v6.0</span>
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 underline hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
              >
                <span>Download</span>
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 underline hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400"
              >
                <span>All Releases</span>
              </a>
            </div> */}

                </div>
                {/* END Hero Content */}
            </div>
            {/* END Hero Section: Subtle Gradient with Header Links */}
        </>
    );
}
