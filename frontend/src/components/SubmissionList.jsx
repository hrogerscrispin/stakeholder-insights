import { useEffect, useState } from "react";
import { listSubmissions } from "../services/api.js";
import categoryColors from "../constants/categoryColors.js";

export default function SubmissionList({ refresh }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listSubmissions();
        setSubmissions(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh]);

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (submissions.length === 0) return <p className="text-sm text-gray-400">No submissions yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {submissions.map((s) => (
        <div className="bg-white border border-gray-200 rounded-2xl p-5" key={s._id}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[s.category] || 'bg-gray-100 text-gray-700'}`}>
              {s.category}
            </span>
            <span className="text-xs text-gray-400">
              {new Date(s.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </span>
          </div>

          <p className="text-sm text-gray-500 italic border-l-2 border-gray-200 pl-3 mb-4">
            "{s.submittedText}"
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Issues</p>
              <div className="flex flex-wrap gap-2">
                {s.issuesDetected.map((issue, i) => (
                  <span key={i} className="text-xs bg-red-50 text-red-700 px-3 py-1 rounded-full">
                    {issue}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Suggested Actions</p>
              <div className="flex flex-wrap gap-2">
                {s.suggestedActions.map((action, i) => (
                  <span key={i} className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}