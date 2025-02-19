const Track = require('../models/tracks'); // Adjust path as needed

const addTrack = async (req, res) => {
    try {
        const { duration_ms, images, name, release_date, album, artists, songType } = req.body;

        if (!duration_ms ||  !name || !release_date || !artists ) {
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
    const { search } = req.params; // Use req.params to get URL parameters
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    try {
      let result;
      if (search) {
        result = await Track.find(query).exec();
      } else {
        result = await Track.aggregate([{ $sample: { size: 5 } }]).exec();
      }
      console.log(result);
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error retrieving tracks");
    }
  };
  module.exports = {getTrack,addTrack};

