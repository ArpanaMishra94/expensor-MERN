import mongoose from "mongoose";

async function connect() {
    await mongoose.connect('mongodb+srv://Arpana:Arpana2641@cluster0.cjy2xlu.mongodb.net/?retryWrites=true&w=majority')
    console.log('MongoDB connection is successful');
}

export default connect;
