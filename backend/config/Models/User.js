import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        // match: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        // minLength: 6,
        select: false, // Exclude password from queries by default
        maxLength: 1024, // To prevent excessively long passwords
        trim: true,
        // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
    },
},
{
    timestamps: true,
});

// Hash password before saving to the database
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}; 

const User = mongoose.model("User", userSchema);
export default User;