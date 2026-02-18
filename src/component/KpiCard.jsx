const KpiCard = ({ title, value, unit }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col gap-3 hover:border-blue-500 transition-all duration-300">
            <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm tracking-widest uppercase">{title}</p>
            </div>
            <p className="text-white text-4xl font-bold">
                {value ?? '-'}
                <span className="text-gray-500 text-lg ml-2">{unit}</span>
            </p>
        </div>
    )
}

export default KpiCard