const express = require('express');
const OngController = require('./controllers/ongController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
const routes = express.Router();

routes.post('/session',SessionController.create)

routes.post('/ongs',OngController.create);
routes.get('/ongs',OngController.index);

routes.post('/incidents', IncidentsController.create);
routes.get('/incidents',IncidentsController.index);
routes.delete('/incidents/:id',IncidentsController.delete);
routes.get('teste');
routes.get('/profile', ProfileController.index);


module.exports = routes;
