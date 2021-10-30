const { Router } = require('express');
const userRoute = require('./userRoutes');

const router = Router();

router.use('/user', userRoute);

module.exports = router;
