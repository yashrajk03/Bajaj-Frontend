// FilterPanel.jsx
import { useState } from 'react';

function FilterPanel({ 
  consultationType, 
  selectedSpecialties, 
  sortBy, 
  onConsultationChange, 
  onSpecialtyChange, 
  onSortChange, 
  onClearFilters,
  doctors
}) {
  const [showSpecialties, setShowSpecialties] = useState(true);
  const [showConsultation, setShowConsultation] = useState(true);
  const [showSort, setShowSort] = useState(true);

  // Get unique specialties from the doctors list
  const specialtyList = Array.from(
    new Set(doctors?.flatMap((doctor) => doctor?.specialties || []))
  ).sort();

  // Helper to safely format test IDs
  const formatTestId = (specialty) => {
    if (!specialty || typeof specialty !== 'string') return 'unknown';
    return specialty.replace(/[^a-zA-Z0-9]/g, '-');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button 
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Sort Options */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer" 
          onClick={() => setShowSort(!showSort)}
          data-testid="filter-header-sort"
        >
          <h3 className="font-medium">Sort by</h3>
          <svg 
            className={`h-5 w-5 transition-transform ${showSort ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {showSort && (
          <div className="pl-2">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="sortFees"
                checked={sortBy === 'fees'}
                onChange={() => onSortChange('fees')}
                className="mr-2"
                data-testid="sort-fees"
              />
              <label htmlFor="sortFees" className="text-sm">Price: Low-High</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="sortExperience"
                checked={sortBy === 'experience'}
                onChange={() => onSortChange('experience')}
                className="mr-2"
                data-testid="sort-experience"
              />
              <label htmlFor="sortExperience" className="text-sm">Experience: Most Experience First</label>
            </div>
          </div>
        )}
      </div>

      {/* Specialties Filter */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer" 
          onClick={() => setShowSpecialties(!showSpecialties)}
          data-testid="filter-header-speciality"
        >
          <h3 className="font-medium">Specialties</h3>
          <svg 
            className={`h-5 w-5 transition-transform ${showSpecialties ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {showSpecialties && (
          <div className="pl-2 max-h-60 overflow-y-auto">
            {specialtyList.map((specialty) => (
              <div key={specialty} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`specialty-${formatTestId(specialty)}`}
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={() => onSpecialtyChange(specialty)}
                  className="mr-2"
                  data-testid={`filter-specialty-${formatTestId(specialty)}`}
                />
                <label htmlFor={`specialty-${formatTestId(specialty)}`} className="text-sm">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mode of Consultation */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer" 
          onClick={() => setShowConsultation(!showConsultation)}
          data-testid="filter-header-moc"
        >
          <h3 className="font-medium">Mode of Consultation</h3>
          <svg 
            className={`h-5 w-5 transition-transform ${showConsultation ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {showConsultation && (
          <div className="pl-2">
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="videoConsult"
                checked={consultationType === 'video'}
                onChange={() => onConsultationChange('video')}
                className="mr-2"
                data-testid="filter-video-consult"
              />
              <label htmlFor="videoConsult" className="text-sm">Video Consultation</label>
            </div>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="inClinic"
                checked={consultationType === 'clinic'}
                onChange={() => onConsultationChange('clinic')}
                className="mr-2"
                data-testid="filter-in-clinic"
              />
              <label htmlFor="inClinic" className="text-sm">In Clinic</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="allConsult"
                checked={consultationType === ''}
                onChange={() => onConsultationChange('')}
                className="mr-2"
              />
              <label htmlFor="allConsult" className="text-sm">All</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPanel;
