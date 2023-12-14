# Sync Streaming


```python

import os
import logging
from dotenv import load_dotenv

from gpt_router.client import GPTRouterClient
from gpt_router.models import ModelGenerationRequest, GenerationParams
from gpt_router.enums import ModelsEnum, ProvidersEnum, StreamingEventType
from gpt_router.constants import DEFAULT_API_BASE_URL


logger = logging.getLogger()
logger.setLevel(logging.INFO)

load_dotenv()

# Initialize the GPTRouterClient with the base URL and API key
client = GPTRouterClient(base_url=DEFAULT_API_BASE_URL, api_key=os.getenv('GPT_ROUTER_API_TOKEN'))


# Define messages to be sent to the model
messages = [
    {"role": "user", "content": "Write me a short poem"}
]

# Configure generation parameters
prompt_params = GenerationParams(messages=messages)

# Create a generation request for the model
generation_request = ModelGenerationRequest(
    model_name=ModelsEnum.CLAUDE_INSTANT_12.value,
    provider_name=ProvidersEnum.ANTHROPIC.value,
    order=1,
    prompt_params=prompt_params
)

# Perform a synchronous, streaming generation request
response = client.generate(ordered_generation_requests=[generation_request], is_stream=True)

texts = ""
for chunk_response in response:
    if chunk_response.event != StreamingEventType.UPDATE.value:
        continue
    logger.info(f"Received chunk data: {chunk_response.data}")
    texts += chunk_response.data['text']

logger.info(f"Generation Output: {texts}")
```