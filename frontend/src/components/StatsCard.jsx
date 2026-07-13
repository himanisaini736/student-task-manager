function StatsCard({ title, count, bgColor }) {

    return (

        <div className={`${bgColor} rounded-xl shadow-md p-6`}>
            <h3 className="text-lg font-semibold text-gray-700">
                {title}
            </h3>
            
            <p className="text-4xl font-bold mt-3">
                {count}
            </p>
        </div>

    );

}

export default StatsCard;