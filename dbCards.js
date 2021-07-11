import mongoose from 'mongoose';



const cardSchema = mongoose.Schema({
	name:String,
	imgUrl:String,
});

const cardModel = mongoose.model('cards', cardSchema);
export default cardModel;
