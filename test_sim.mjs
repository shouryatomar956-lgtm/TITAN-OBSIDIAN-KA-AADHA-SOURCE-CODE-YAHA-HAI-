import { SemanticVectorEngine } from './src/workers/searchEngineCore.ts';
async function run() {
  await SemanticVectorEngine.init();
  const v1 = await SemanticVectorEngine.getEmbedding("sqaut");
  const v2 = await SemanticVectorEngine.getEmbedding("Bench Press chest");
  console.log("Sim:", SemanticVectorEngine.cosineSimilarity(v1, v2));
}
run();
