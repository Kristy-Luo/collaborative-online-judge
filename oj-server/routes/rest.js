const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const problemService = require('../services/problemService');

// Routing-level middleware
// Handles GET requests to the /problems path
router.get('/problems', (req, res) => {
    problemService.getProblems()
    .then(problems => res.json(problems));
});

// Handles GET requests to the /problems/:id path
router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblemByID(+id).then(problem => res.json(problem));
});

// Handles POST request to the /problems path 
router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
    .then(problem => res.json(problem), 
    err => res.status(400).send('Problem Aready Exists!'));
});

module.exports = router; 