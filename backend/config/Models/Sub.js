import mongoose from 'mongoose';    

const subSchema = new mongoose.Schema({
    brandLogo: {
        type: String,
    },
    brandName: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        enum: ['Weekly', 'Monthly', 'Yearly'],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    note: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
{
    timestamps: true,
});

const Sub = mongoose.model('Sub', subSchema);
export default Sub;