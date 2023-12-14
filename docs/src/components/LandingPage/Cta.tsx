import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CTA() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const postData = async () => {
    setLoading(true);
    const url = `https://utils-stg.writesonic.com/v1/model-router/new-user?email=${email}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("error");
        const resp = await response.json();
        toast.error(resp.message ?? resp.detail);
      }
      const result = await response.json();
      toast.success(`${result.message} please check your email for the API key`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900" id="APIKey">
        <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-6xl">
          <div className="relative overflow-hidden rounded-xl px-6 py-8 lg:px-12 lg:py-16">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://cdn.tailkit.com/media/placeholders/photo-SYTO3xs06fU-1440x960.jpg"
                alt="Laptops on top of a table"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900/90 from-gray-900/80 via-gray-900 to-gray-900/80 lg:bg-transparent lg:bg-gradient-to-l" />
            <div className="relative py-5 text-center lg:mx-auto lg:w-3/5">
              <div>
                <h2 className="mb-2 text-3xl font-black text-white lg:text-4xl">Get Preview API Key</h2>
                <h3 className="mb-7 text-lg text-gray-300">
                  Get immediate access to a hosted preview of Model Router before deploying to yourself
                  <span className="font-bold text-white underline decoration-yellow-500 decoration-2 underline-offset-8">
                    &nbsp; 10 Generations/day
                  </span>
                </h3>
              </div>

              <div className="mx-auto max-w-sm space-y-3">
                <div className="flex items-center">
                  <input
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="block w-full grow rounded-l-lg border border-gray-200 px-2.5 py-3 leading-6 placeholder-gray-500 focus:z-1 focus:border-indigo-400 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:px-5"
                  />
                  <button
                    onClick={async () => {
                      await postData();
                    }}
                    type="button"
                    className="-ml-px inline-flex flex-none items-center justify-center space-x-2 rounded-r-lg border border-indigo-700 bg-indigo-700 px-2.5 py-3 font-semibold leading-6 text-white hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring focus:ring-indigo-500 focus:ring-opacity-90 active:border-indigo-700 active:bg-indigo-700 sm:px-6"
                  >
                    Get Access
                    {loading && (
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 ml-2 text-white animate-spin dark:text-white fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                  </button>
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
