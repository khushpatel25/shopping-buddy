// config/openai.js
const { OpenAI } = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
//const openai = new OpenAIApi(configuration);

module.exports = openai;
