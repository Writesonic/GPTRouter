import React from "react";

export default function Models() {
  return (
    <>
      {/* Features Section: Key Features With Icons */}
      <div className="bg-white dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-500">
              Save Time &amp; Deploy Faster
            </div>
            <h2 className="mb-4 text-4xl font-black text-black dark:text-white">INTEGRATED PROVIDERS</h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              GPTRouter integrates smoothly with leading providers like OpenAI, Anthropic, Cohere, Azure OpenAI,
              ChatOpenAI, Dalle, Stable Diffusion, GPT4, Llava2 Image Model (Replicate), and more. It's also flexible
              for easy customisation to add new models as needed.
            </h3>
          </div>
          {/* END Heading */}

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5 md:gap-12">
            <div className="py-5">
              <div className="group relative mb-8 ml-3 inline-flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 -m-3 -rotate-6 rounded-xl bg-gray-100 transition duration-150 ease-out group-hover:rotate-6 group-hover:scale-110" />
                <div className="absolute inset-0 -m-3 rotate-2 rounded-xl bg-gray-100 bg-opacity-50 shadow-inner transition duration-150 ease-out group-hover:-rotate-3 group-hover:scale-110" />
                <img src="img/openai.png" className="z-[1000]" />
              </div>

              <h4 className="mb-2 text-lg font-bold">OpenAI</h4>
            </div>
            <div className="py-5">
              <div className="group relative mb-8 ml-3 inline-flex h-12 w-12 items-center justify-center">
                <div className="absolute inset-0 -m-3 -rotate-6 rounded-xl bg-gray-100 transition duration-150 ease-out group-hover:rotate-6 group-hover:scale-110" />
                <div className="absolute inset-0 -m-3 rotate-2 rounded-xl bg-gray-100 bg-opacity-50 shadow-inner transition duration-150 ease-out group-hover:-rotate-3 group-hover:scale-110" />
                <img src="img/azure.svg" className="z-[1000] w-12 h-12" />
              </div>
              <h4 className="mb-2 text-lg font-bold">Azure OpenAI</h4>
            </div>
            <div className="py-5">
              <div className="group relative mb-8 ml-3 inline-flex h-12 w-32 items-center justify-center">
                <div className="absolute inset-0 -m-3 -rotate-6 rounded-xl bg-[#5ED3F3] transition duration-150 ease-out group-hover:rotate-6 group-hover:scale-110" />
                <div className="absolute inset-0 -m-3 rotate-2 rounded-xl bg-[#5ED3F3] bg-opacity-50 shadow-inner transition duration-150 ease-out group-hover:-rotate-3 group-hover:scale-110" />
                <img src="img/replicate.svg" className="z-[1000] w-32 h-12" />
              </div>
              <h4 className="mb-2 text-lg font-bold">LLava2 (Replicate)</h4>
            </div>
            <div className="py-5">
              <div className="group relative mb-8 ml-3 inline-flex h-12 w-32 items-center justify-center">
                <div className="absolute inset-0 -m-3 -rotate-6 rounded-xl bg-[#3FB27F] transition duration-150 ease-out group-hover:rotate-6 group-hover:scale-110" />
                <div className="absolute inset-0 -m-3 rotate-2 rounded-xl bg-[#3FB27F] bg-opacity-50 shadow-inner transition duration-150 ease-out group-hover:-rotate-3 group-hover:scale-110" />
                <img src="img/Stability+AI+logo.png" className="z-[1000] w-32 h-12" />
              </div>
              <h4 className="mb-2 text-lg font-bold">Stable Diffusion</h4>
            </div>
            <div className="py-5">
              <div className="group relative mb-8 ml-3 inline-flex h-12 w-32 items-center justify-center">
                <div className="absolute inset-0 -m-3 -rotate-6 rounded-xl bg-gray-100 transition duration-150 ease-out group-hover:rotate-6 group-hover:scale-110" />
                <div className="absolute inset-0 -m-3 rotate-2 rounded-xl bg-gray-100 bg-opacity-50 shadow-inner transition duration-150 ease-out group-hover:-rotate-3 group-hover:scale-110" />
                <img src="img/dalle2.png" className="z-[1000]" />
              </div>
              <h4 className="mb-2 text-lg font-bold">Dalle</h4>
            </div>
          </div>
          {/* END Features */}

          {/* Extra Info */}
          <p className="mb-10 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:mx-36 xl:mx-80">
            <span className="font-semibold">Writesonic's</span>
            AI Model Router solution is licensed under GNU and is absolutely free to use. Experience efficiency
            reimagined – sign up [here] today to step into the future of AI model management 🚀
          </p>
          {/* END Extra Info */}
        </div>
      </div>
      {/* END Features Section: Key Features With Icons */}
    </>
  );
}
