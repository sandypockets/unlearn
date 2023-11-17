const categories = [
  {
    groupLabel: 'Science',
    options: [
      { label: 'Astronomy and Cosmology', value: 'astronomy-cosmology' },
      { label: 'Biology and Genetics', value: 'biology-genetics' },
      { label: 'Neuroscience and Brain Research', value: 'neuroscience-brain-research' },
      { label: 'Environmental and Earth Sciences', value: 'environmental-earth-sciences' },
    ],
  },
  {
    groupLabel: 'Health & Medicine',
    options: [
      { label: 'Epidemiology and Public Health', value: 'epidemiology-public-health' },
      { label: 'Medical Advances and Treatments', value: 'medical-advances-treatments' },
      { label: 'Nutrition and Diet', value: 'nutrition-diet' },
      { label: 'Mental Health and Psychology', value: 'mental-health-psychology' },
    ],
  },
  {
    groupLabel: 'Technology',
    options: [
      { label: 'Artificial Intelligence and Robotics', value: 'artificial-intelligence-robotics' },
      { label: 'Cybersecurity and Data Privacy', value: 'cybersecurity-data-privacy' },
      { label: 'Internet, Digital Media, and Social Networks', value: 'internet-digital-media' },
      { label: 'Renewable Energy and Sustainability', value: 'renewable-energy-sustainability' },
    ],
  },
  {
    groupLabel: 'Climate & Environment',
    options: [
      { label: 'Climate Change and Environmental Impact', value: 'climate-change-environmental-impact' },
      { label: 'Conservation and Biodiversity', value: 'conservation-biodiversity' },
    ],
  },
  {
    groupLabel: 'Space & Astronomy',
    options: [
      { label: 'Space Exploration and Missions', value: 'space-exploration-missions' },
      { label: 'Astronomical Discoveries and Phenomena', value: 'astronomical-discoveries' },
      { label: 'Astrophysics and Exoplanets', value: 'astrophysics-exoplanets' },
    ],
  },
];

export default function SelectCategory({ onCategoryChange }) {
  return (
    <div className="w-full max-w-xs">
      <select
        onChange={onCategoryChange}
        className="w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md"
      >
        {categories.map(categoryGroup => (
          <optgroup key={categoryGroup.groupLabel} label={categoryGroup.groupLabel}>
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
