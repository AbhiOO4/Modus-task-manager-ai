import React from 'react';

const categories = [
  { id: 'work', label: 'Work', style: 'btn-primary' },
  { id: 'studies', label: 'Studies', style: 'btn-secondary' },
  { id: 'hobbies', label: 'Hobbies', style: 'btn-accent' },
  { id: 'personal', label: 'Personal', style: 'btn-info' },
  { id: 'social', label: 'Social', style: 'btn-success' },
];

const CategorySelector = ({ activeCat, setActiveCat }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar mb-3">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCat(cat.id)}
          className={`btn btn-soft btn-sm md:btn-md ${cat.style} ${
            activeCat === cat.id 
            ? 'border-2 border-current shadow-sm' 
            : 'bg-opacity-20 border-transparent'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;