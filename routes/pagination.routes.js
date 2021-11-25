const express = require('express');
const router = express.Router();
const { pagination } = require('../controller/pagination.controller');

router.get('/movie-page/:limit/:pageNum', pagination);

module.exports = router;