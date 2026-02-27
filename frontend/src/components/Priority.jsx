import React from 'react'

function Priority() {
  // We map the semantic daisyUI colors to represent urgency
  const priorityLevels = [
    { label: 'Critical', color: 'badge-error' },
    { label: 'High', color: 'badge-warning' },
    { label: 'Medium', color: 'badge-primary' },
    { label: 'Low', color: 'badge-info' },
    { label: 'Lowest', color: 'badge-success' },
  ]

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* Visual Indicator: A sleek, segmented bar */}
      <div className="flex items-center gap-1">
        {priorityLevels.map((item, index) => (
          <div 
            key={index}
            // Tooltip shows the label on hover
            className="tooltip tooltip-bottom" 
            data-tip={item.label}
          >
            <div 
              className={`
                badge ${item.color} 
                h-2 w-8 sm:w-12 rounded-full 
                opacity-80 hover:opacity-100 transition-all cursor-help
              `}
            />
          </div>
        ))}
        
        <h1 className="text-sm tracking-widest ms-3 text-base-content/70 hidden sm:block">
          Priority scale
        </h1>
      </div>
      
      {/* Mobile Label: Only shows what's important */}
      <div className="sm:hidden text-[10px] opacity-50 uppercase tracking-tighter">
        Priority Scale
      </div>
    </div>
  )
}

export default Priority