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


**Managing the Fallback Order**

we can pass the order of Priority for model in case of failure using  ``` ordered_generation_requests=[generation_request] ``` 
since ordered_generation_requests takes a list input of models and providers that are accessed based on healthChecks and latency 

to add multiple models you can do something like 


```python

from gpt_router.models import ModelGenerationRequest
from gpt_router.enums import ModelsEnum, ProvidersEnum

generation_request_1 = ModelGenerationRequest(
    model_name=ModelsEnum.CLAUDE_INSTANT_12.value,
    provider_name=ProvidersEnum.ANTHROPIC.value,
    order=2,
    prompt_params=prompt_params
)

generation_request_2 = ModelGenerationRequest(
        model_name=ModelsEnum.OPENAI_GPT_35_TURBO_1106.value,
        provider_name=ProvidersEnum.CHAT_OPENAI.value,
        order=1,
        prompt_params=prompt_params
    )
ordered_generation_requests=[generation_request_1,generation_request_2]

```


**Managing Health Check Behaviour**

To customise the behaviour of the Model Router based on your needs, head over to [constants.ts](https://github.com/Writesonic/GPTRouter/blob/main/src/constants.ts) file and you can change the following variables 

```ts
// Interval for checking Health of models ,default to 5 minutes 
export const HEALTH_CHECK_CRON_JOB_EXPRESSION = "*/5 * * * *";

// To bypass an model if it has more latency and move to next model in priority list 
export const MODEL_LATENCY_LIMIT_FOR_GENERATION = 4000;


```
