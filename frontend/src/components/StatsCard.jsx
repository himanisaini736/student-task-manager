function StatsCard({ title, count, icon, bgClass }) {
    return (
        <div
            className={`
                ${bgClass}
                rounded-2xl
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                p-6`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-gray-600">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {count}
                    </h2>
                </div>

                <div className="text-5xl">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export default StatsCard;