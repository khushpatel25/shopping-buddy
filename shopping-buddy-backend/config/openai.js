// config/openai.js
const { OpenAI } = require("openai");

// const configuration = new Configuration({
//   apiKey:
//     "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", // replace with your OpenAI API key
// });

const openai = new OpenAI({
  apiKey:
    "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",
});
//const openai = new OpenAIApi(configuration);

module.exports = openai;
