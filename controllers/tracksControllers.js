const Track = require('../models/tracks'); // Adjust path as needed

const addTrack = async (req, res) => {
    try {
        const { duration_ms, images, name, release_date, album, artists, songType } = req.body;

        if (!duration_ms || !name || !release_date || !artists) {
            return res.status(400).json({
                message: 'All required fields must be filled.',
            });
        }

        const newTrack = new Track({
            duration_ms,
            images,
            name,
            release_date,
            album: album || null,
            artists,
            songType
        });

        await newTrack.save();

        res.status(201).json({ message: 'Track added successfully', track: newTrack });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getTrack = async (req, res) => {
    let { search } = req.params;
    search = search ? search.trim() : '';

    try {
        let combinedResults = [];

        if (!search) {
            const randomTracks = await Track.aggregate([{ $sample: { size: 5 } }]).exec();
            return res.json(randomTracks);
        } else {
            const bestMatch = await Track.findOne({ name: { $regex: `^${search}$`, $options: "i" } }).exec();

            const allMatches = await Track.find({
                name: { $regex: search, $options: "i" }
            }).exec();

            if (bestMatch) {
                combinedResults.push(bestMatch);
                const otherMatches = allMatches.filter(track => track._id.toString() !== bestMatch._id.toString());
                combinedResults = combinedResults.concat(otherMatches);
            } else {
                combinedResults = allMatches;
            }

            return res.json(combinedResults);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error retrieving tracks");
    }
};

module.exports = { getTrack, addTrack };