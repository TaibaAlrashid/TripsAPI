const { Profile } = require("../../db/models");

exports.profileFetch = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { include: ["image", "bio"] },
    });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedProfile = await req.profile.update(req.body);
    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};
