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
