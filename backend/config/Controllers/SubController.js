import Sub from "../Models/Sub.js";

export const createSub = async (req, res) => {
    try {
        const sub = new Sub({ ...req.body, user: req.user._id });
        const savedSub = await sub.save();
        res.status(201).json(savedSub);
    } catch (error) {
        res.status(500).json({ message: "Create Server Error", error: error.message });
    }
};

export const getSubs = async (req, res) => {
    try {
        const subs = await Sub.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(subs);
    } catch (error) {
        res.status(500).json({ message: "Get Server Error", error: error.message });
    }
};

export const getSubById = async (req, res) => {
    try {
        const sub = await Sub.findById({ _id: req.params.id, user: req.user._id });
        if(!sub) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json(sub);
    } catch (error) {
        res.status(500).json({ message: "Get ID Server Error", error: error.message });
    }
};

export const updateSub = async (req, res) => {
    try {
        const updated = await Sub.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if(!updated){
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Update Server Error", error: error.message });
    }
}

export const deleteSub = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if(!deleted){
            return res.status(404).json({ message: "Subscription not found" });
        }
        res.status(200).json({ message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete Server Error", error: error.message });
    }
}