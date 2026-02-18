const colors = {
    Pedestrian: "border-blue-500 bg-blue-500/10 text-blue-400",
    Bike: "border-green-500 bg-green-500/10 text-green-400",
    Vehicle: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
    LargeVehicle: "border-red-500 bg-red-500/10 text-red-400"
}

const labels = {
    Pedestrian: "보행자",
    Bike: "자전거",
    Vehicle: "차량",
    LargeVehicle: "대형차량"
}

const TypeBadge = ({ type, count }) => {
    return (
        <div className={`border ${colors[type]} rounded-xl p-4 flex flex-col items-center gap-2`}>
            <p className="text-sm">{labels[type]}</p>
            <p className="text-3xl font-bold text-white">{count}</p>
        </div>
    )
}

export default TypeBadge