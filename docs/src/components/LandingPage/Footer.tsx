import React from 'react';


export default function Footer() {
    return (
        <>

            <footer
                id="page-footer"
                className="bg-white dark:bg-gray-900 dark:text-gray-100"
            >
                <div className="container mx-auto flex flex-col space-y-6 px-4 py-16 text-center text-sm lg:flex-row-reverse lg:space-y-0 lg:px-8 lg:py-32 xl:max-w-7xl">
                    <nav className="space-x-4 lg:w-1/3 lg:text-right">
                        <a
                            href="https://twitter.com/WriteSonic"
                            className="text-gray-400 hover:text-gray-800 dark:hover:text-white"
                        >
                            <svg
                                className="bi bi-twitter-x inline-block h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                            >
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/GetWritesonic" className="text-gray-400 hover:text-[#1877f2]">
                            <svg
                                className="icon-facebook inline-block h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/writesonic/mycompany/verification/" className="text-gray-400 hover:text-[#405de6]">
                            <svg
                                className="icon-instagram inline-block h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>

                    </nav>
                    <nav className="space-x-2 sm:space-x-4 lg:w-1/3 lg:text-center">
                        <a
                            href="https://writesonic.com"
                            className="font-medium text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            Writesonic
                        </a>
                        <a
                            href="https://bot.writesonic.com"
                            className="font-medium text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                        >
                            BotSonic
                        </a>
                    </nav>
                    <div className="text-gray-500 dark:text-gray-400/80 lg:w-1/3 lg:text-left">
                        <img src="https://d1q5p2nadm4152.cloudfront.net/public/images/logo.svg" />
                    </div>
                </div>
            </footer>

        </>
    );
}
