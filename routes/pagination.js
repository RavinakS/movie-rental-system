const express = require('express');
const router = express.Router();

const pagination = require('../controller/pagination');
router.get('/page/:limit/:pageNum', pagination);

module.exports = router;