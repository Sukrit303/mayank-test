const express = require('express');
const router = express.Router();
const { addEvents, getAllEvents, deleteEvents, updateEvent, getSingleEvents, getOrganiserEvents } =require('../controllers/eventController')
const { isAuthenticatedUser, allRoleValidation, roleValidation } = require('../middlewares/auth')

router.post('/events', isAuthenticatedUser, allRoleValidation, addEvents)
router.put('/event/:id', isAuthenticatedUser, roleValidation, updateEvent)
router.get('/events', getAllEvents)
router.get('/organiser/events', isAuthenticatedUser, allRoleValidation, getOrganiserEvents)
router.get('/event/:id', isAuthenticatedUser, roleValidation, getSingleEvents)
router.delete('/event/:id',isAuthenticatedUser, roleValidation, deleteEvents)

module.exports = router;