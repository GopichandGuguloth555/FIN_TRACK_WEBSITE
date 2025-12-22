export default function BudgetHealth() {
  const items = [
    { label: "Food", percent: 70, color: "#4E3B84" },      
    { label: "Rent", percent: 90, color: "#7C6BB2" },       
    { label: "Savings", percent: 45, color: "#C7BEE7" },  
  ];

  return (
    <div
      className="
        bg-[#F7F5EE]
        p-16 rounded-2xl shadow-md border border-[#EAE7DF]
        w-full 
      "
    >
      <h2 className="text-[18px] font-semibold text-[#2F2D35] mb-4 pb-5">
       <b> Budget Health</b>
      </h2>

      <div className="flex items-center justify-between">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            
            {/* Circle Progress */}
            <div className="relative h-40 w-40 mb-2">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                {/* Background ring */}
                <path
                  d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                  fill="none"
                  stroke="#E4E2DC"
                  strokeWidth="3.5"
                />

                {/* Progress ring */}
                <path
                  d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32"
                  fill="none"
                  stroke={item.color}
                  strokeWidth="3.5"
                  strokeDasharray={`${item.percent}, 100`}
                  strokeLinecap="round"
                />
              </svg>

              {/* Percentage Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[20px] font-semibold text-[#2F2D35]">
                  {item.percent}%
                </span>
              </div>
            </div>

            {/* Label */}
            <p className="text-[14px] font-medium text-[#2F2D35]">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
