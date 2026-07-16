function StatsCard({ title, count, icon, bgClass }) {
    return (
        <div
            className={`
                ${bgClass}
                rounded-2xl
                p-6
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                border
                border-white/50
                cursor-pointer
            `}
        >
            <div className="flex justify-between items-start">

                {/* Left Side */}
                <div>

                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold text-gray-800 mt-3">
                        {count}
                    </h2>

                </div>

                {/* Right Side */}
                <div className="text-5xl text-gray-700 opacity-80">
                    {icon}
                </div>

            </div>
        </div>
    );
}

export default StatsCard;