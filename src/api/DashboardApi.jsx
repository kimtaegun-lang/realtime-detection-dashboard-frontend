import { api } from "./RootApi";

// 데이터 통계 조회
export const getData = async (minutes = 5) => {
    const now = new Date()
    const from = new Date(Date.now() - minutes * 60 * 1000)
    
    // YYYY-MM-DD HH:mm:ss 형식으로 변경
    const formatDateTime = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
    
    const response = await api.get('stats', {
        params: {
            from: formatDateTime(from),
            to: formatDateTime(now)
        }
    })
    return response
}
