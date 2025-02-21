const fs = require("fs");
const openai = require("../config/openai");
const Tesseract = require("tesseract.js");

exports.extractTotalAmount = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;

  console.log({filePath})

  try {
    // Extract text from receipt image using Tesseract
    const extractedText = await Tesseract.recognize(filePath, "eng", {
      // logger: (m) => console.log(m), // Optional logger to show progress
    });

    console.log("Extracted Text:", extractedText.data.text);

    // Send extracted text to gpt-3.5-turbo to find the total amount
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here is a receipt text: "${extractedText.data.text}". Please find the total amount in this receipt in the format "Total: $amount".`,
        },
      ],
    });

    // Assuming gpt-3.5-turbo responds with the total amount in the desired format
    const gptResponseText = response.choices[0].message.content;
    console.log("gpt-3.5-turbo Response:", gptResponseText);

    // Use regex to extract only the amount from gpt-3.5-turbo's response
    const totalAmountMatch = gptResponseText.match(/\$?(\d+(\.\d{1,2})?)/);

    console.log({totalAmountMatch})

    const totalAmount = totalAmountMatch
      ? parseFloat(totalAmountMatch[1])
      : null;
    
    console.log({totalAmount})

    if (totalAmount) {
      res.json({ total_amount: totalAmount });
    } else {
      res.status(404).json({ error: "Total amount not found in the response" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process image" });
  }
};

exports.extractTime = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;

  try {
    // Extract text from receipt image using Tesseract
    const extractedText = await Tesseract.recognize(filePath, "eng", {
      logger: (m) => console.log(m),
    });

    console.log("Extracted Text:", extractedText.data.text);

    // Send extracted text to gpt-3.5-turbo to find the time
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here is a receipt text: "${extractedText.data.text}". Please find the time mentioned in this receipt in the format "Time: HH:MM AM/PM".`,
        },
      ],
    });

    const gptResponseText = response.choices[0].message.content;
    console.log("gpt-3.5-turbo Response:", gptResponseText);

    const timeMatch = gptResponseText.match(
      /(\d{1,2}:\d{2}\s?(?:AM|PM|am|pm)?)/
    );
    const extractedTime = timeMatch ? timeMatch[1] : null;

    if (extractedTime) {
      res.json({ time: extractedTime });
    } else {
      res.status(404).json({ error: "Time not found in the response" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process image" });
  }
};

exports.extractHealthiness = async (req, res) => {

  // console.log(req.body.image)
  // console.log(req.file)

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;

  try {
    // Extract text from receipt image using Tesseract
    const extractedText = await Tesseract.recognize(filePath, "eng", {
      // logger: (m) => console.log(m), // Optional logger to show progress
    });

    // console.log("Extracted Text:", extractedText.data.text);

    // Send extracted text to gpt-3.5-turbo to analyze the items
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here is a receipt text: "${extractedText.data.text}". Extract all the items purchased and determine if the majority of the items are healthy or unhealthy. Respond only with "healthy" or "unhealthy".`,
        },
      ],
    });

    const gptResponseText = response.choices[0].message.content
      .trim()
      .toString();
    console.log("gpt-3.5-turbo Response:", gptResponseText);

    if (gptResponseText === "healthy" || gptResponseText === "unhealthy") {
      res.json({ status: gptResponseText });
    } else {
      res.status(400).json({ error: "Unexpected response from gpt-3.5-turbo" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process image" });
  }
};
