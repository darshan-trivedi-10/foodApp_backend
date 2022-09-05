const express = require('express');
const planRouter = express.Router();
const { createPlan, updatePlan, deletePlan, getPlan, getAllPlans } = require('../controller/planController');
const { protectRouter, isAuthorised } = require('../controller/AuthController')

// User Options

// get all plans 
planRouter
    .route('/')
    .post(createPlan)
    .patch(updatePlan)
    .delete(deletePlan)

// own plan
planRouter.use(protectRouter)
planRouter.route('/plan/:id')
    .get(getPlan)

// Admin and restaurantOwner can only change plan
// planRouter.use(isAuthorised(['admin', 'restaurantOwner']));
planRouter.route('/getAllPlan')
    .get(getAllPlans)



module.exports = planRouter;