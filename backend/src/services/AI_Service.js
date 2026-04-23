// import{GoogleGenerativeAI} from '@google/generative-ai'

// const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const analyzeSubmission = async(text)=>{

//     const model = generativeAI.getGenerativeModel({model:"gemini-2.0-flash"});

//     const prompt =`You are an AI that extracts structured business insights.
//             Return ONLY valis JSON in this format:
//             {
//                 "category":"string",
//                 "issuesDetected":["string"],
//                 "suggestedActions":["string"]
//             }
            
//             Rules:
//             -category must be short (just 1-3 words)
//             -issuesDetected must be clear problems
//             -suggestedActions must be practical next steps
            
//             Text:"${text}"
//             `;

//     const aiResult = await model.generateContent(prompt);
//     const response = await aiResult.response;
//     let output = response.text();

//     output = output.replace(/```json|```/g,"").trim();

//     try{
//         return JSON.parse(output);
//     }catch(error){
//         console.error("Error parsing JSON from Gemini AI", output);
//         throw new Error("Invalid JSON response from AI");
//     }
// }

import OpenAI from 'openai'

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

export const analyzeSubmission =async(submittedText)=>{
    const response = await client.chat.completions.create({
        model:'llama-3.3-70b-versatile',
        max_completion_tokens:1024,
        messages:[{
            role:'user',
            content:`You are an AI that extracts structured business insights.
            Return ONLY valis JSON in this format:
            {
                "category":"string",
                "issuesDetected":["string"],
                "suggestedActions":["string"]
            }
            
            Rules:
            -category must be short (just 1-3 words)
            -issuesDetected must be clear problems
            -suggestedActions must be practical next steps`
            
        },
        {
            role:'user',
            content:submittedText
        }
    ]
    })

    const raw = response.choices[0].message.content
    const cleaned = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)

    
    return JSON.parse(raw);
}

