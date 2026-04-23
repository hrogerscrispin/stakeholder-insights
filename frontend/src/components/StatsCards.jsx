export default function StatsCards({submissions}){
    const total = submissions.length

    const categories = [...new Set(submissions.map((s)=>s.category))].length

    const todayCount = submissions.filter((s)=>{
        const today = new Date()
        const created = new Date(s.createdAt);

        return(
            created.getDate() === today.getDate() &&
            created.getMonth() === today.getMonth() &&
            created.getFullYear() === today.getFullYear()
        )
    }).length

    const totalActions = submissions.reduce(
        (acc,s)=>acc +(s.suggestedActions?.length || 0), 0
    );

    const stats = [
        { label: 'Total Submissions', value: total },
        { label: 'Today', value: todayCount },
        { label: 'Active Categories', value: categories },
        { label: 'Actions Generated', value: totalActions },
    ]


    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
            ))}
        </div>
    )
}