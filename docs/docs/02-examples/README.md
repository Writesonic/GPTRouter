# GPTRouter Examples

This contains a collection of Python examples demonstrating the use of the GPTRouter API for text generation with various use cases and configurations.

## Getting Started

### Prerequisites

1. **Getting The Server Running**
   - You would need to have the GPTRouter server running, to run it locally you can have a look [here](https://gpt-router.writesonic.com/docs/Getting%20Started/Developing%20Locally)
   - or you can use our **Preview Deployment** with baseURL `https://gpt-router-preview.writesonic.com/` and to get an API key please fill the form [here](https://gpt-router.writesonic.com/#APIKey) and get the preview key delivered to you over the email

---

You can try out the GPTRouter using our PythonSDK or via the API [Docs](https://gpt-router-preview.writesonic.com/docs/static/index.html) meanwhile we are working on JS and other Clients and are looking for contributors

### Using the Python SDK

1. Installing the SDK

```bash
pip install gptrouter
```

Or with conda:

```bash
conda install gptrouter -c conda-forge
```

1. Create a `.env` file based on the template:

   ```.env.example
   GPT_ROUTER_API_TOKEN=
   ```

2. Edit the `.env` file and fill in your `GPT_ROUTER_API_TOKEN`:

   ```plaintext
   GPT_ROUTER_API_TOKEN="your_api_token_here"
   ```

## Examples Overview

Below is a link of each example included in the repository:

| Example             | Generation Type | Description                                    |
| ------------------- | --------------- | ---------------------------------------------- |
| Async Non Streaming | Text            | [here :car:](./Async%20Non%20Streaming.md)     |
| Async Streaming     | Text            | [here :helicopter:](./Async%20Streaming.md)    |
| Sync Streaming      | Text            | [here :blue_car:](./Sync%20Streaming.md)       |
| Sync Non Streaming  | Text            | [here :airplane:](./Sync%20Non%20Streaming.md) |
| Image Generations   | Audio           | Examples Coming Soon                           |

---

## Running the Examples

After setting up your `.env` with the API token and installing the necessary dependencies, you can run each example script using the `python` command. For instance:

```bash
python async_non_streaming.py
```

Please note that the output will vary based on the input provided and the model and parameters specified in each example.
