import React from 'react';

const categories = [
  { id: 'work', label: 'Work', activeStyle: 'bg-primary/20 text-primary border-primary/30' },
  { id: 'studies', label: 'Studies', activeStyle: 'bg-secondary/20 text-secondary border-secondary/30' },
  { id: 'hobbies', label: 'Hobbies', activeStyle: 'bg-accent/20 text-accent border-accent/30' },
  { id: 'personal', label: 'Personal', activeStyle: 'bg-info/20 text-info border-info/30' },
  { id: 'social', label: 'Social', activeStyle: 'bg-success/20 text-success border-success/30' },
];

const CategorySelector = ({ activeCat, setActiveCat }) => {
  return (
    /* Added px-4 (mobile) and md:px-6 (desktop) to match your main layout padding */
    <div className="flex items-center gap-2 md:gap-3 overflow-x-auto py-4 px-4 md:px-6 no-scrollbar scroll-smooth">
      
      {/* "All" Filter */}
      <button
        onClick={() => setActiveCat(null)}
        className={`px-5 md:px-6 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap border
          ${activeCat === null 
            ? 'bg-base-content text-base-100 border-transparent shadow-md scale-105' 
            : 'bg-transparent text-base-content/50 border-base-content/10 hover:border-base-content/30 hover:text-base-content'
          }`}
      >
        All Categories
      </button>

      {/* Vertical Divider - only on desktop to keep mobile clean */}
      <div className="w-[1px] h-5 bg-base-content/10 mx-1 shrink-0 hidden md:block" />

      {/* Category List */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCat(cat.id)}
          className={`px-5 md:px-6 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap border
            ${activeCat === cat.id 
              ? `${cat.activeStyle} shadow-md font-semibold scale-105` 
              : 'bg-transparent text-base-content/50 border-base-content/5 hover:border-base-content/20 hover:text-base-content'
            }`}
        >
          {cat.label}
        </button>
      ))}
      
      {/* Invisible spacer at the end to ensure the last item doesn't hit the right edge either */}
      <div className="min-w-[16px] md:hidden" />
    </div>
  );
};

export default CategorySelector;