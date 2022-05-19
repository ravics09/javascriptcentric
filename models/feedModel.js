const { Schema, model } = require("mongoose");

const feedSchema = new Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postTitle: {
      type: String,
      trim: true,
      minLength: [10, "title is too short!"],
      maxLength: 100,
    },
    postContent: {
      type: String,
      trim: true,
      minLength: [4, "postContent is too short!"],
      maxLength: 5000,
    },
    tags: {
      type: Array,
    },
    topicCover: {
      data: Buffer,
      contentType: String,
    },
    comments: [
      {
        text: String,
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
      },
    ],
    likedBy: [
      {
        userId: String,
      },
    ]
  },
  { timestamps: true }
);

module.exports = model("Feed", feedSchema);
