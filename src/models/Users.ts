import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  { 
    username: { 
      type: String, 
      required: true,
      trim: true,
    }, 
    email: { 
      type: String, 
      required: true,
      unique: true,
      lowercase: true, 
      trim: true,
    }, 
    role: { 
      type: String,
      enum: ["admin", "seller", "customer"],
      required: true,
      default: "customer"
    },
    password: { 
      type: String, 
      select: false 
    }, 
    verification_code: { 
      type: Number, 
    },
    verification_code_expires: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 mins expiration
    },      
    is_verified: { 
      type: Boolean, 
      default: false
    }, 
    provider: { type: String, default: "credentials" }, // Store provider info
  },
  { timestamps: true }
);


userSchema.index({ verification_code_expires: 1 }, { expireAfterSeconds: 600 }); 

export default mongoose.models.User || mongoose.model("User", userSchema);
