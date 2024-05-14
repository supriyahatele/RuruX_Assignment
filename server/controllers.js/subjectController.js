const { subjectModel } = require("../models.js/subjectModel");


const createSubject = async (req, res) => {
const {name}= req.body
    try {
        const checkSubject = await subjectModel.findOne({name: name});
        if(checkSubject){
            return res.status(404).json({ message: 'subject already exists' });
        }
        const newSubject = new subjectModel( req.body);
        await newSubject.save();
        return res.status(201).json({ msg: "subject added successfully", subject: newSubject })
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const checkSubject =await  subjectModel.findOne({_id: id});
        if(!checkSubject){
            return res.status(404).json({ message: 'subject not found ' });
        }
        const stream = await subjectModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({stream:stream,mgs:"subject updated  successfully"});;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const {id } = req.params;
        const checkSubject =await  subjectModel.findOne({_id: id});
        if(!checkSubject){
            return res.status(404).json({ message: 'subject not found ' });
        }
        await subjectModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports ={createSubject,updateSubject,deleteSubject}