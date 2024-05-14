const { streamModel } = require("../models.js/streamModel");

const createStream =async (req, res) => {
    try {
        const stream = new streamModel(req.body);
        await stream.save();
        return res.status(201).json({stream:stream,mgs:"stream added  successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStream = async (req, res) => {
    try {
        const { id } = req.params;
        const checkStream = streamModel.findOne({_id: id});
        if(!checkStream){
            return res.status(404).json({ message: 'Stream not found ' });
        }
        const stream = await streamModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({stream:stream,mgs:"stream added  successfully"});;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteStream = async (req, res) => {
    try {
        const {id } = req.params;
        const checkStream = streamModel.findOne({_id: id});
        if(!checkStream){
            return res.status(404).json({ message: 'Stream not found ' });
        }
        await streamModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Stream deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports ={createStream,updateStream,deleteStream}