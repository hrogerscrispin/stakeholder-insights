import mongoose, { Schema } from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        submittedText:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        issuesDetected:{
            type:[String],
            default:[]
        },
        suggestedActions:{
            type:[String],
            default:[]
        }
    },
    {timestamps:true}
);

export default mongoose.model("Submission",submissionSchema);