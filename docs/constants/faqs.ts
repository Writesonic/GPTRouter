
export type FAQ = {
    question: string;
    answer: string;
}
const FAQS: FAQ[] = [

    {
        "question": "What is GPTRouter?",
        "answer": "GPTRouter is an open-source AI Model Router that serves as a model health checker and a traffic balancer between AI models. It readily integrates with numerous providers, overseeing and managing prompt response, preventing downtime, and offering cost and latency observability."
    },
    {
        "question": "Which AI models is GPTRouter compatible with",
        "answer": "GPTRouter is compatible with a range of AI models including OpenAI, Anthropic, Cohere, Azure OpenAI, ChatOpenAI, Dalle, Stable Diffusion, GPT4, Llava2 Image Model (Replicate), and more. It's also customizable to add new models."
    },
    {
        "question": "How does GPTRouter prevent downtime?",
        "answer": "GPTRouter's advanced health-checking mechanism allows for real-time monitoring and swift model switching to prevent downtime during unplanned interruptions."
    },
    {
        "question": "How do I customize GPTRouter for additional AI models not on your list?",
        "answer": "GPTRouter is built with adaptability in mind, it can easily be customized to accommodate additional AI models. You can follow our customization instructions available in the documentation "
    },
    {
        "question": "How much does GPTRouter cost?",
        "answer": "GPTRouter is absolutely free to use. It's licensed under GNU, making it accessible and affordable for everyone."
    },
    {
        "question": "Where can I deploy GPTRouter?",
        "answer": "GPTRouter can be deployed anywhere but we prefer deploying it on AWS ECS and IAAC templates for same can be found in our documentation, we are also in process to release Railway.app templates for same."
    },
]


export default FAQS