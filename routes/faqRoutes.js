const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const { translate } = require('@vitalets/google-translate-api');
const FAQ = require('../models/faq');

const router = express.Router();
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Fetch FAQs with language support
router.get('/', async (req, res) => {
  const lang = req.query.lang || 'en';
  try {
    const cachedFaqs = await getAsync(`faqs_${lang}`);
    if (cachedFaqs) {
      return res.json(JSON.parse(cachedFaqs));
    }

    let faqs = await FAQ.find();
    if (lang !== 'en') {
      faqs = await Promise.all(
        faqs.map(async (faq) => {
          const translatedQuestion = await translate(faq.question, { to: lang });
          const translatedAnswer = await translate(faq.answer, { to: lang });
          return {
            ...faq.toObject(),
            question: translatedQuestion.text,
            answer: translatedAnswer.text,
          };
        })
      );
    }
    await setAsync(`faqs_${lang}`, JSON.stringify(faqs), 'EX', 3600);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error });
  }
});

// Add new FAQ
router.post('/', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Error creating FAQ', error });
  }
});

module.exports = router;