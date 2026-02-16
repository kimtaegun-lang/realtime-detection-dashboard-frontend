import { api } from "./RootApi";

// 데이터 통계 조회
export const getData = async (minutes=5) => {
    const now = new Date().toISOString().slice(0, 19)
    const from = new Date(Date.now() - minutes * 60 * 1000).toISOString().slice(0, 19)
    
    const response = await api.get('stats', {
        params: {
            from: from,
            to: now
        }
    })
    return response
}