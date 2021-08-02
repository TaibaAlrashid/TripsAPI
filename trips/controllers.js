const { Trip } = require("../db/models");


exports.tripsfetch = async (req, res, next) => {
    try {
        const trips = await Trip.findAll({
            attributes: { include: ["id", "title", "image", "description"] },
        });
        res.json(trips);
    } catch (error) {
        next(error);
    }
}

// ****************** GET THE TRIP BY ID ******************
exports.fetchTrips = async (tripId, next) => {
    try {
        const trip = await Trip.findByPk(tripId);
        return trip;
    } catch (error) {
        next(error);
    }
};


exports.createTrip = async (req, res, next) => {
    try {

        if (req.file) {
            req.body.image = `http://${req.get("host")}/${req.file.path}`;
        }
        req.body.userId = req.user.id;
        const newTrip = await Trip.create(req.body);
        res.status(201).json(newTrip);
    } catch (error) {
        next(error);
    }

}

exports.deleteTrip = async (req, res, next) => {
    try {
        await req.trip.destroy();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};