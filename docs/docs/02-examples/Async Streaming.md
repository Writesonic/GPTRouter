```python


import os
import time
from datetime import datetime
from typing import Generator, List
import asyncio
import logging
from dotenv import load_dotenv

from gpt_router.client import GPTRouterClient
from gpt_router.models import ModelGenerationRequest, GenerationParams, ChunkedGenerationResponse
from gpt_router.enums import ModelsEnum, ProvidersEnum, StreamingEventType
from gpt_router.constants import DEFAULT_API_BASE_URL

logger = logging.getLogger()
logger.setLevel(logging.INFO)

load_dotenv()

# Async function to perform the streamed generation of text
async def async_stream_text(input_prompt: str):
    # Initialize the GPTRouterClient with the base URL and API key
    client = GPTRouterClient(base_url=DEFAULT_API_BASE_URL, api_key=os.getenv('GPT_ROUTER_API_TOKEN'))

    logging.info(f"Started async task for input_prompt: {input_prompt}")
    # Define messages to be sent to the model
    messages = [
        {"role": "user", "content": input_prompt}
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

    # Perform an asynchronous, non-streaming generation request
    response = await client.agenerate(ordered_generation_requests=[generation_request], is_stream=True)
    return response

async def main(text_batch: List[str]):
    tasks = [asyncio.create_task(async_stream_text(text)) for text in text_batch]
    start = time.time()
    for i, task in enumerate(asyncio.as_completed(tasks)):
        response = await task
        task_id = f"Task {i + 1}"
        logger.info(f"{task_id} - Streaming started at {datetime.now()}: {time.time() - start} seconds since start")
        async for chunk in response:
            if chunk.event != StreamingEventType.UPDATE.value:
                continue
            logger.info(f"{task_id} - Received event at {datetime.now()}: {chunk}")
        logger.info(f"{task_id} - Streaming ended at {datetime.now()}: {time.time() - start} seconds for task")

# Run the async function using asyncio
if __name__ == "__main__":
    asyncio.run(main(["Write a 2 line poem", "Write a 3 line poem"]))

```
