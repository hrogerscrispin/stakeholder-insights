import Submission from "../model/submission.js";
import { analyzeSubmission } from "../services/AI_Service.js";


// simple POST HTTP Method 
export const createSubmission = async(req,res)=>{
    try{

        const {text} = req.body; 

        if(!text || text.trim()=='')
            return res.status(400).json({error:'Text is required'});


        const aiResponse = await analyzeSubmission(text);

        const submission = await Submission.create({
            submittedText:text,
            category:aiResponse.category,
            issuesDetected:aiResponse.issuesDetected,
            suggestedActions:aiResponse.suggestedActions
        });

        return res.status(201).json(submission)

    }catch(error){
        console.error(error);
        res.status(500).json({error:'Error processing the request'})
    }
}

//simple GET method
export const getSubmissions = async(req,res)=>{
    try{

        const submissions = await Submission.find().sort({createdAt:-1});

        res.json(submissions);

    }catch(error){
        res.status(500).json({error:'An error occurred trying to get the submissions'});
    }
}