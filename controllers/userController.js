require("dotenv").config();
const moment = require("moment");
const { createClient } = require("redis");
const User = require("./../models/userModel");

const client = createClient();
client.connect();

client.on("connect", () => {
  console.log("connected");
});
client.on("end", () => {
  console.log("disconnected");
});
client.on("reconnecting", () => {
  console.log("reconnecting");
});
client.on("error", (err) => {
  console.log("error", { err });
});

module.exports = {
  getProfile,
  editProfile,
  UploadProfileImage,
  addToReadingList,
  removeFromReadingList,
  fetchReadingList,
  addTolikedPost,
  removeFromlikedPost,
  fetchlikedPost
};

async function getProfile(request, response) {
  const { id } = request.params;
  const profile = await client.get(id);

  if (profile) {
    response.status(200).json({
      user: JSON.parse(profile),
    });
  } else {
    const user = await User.findById(id);
    if (user) {
      let profilePic = user.profilePhoto
        ? "http://localhost:9090" + user.profilePhoto.replace("public", "")
        : null;

      const customResponse = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        readingList: user.readingList,
        mobile: user.mobile,
        location: user.location,
        bio: user.bio,
        skills: user.skills,
        work: user.work,
        education: user.education,
        profilePhoto: profilePic,
        createdAt: moment(user.createdAt).format("YYYY-MM-DD"),
        updatedAt: moment(user.updatedAt).format("YYYY-MM-DD"),
      };
      client.setEx(
        id,
        60,
        JSON.stringify({ source: "Redis Cache", ...customResponse })
      );
      response.status(200).json({
        user: customResponse,
      });
    } else response.status(400).send("User Information Not Found");
  }
}

async function editProfile(request, response) {
  const user = User.findById(request.params.id);
  if (user) {
    const updatedInfo = new User({
      _id: request.params.id,
      fullName: request.body.fullName,
      email: request.body.email,
      mobile: request.body.mobile,
      location: request.body.location,
      bio: request.body.bio,
      skills: request.body.skills,
      work: request.body.work,
      education: request.body.education,
    });

    User.findByIdAndUpdate(request.params.id, updatedInfo).then((dbUser) => {
      let profilePic = dbUser.profilePhoto
        ? "http://localhost:9090" + dbUser.profilePhoto.replace("public", "")
        : null;

      const customResponse = {
        _id: dbUser._id,
        fullName: dbUser.fullName,
        email: dbUser.email,
        profilePhoto: profilePic,
      };
      response.status(200).json({
        message: "Profile updated successfully!",
        user: customResponse,
      });
    });
  } else response.status(404).send("User Information Not Found.");
}

async function UploadProfileImage(request, response) {
  const { id } = request.params;
  var profilePic = request.file.path;
  User.findById(id, (err, data) => {
    data.profilePhoto = profilePic ? profilePic : data.profilePhoto;
    data
      .save()
      .then((dbUser) => {
        let profilePic = dbUser.profilePhoto
          ? "http://localhost:9090" + dbUser.profilePhoto.replace("public", "")
          : null;

        const customResponse = {
          _id: dbUser._id,
          fullName: dbUser.fullName,
          email: dbUser.email,
          profilePhoto: profilePic,
        };

        response.status(200).json({
          user: customResponse,
          message: "Your photo uploaded successfully",
        });
      })
      .catch((err) => {
        response.json(err);
      });
  });
}

async function addToReadingList(request, response) {
  const { id } = request.params;
  const { postId } = request.body;

  const user = await User.findById(id);
  if (user) {
    const newItem = {
      postId: postId,
    };

    const updateReadingList = {
      $push: { readingList: newItem },
    };

    User.findByIdAndUpdate({ _id: id }, updateReadingList, { new: true }).then(
      (res) => {
        let readIdList = res.readingList.map((item) => item.postId);
        response.status(200).json({
          message: "New Article Added To Reading List!",
          updatedReadingList: readIdList,
        });
      }
    );
  }
}

async function removeFromReadingList(request, response) {
  const { id } = request.params;
  const { postId } = request.body;
  User.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        readingList: { postId: postId },
      },
    },
    { new: true }
  ).then((res) => {
    let readIdList = res.readingList.map((item) => item.postId);
    response.status(200).json({
      message: "Selected Article Removed From Reading List!",
      updatedReadingList: readIdList,
    });
  });
}

async function fetchReadingList(request, response) {
  const { id } = request.params;
  const user = await User.findById(id);
  if (user) {
    let readIdList = user.readingList.map((item) => item.postId);
    response.status(200).json({
      readingList: user.readingList,
      idList: readIdList,
    });
  } else {
    response.status(404).send("Somthing is wrong.");
  }
}

async function addTolikedPost(request, response) {
  const { id } = request.params;
  const { postId } = request.body;

  const user = await User.findById(id);
  if (user) {
    const newItem = {
      postId: postId,
    };

    const updateReadingList = {
      $push: { readingList: newItem },
    };

    User.findByIdAndUpdate({ _id: id }, updateReadingList, { new: true }).then(
      (res) => {
        let readIdList = res.readingList.map((item) => item.postId);
        response.status(200).json({
          message: "New Article Added To Reading List!",
          updatedReadingList: readIdList,
        });
      }
    );
  }
}

async function removeFromlikedPost(request, response) {
  const { id } = request.params;
  const { postId } = request.body;
  User.findOneAndUpdate(
    { _id: id },
    {
      $pull: {
        readingList: { postId: postId },
      },
    },
    { new: true }
  ).then((res) => {
    let readIdList = res.readingList.map((item) => item.postId);
    response.status(200).json({
      message: "Selected Article Removed From Reading List!",
      updatedReadingList: readIdList,
    });
  });
}

async function fetchlikedPost(request, response) {
  const { id } = request.params;
  const user = await User.findById(id);
  if (user) {
    let readIdList = user.readingList.map((item) => item.postId);
    response.status(200).json({
      readingList: user.readingList,
      idList: readIdList,
    });
  } else {
    response.status(404).send("Somthing is wrong.");
  }
}

