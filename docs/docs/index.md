# 🚀 GPTRouter 

**GPTRouter: Your AI Model Gateway - Smoothly Manage Multiple LLMs and Image Models, Speed Up Responses, and Ensure Non-Stop Reliability.**

[![Twitter Follow](https://img.shields.io/twitter/follow/writesonic?style=social)](https://twitter.com/writesonic)


## Quick Start

Ready to get started? Here's how:

---
### Prerequisites

1. **Getting The Server Running** 
   - You would need to have the GPTRouter server running, to run it locally you can have a look [here](https://gpt-router.writesonic.com/docs/Getting%20Started/Developing%20Locally) 
   - or you can use our **Preview Deployment** with baseURL ```https://gpt-router-preview.writesonic.com/``` and to get an API key please fill the form [here](https://gpt-router.writesonic.com/#APIKey) and get the preview key delivered to you over the email 

---
You can try out the GPTRouter using our PythonSDK or via the API  [Docs](https://gpt-router-preview.writesonic.com/docs/static/index.html) meanwhile we are working on JS and other Clients and are looking for contributors

### Using the Python SDK
```bash
pip install gptrouter
```

Or with conda:

```bash
conda install gptrouter -c conda-forge
```
**Usage**
```python
from gpt_router.client import GPTRouterClient
from gpt_router.models import ModelGenerationRequest, GenerationParams
from gpt_router.enums import ModelsEnum, ProvidersEnum


client = GPTRouter(base_url='your_base_url', api_key='your_api_key')

messages = [
    {"role": "user", "content": "Write me a short poem"},
]
prompt_params = GenerationParams(messages=messages)
claude2_request = ModelGenerationRequest(
    model_name=ModelsEnum.CLAUDE_INSTANT_12,
    provider_name=ProvidersEnum.ANTHROPIC.value,
    order=1,
    prompt_params=prompt_params,
)

response = client.generate(ordered_generation_requests=[claude2_request])
print(response.choices[0].text)
```
**
To explore more about Streaming and other examples you can have a look** [here](/docs/examples/)

---

## 🌐 Why GPTRouter?

At Writesonic, after three years of navigating the world of large language models, we identified key challenges and built GPTRouter to solve them.

### Solving Real-World Challenges:

1. **Model Independence**: Don't put all your eggs in one basket. GPTRouter lets you break free from the limitations of relying on just one AI model like OpenAI. If one model is down, GPTRouter keeps you up and running by seamlessly switching to another.

2. **Beat the Latency**: Slow response times? Not anymore. GPTRouter is designed to tackle latency issues, especially with hefty models like GPT-4. Experience a smoother, faster user interaction without delays.

3. **Diverse Model Integration**: Why settle for one when you can have more? GPTRouter supports multiple language and image generation models, providing fallback options so your system remains robust and versatile.

### Key Features:

- **🌐 Universal API**: One API to connect them all. Easily switch between models like OpenAI, Azure OpenAI, Anthropic, Replicate, Stable Diffusion, Cohere, and more.
- **🔀 Smart Fallbacks**: Keep your services uninterrupted. GPTRouter automatically switches to alternative models if your primary choice is unavailable.
- **🔄 Automatic Retries**: GPTRouter intelligently retries failed requests, reducing manual effort and improving reliability.
- **⏱️ Fast and Responsive**: Designed to reduce latency, GPTRouter ensures your interactions with AI models are quick and efficient.

### Supported Models:

| Supported Models |     Completion     |        Streaming         |  Async Completion  |     Async Streaming      |
| ---------------- | :----------------: | :----------------------: | :----------------: | :----------------------: |
| OpenAI           | :white_check_mark: |    :white_check_mark:    | :white_check_mark: |    :white_check_mark:    |
| Azure OpenAI     | :white_check_mark: |    :white_check_mark:    | :white_check_mark: |    :white_check_mark:    |
| Anthropic        | :white_check_mark: |    :white_check_mark:    | :white_check_mark: |    :white_check_mark:    |
| Replicate        | :white_check_mark: |    :white_check_mark:    | :white_check_mark: |    :white_check_mark:    |
| Stable Diffusion | :white_check_mark: | :heavy_exclamation_mark: | :white_check_mark: | :heavy_exclamation_mark: |
| Dalle            | :white_check_mark: | :heavy_exclamation_mark: | :white_check_mark: | :heavy_exclamation_mark: |
| Cohere           | :white_check_mark: |    :white_check_mark:    | :white_check_mark: |    :white_check_mark:    |
| More to come     |     :clock930:     |        :clock930:        |     :clock930:     |        :clock930:        |


:heavy_exclamation_mark: Streaming not applicable to Image Models

:clock930: Coming Sooon


**:sparkles: Contributors Welcome! :sparkles:**

### On the Horizon:

- Integrations with Langchain and LlamaIndex, expanding your options even further.


## 📖 Documentation

For comprehensive documentation, visit: [GPTRouter Documentation](https://gpt-router.writesonic.com)


## 🛠️ Installation and Setup

Detailed installation instructions and setup guidance can be found in our [Getting Started Guide](https://gpt-router.writesonic.com/get-started).


## 🤝 Contributing

We welcome contributions from the community! If you're interested in improving GPTRouter, see our [Contribution Guidelines](./03-Contributing.md).


## 🔗 Links

- [Website](https://gpt-router.writesonic.com)
- [GitHub](https://github.com/writesonic/GPTRouter)
