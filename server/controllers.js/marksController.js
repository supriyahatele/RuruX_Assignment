const { marksModel } = require("../models.js/marksModel");

const createMarks = async (req, res) => {
    try {
        const mark = new marksModel(req.body);
        await mark.save();
        return res.status(201).json(mark);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAllMarks = async (req, res) => {
    try {
        const marks = await marksModel.find({ studentName: req.params.id })
        .populate('studentName', '-_id name')
        .populate('stream', '-_id name')
        .populate('subjects', '-_id name');
        if (marks.length == 0) {
            return res.status(404).json({ error: "student marks has'nt declared yet " });
        }
        return res.status(200).json({ marks: marks });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const updateMarks = async (req, res) => {
    try {

        const marks = await marksModel.findOne({ _id: req.params.id })
        if (!marks) {
            return res.status(404).json({ error: "marks not found " });
        }
        const mark = await marksModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        return res.status(200).json(mark);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteMarks = async (req, res) => {
    try {
        const marks = await marksModel.findOne({ _id: req.params.id })
        if (!marks) {
            return res.status(404).json({ error: "marks not found " });
        }
        await marksModel.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({ message: 'Marks deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
module.exports = { createMarks, updateMarks, deleteMarks, getAllMarks }