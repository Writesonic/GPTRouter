import React from 'react'

export default function Stats() {
    return (
        <>
            {/* Statistics Section: Subtle with Icons */}
            <div className="bg-white dark:bg-gray-900 dark:text-gray-100">
                <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:gap-10">
                        <div className="group flex flex-col py-4 lg:py-0">
                            <div className="relative mb-8 w-12 text-gray-200 transition group-hover:text-rose-200 dark:text-gray-600">
                                <svg
                                    className="hi-mini hi-check-badge absolute right-0 top-0 inline-block h-5 w-5 text-rose-600 transition group-hover:scale-125"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    className="hi-outline hi-user-circle inline-block h-12 w-12"
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
                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                1,500 Million+ Tokens
                            </h4>
                            <p className="grow text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                                Trust in GPTRouter's efficiency, marked by over 1,531 million tokens processed with precision
                            </p>
                            <div className="my-8 h-1.5 w-5 rounded-lg bg-rose-300 transition-all group-hover:w-24 group-hover:bg-rose-500" />
                        </div>
                        <div className="group flex flex-col py-4 lg:py-0">
                            <div className="relative mb-8 w-12 text-gray-200 transition group-hover:text-purple-200 dark:text-gray-600">
                                <svg
                                    className="hi-mini hi-check-badge absolute right-0 top-0 inline-block h-5 w-5 text-purple-600 transition group-hover:scale-125"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    className="hi-outline hi-chat-bubble-bottom-center-text inline-block h-12 w-12"
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
                                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                    />
                                </svg>
                            </div>
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                1,552,418+ API Calls
                            </h4>
                            <p className="grow text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                                Reliability in numbers - with more than 1,552,418 API calls flawlessly handled, we ensure a smooth operation
                            </p>
                            <div className="my-8 h-1.5 w-5 rounded-lg bg-purple-300 transition-all group-hover:w-24 group-hover:bg-purple-500" />
                        </div>
                        <div className="group flex flex-col py-4 lg:py-0">
                            <div className="relative mb-8 w-12 text-gray-200 transition group-hover:text-sky-200 dark:text-gray-600">
                                <svg
                                    className="hi-mini hi-check-badge absolute right-0 top-0 inline-block h-5 w-5 text-sky-600 transition group-hover:scale-125"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    className="hi-outline hi-document-text inline-block h-12 w-12"
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
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                            </div>
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                100+ Incidents Handled
                            </h4>
                            <p className="grow text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                                Proactive response equals zero interruptions - successfully evaded 150+ downtime events to keep you up and running
                            </p>
                            <div className="my-8 h-1.5 w-5 rounded-lg bg-sky-300 transition-all group-hover:w-24 group-hover:bg-sky-500" />
                        </div>
                        <div className="group flex flex-col py-4 lg:py-0">
                            <div className="relative mb-8 w-12 text-gray-200 transition group-hover:text-amber-200 dark:text-gray-600">
                                <svg
                                    className="hi-mini hi-check-badge absolute right-0 top-0 inline-block h-5 w-5 text-amber-500 transition group-hover:scale-125"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    className="hi-outline hi-archive-box inline-block h-12 w-12"
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
                                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                    />
                                </svg>
                            </div>
                            <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                                50+ Models
                            </h4>
                            <p className="grow text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                                Versatility at its best - powering 50+ models in production and counting, customization has never been easier with GPTRouter.
                            </p>
                            <div className="my-8 h-1.5 w-5 rounded-lg bg-amber-300 transition-all group-hover:w-24 group-hover:bg-amber-500" />
                        </div>
                    </div>
                    {/* END Stats */}
                </div>
            </div>
            {/* END Statistics Section: Subtle with Icons */}
        </>
    );
}
