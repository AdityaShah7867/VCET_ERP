const { RegisterTeacher, loginTeacher } = require('../Controller/Teacher.controllers');
const router = require('express').Router()


router.post('/registerteacher', RegisterTeacher);
router.post('/loginteacher', loginTeacher)


module.exports = router


