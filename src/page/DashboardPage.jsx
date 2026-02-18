import { useEffect, useState } from 'react'
import { connectWebSocket, disconnectWebSocket } from '../api/WebsocketApi'
import { getData } from '../api/DashboardApi'
import KpiCard from '../component/KpiCard'
import TypeBadge from '../component/TypeBadge'
import TimeFilter from '../component/TimeFilter'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts'

const DashboardPage = () => {
    const [stats, setStats] = useState(null) // 통계 데이터 상태
    const [minutes, setMinutes] = useState(5) // 시간 필터 상태 (5분 또는 30분)
    const [lastData, setLastData] = useState(null) //   마지막 수신 데이터 상태
    const [recentObjects, setRecentObjects] = useState([]) // 최근 수신 객체 상태

    
    // 웹소켓 연결
    useEffect(() => {
        connectWebSocket(
            (data) => {
                setLastData(data)
                // 최근 수신 객체 누적 
                const newObjects = data.objects.map(obj => ({
                    ...obj,
                    time: new Date(data.timestamp).toLocaleTimeString(),
                    zone: data.zone
                }))
                setRecentObjects(prev => [...newObjects, ...prev].slice(0, 50))

            }
        )
        return () => disconnectWebSocket()
    }, [])

    // stats API 호출
    useEffect(() => {
        getData(minutes).then((res) => setStats(res.data)||console.log(res.data))
    }, [minutes])


useEffect(() => {
    if (lastData) {
        // 웹 소켓으로 받아온 값으로 stats 업데이트 
        setStats(prev => {
            if (!prev) return prev

            // 새 데이터 타입별 카운트
            const newTypeCounts = { ...prev.type_counts }
            let totalSpeed = (prev.avg_speed * prev.total_count) || 0
            
            lastData.objects.forEach(obj => {
                if (obj.type in newTypeCounts) {
                    newTypeCounts[obj.type] += 1
                }
                totalSpeed += obj.speed_ms
            })

            const newTotalCount = prev.total_count + lastData.objects.length
            const newAvgSpeed = Math.round((totalSpeed / newTotalCount) * 100) / 100

            return {
                ...prev,
                total_count: newTotalCount,
                type_counts: newTypeCounts,
                avg_speed: newAvgSpeed
            }
        })
    }
}, [lastData])

    // 타입별 차트 데이터
    const typeChartData = stats?.type_counts
        ? Object.entries(stats.type_counts).map(([type, count]) => ({
            name: type === 'Pedestrian' ? '보행자' :
                type === 'Bike' ? '자전거' :
                    type === 'Vehicle' ? '차량' : '대형차량',
            count
        }))
        : []

    return (
        <div className="min-h-screen bg-gray-900 p-8 flex flex-col gap-10">

            {/* 헤더 */}
            <div className="flex justify-between items-center mb-8 flex-1">
                <div>
                    <h1 className="text-white text-3xl font-bold tracking-tight">
                        데이터 처리
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <TimeFilter value={minutes} onChange={setMinutes} />
                </div>
            </div>

            {/* KPI 카드 */}
            <div className="grid grid-cols-2 gap-4 mb-8 flex-2">
                <KpiCard title="총 감지수" value={stats?.total_count} unit="건" />
                <KpiCard title="평균 속도" value={stats?.avg_speed} unit="m/s" />
            </div>

            {/* 타입별 배지 */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {['Pedestrian', 'Bike', 'Vehicle', 'LargeVehicle'].map((type) => (
                    <TypeBadge
                        key={type}
                        type={type}
                        count={stats?.type_counts?.[type] ?? 0}
                    />
                ))}
            </div>
            {/* 차트 */}
            <div className="grid grid-cols-1 gap-4 mb-8 flex-3">
                {/* 타입별 막대 차트 */}
                <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">타입별 감지수</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={typeChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                            <YAxis stroke="#9CA3AF" fontSize={12} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                                labelStyle={{ color: '#F9FAFB' }}
                            />
                            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 최근 수신 데이터 테이블 */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex-3">
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">최근 수신 데이터</p>
                <div className="overflow-y-auto max-h-64">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-gray-800">
                            <tr className="text-gray-400 border-b border-gray-700">
                                <th className="text-left py-2 px-3">시간</th>
                                <th className="text-left py-2 px-3">구역</th>
                                <th className="text-left py-2 px-3">타입</th>
                                <th className="text-left py-2 px-3">속도(m/s)</th>
                                <th className="text-left py-2 px-3">UUID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentObjects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-gray-500 text-center h-48">
                                        데이터 수신 대기중...
                                    </td>
                                </tr>
                            ):(
                            recentObjects.map((obj, i) => (
                                <tr key={i} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                                    <td className="py-2 px-3 text-gray-300">{obj.time}</td>
                                    <td className="py-2 px-3 text-gray-300">{obj.zone}</td>
                                    <td className="py-2 px-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${obj.type === 'Pedestrian' ? 'bg-blue-500/20 text-blue-400' :
                                            obj.type === 'Bike' ? 'bg-green-500/20 text-green-400' :
                                                obj.type === 'Vehicle' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                            }`}>
                                            {obj.type === 'Pedestrian' ? '보행자' :
                                                obj.type === 'Bike' ? '자전거' :
                                                    obj.type === 'Vehicle' ? '차량' : '대형차량'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3 text-gray-300">{obj.speed_ms}</td>
                                    <td className="py-2 px-3 text-gray-500 text-xs truncate max-w-32">{obj.uuid}</td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default DashboardPage