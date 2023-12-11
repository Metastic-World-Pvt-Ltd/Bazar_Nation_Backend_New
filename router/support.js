const express = require('express');
var bodyParser = require('body-parser')
const { createSupportTicket } = require('../controllers/SupportTicket/createSupportTicket');
const { assignToMe } = require('../controllers/SupportTicket/assignToMe');
const { getAllSupportTicket } = require('../controllers/SupportTicket/getAllSupportTicket');
const { getTicketById } = require('../controllers/SupportTicket/getTicketById');
const { ticketComment } = require('../controllers/SupportTicket/ticketComment');
const { closeTicket } = require('../controllers/SupportTicket/closeTicket');
const { filterSupportTicket } = require('../controllers/SupportTicket/filterSupportTicket');



const router = express.Router();
router.use(express.json());
//router.use(express.urlencoded());
// router.use(bodyParser.urlencoded());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/',function(req, res){
    res.send('Support Profile')
} );

router.post('/createticket',createSupportTicket);
router.post('/assign',assignToMe);
router.get('/alltickets',getAllSupportTicket);
router.get('/ticketbyid/:id',getTicketById);
router.post('/updatecomment',ticketComment);
router.post('/closeticket',closeTicket);
router.get('/filterticket',filterSupportTicket);
module.exports = router;