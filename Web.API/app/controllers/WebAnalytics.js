const Logger = require("../services/Logger");

module.exports = {
    getTimeSpentOnPage: async (req, res) => {
        try {
            const { page = 1, perPage = 10, ...criteria } = req.query;
            const result = await WebAnalytics.find(criteria)
                .limit(perPage)
                .skip((page - 1) * perPage);
            res.json(result);
        } catch (error) {
            Logger.err(error);
            res.sendStatus(500);
        }
    },
    getNumberOfTimeSendMessageBtn: async (req, res) => {
        try {
            const { page = 1, perPage = 10, ...criteria } = req.query;
            const result = await WebAnalytics.find(criteria)
                .limit(perPage)
                .skip((page - 1) * perPage);
            res.json(result);
        } catch (error) {
            Logger.err(error);
            res.sendStatus(500);
        }
    }
}