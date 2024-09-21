import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "min character is password is 8"],
      maxlength: [30, "max character is password is 30"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is unique"],
    },
    phoneNumber: {
      type: String,
      length: [11, " invalid phone number"],
      required: [true, "phone is required"],
    },
    additionalPhones : [String],
    sendNotification : {
      type : Boolean ,
      default : false
    },
    nationalId  : {
      type : Number 
    },
    active: { type: Boolean, default: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = bcrypt.hashSync(this.password, 5);
  this.passwordConfirm = undefined;
  next();
});
const userModel = mongoose.model("User", userSchema);

export default userModel;
