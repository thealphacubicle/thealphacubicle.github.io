export type ExpertiseCategory = {
  category: string;
  items: string[];
};

export const expertise: ExpertiseCategory[] = [
  {
    category: "AI/ML Technologies",
    items: [
      "LLMs & Prompt Engineering",
      "Claude (Anthropic)",
      "RAG Systems",
      "Multi-Agent Orchestration",
      "Model Context Protocol (MCP)",
      "Fine-tuning & Transfer Learning",
      "NLP & Text Analysis",
      "Computer Vision",
    ],
  },
  {
    category: "Infrastructure & Platforms",
    items: [
      "AWS",
      "AWS Bedrock",
      "AWS Lambda",
      "API Gateway",
      "AWS CDK",
      "Microsoft Azure",
      "Databricks",
      "Apache Spark",
      "Docker & Kubernetes",
      "MLflow",
      "Hugging Face",
    ],
  },
  {
    category: "Languages & Frameworks",
    items: [
      "Python",
      "SQL",
      "Java",
      "LangChain",
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Django",
    ],
  },
];

export function formatSkillsOutput(): string {
  return expertise
    .map((group) => `${group.category}\n  ${group.items.join(", ")}`)
    .join("\n\n");
}
