const TimeFilter = ({ value, onChange }) => {
    return (
        <select
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-gray-800 text-white rounded-xl px-4 py-2 border border-gray-600 hover:border-blue-500 transition-all cursor-pointer"
        >
            <option value={5}>최근 5분</option>
            <option value={30}>최근 30분</option>
        </select>
    )
}

export default TimeFilter