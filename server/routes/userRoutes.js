const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, (req, res) => {
    res.json({message: 'Protected route'});
});

module.exports = router;