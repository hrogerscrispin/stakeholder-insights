import mongoose from 'mongoose';

const dbConnection = async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Succesfully connected to the database!");

    }catch(error){
        console.error("An error occurred trying to connect to MongoDB: "+error);
        process.exit(1);    
    }
}

export default dbConnection;