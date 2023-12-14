import FAQS from "@site/constants/faqs";
import React from "react";

export default function FAQs() {
  return (
    <>
      {/* FAQ Section: Toggleable */}
      <div className="bg-white dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-500">
              We Answer
            </div>
            <h2 className="text-4xl font-black text-black dark:text-white">Frequently Asked Questions</h2>
          </div>
          {/* END Heading */}

          {/* FAQ */}
          <div className="mx-auto max-w-2xl divide-y divide-gray-200 dark:divide-gray-700/50">
            {FAQS.map((faq, index) => {
              return (
                <details key={index} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-4 hover:bg-gray-50 group-open:bg-gray-50 dark:hover:bg-gray-800/50 dark:group-open:bg-gray-800/50">
                    <h4 className="font-semibold">{faq.question}</h4>
                    <div className="opacity-50 transition duration-300 group-open:rotate-180">
                      <svg
                        className="hi-mini hi-chevron-down inline-block h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </summary>
                  <p className="px-3 pb-6 pt-3 leading-7 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </details>
              );
            })}
          </div>
          {/* END FAQ */}

          {/* Link */}
          <div className="text-center">
            <a
              href="/docs"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-semibold leading-6 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            >
              <span>Documentation</span>
              <svg
                className="hi-mini hi-arrow-top-right-on-square inline-block h-5 w-5 opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          {/* END Link */}
        </div>
      </div>
      {/* END FAQ Section: Toggleable */}
    </>
  );
}
