import { useState, useEffect } from 'react'
import SubmissionForm from './components/SubmissionForm'
import SubmissionList from './components/SubmissionList'
import StatsCards from './components/StatsCards'
import { listSubmissions } from './services/api'

export default function App() {
  const [refresh, setRefresh] = useState(0)
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await listSubmissions()
        setSubmissions(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [refresh])

  const handleSubmitted = () => {
    setRefresh(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Stakeholder Insights</h1>
          <p className="text-sm text-gray-400 mt-1">AI-powered request classifier</p>
        </div>
        <StatsCards submissions={submissions} />
        <SubmissionForm onSubmitted={handleSubmitted} />
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Recent Submissions
        </p>
        <SubmissionList refresh={refresh} submissions={submissions} />
      </div>
    </div>
  )
}