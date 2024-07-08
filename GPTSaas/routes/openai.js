const express = require('express');
const router = express.Router();
const { summarize } = require('../controllers/openai');

router.post("/summarize", summarize);

module.exports = router;
