let planModel = require('../Modles/planModel');


module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            res.json({
                message: 'All Plan Retrieved',
                data: plans
            })
        } else {
            res.json({
                message: 'Sorry, Plans are not availible',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if (plan) {
            res.json({
                message: 'Plan Retrieved',
                data: plan
            })
        } else {
            res.json({
                message: 'Sorry, plan are not availible',
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body;
        let newPlan = await planModel.create(planData);
        return res.json({
            message: 'Plan created succesfully',
            data: newPlan
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        return res.json({
            message: "plan deleted succesfully",
            data: deletedPlan,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports.updatePlan = async function (req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        console.log(id);
        console.log(dataToBeUpdated);
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        for (let i = 0; i < keys.length; i++) {
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        console.log(plan);
        //doc
        await plan.save();
        return res.json({
            message: 'plan updated succesfully',
            data: plan
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};