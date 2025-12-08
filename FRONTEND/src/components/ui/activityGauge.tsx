export default function ActivityGauge() {
  const percentage = 75; // dynamic later

  const strokeDasharray = 440; // full circle length
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border h-full flex flex-col">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity</h2>

      {/* Gauge Chart */}
      <div className="flex justify-center items-center relative mt-2">
        <svg width="180" height="180" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="14"
            fill="none"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#3b82f6"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 80 80)"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center">
          <p className="text-3xl font-bold text-gray-800">{percentage}%</p>
          <p className="text-gray-500 text-sm">Done</p>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <p className="text-gray-700 text-sm">Shopping</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <p className="text-gray-700 text-sm">Regular</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-300"></div>
          <p className="text-gray-700 text-sm">Trip</p>
        </div>
      </div>
    </div>
  );
}
