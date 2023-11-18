import categories from '@/categories.json';

export default function SelectCategory({ onCategoryChange }) {
  return (
    <div id="select-category" className="w-full max-w-xs">
      <select
        onChange={onCategoryChange}
        className="w-full px-3 py-2 bg-transparent text-white border border-gray-300 rounded-md"
      >
        {categories.map(categoryGroup => (
          <optgroup key={categoryGroup['groupLabel']} label={categoryGroup['groupLabel']}>
            {categoryGroup.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
