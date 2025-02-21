const express = require("express");
const router = express.Router();

let num = 1;

router.get("/", async (req, res) => {
    console.log(num++)
    return res.status(200).json({message:"Connection successful."})
})

module.exports = router;