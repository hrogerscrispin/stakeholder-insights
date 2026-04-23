import { use, useState } from "react";
import { createSubmission } from "../services/api.js";

export default function SubmissionForm({onSubmitted}){
    
    const[text,setText] = useState('');
    const[loading,setLoading] = useState(false);
    const[error,setError]=useState('');

    //on submit a text from the textInput
    const handleSubmit = async()=>{
        if(!text.trim()) return;

        setLoading(true);
        setError('');

        try{

            await createSubmission(text);
            setText('');
            onSubmitted();

        }catch(error){
            setError('Error processing the request. Please, Try Again.')
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className="bg-white rounded-2xl border-gray-200 p-6 mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                New Request
            </h2>
            <textarea 
                className="w-full h-28 border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-gray-400"
                placeholder="Paste or write your request here..."
                value={text}
                onChange={(e)=>setText(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex justify-end mt-3">
                <button
                    className="bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-gray-700 disabled:opacity-50 transition"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Analyzing...' : 'Analyze with AI'}
                </button>
            </div>
        </div>
    )

}