import { useState, useEffect, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import { useLocation, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch doctors data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        setError('Failed to load doctor data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Parse URL query params on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
    setConsultationType(params.get('consult') || '');
    setSelectedSpecialties(params.get('specialties') ? params.get('specialties').split(',') : []);
    setSortBy(params.get('sort') || '');
  }, [location.search]);

  // Memoized filtered list
  const filtered = useMemo(() => {
    let filtered = [...doctors];

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (consultationType) {
      filtered = filtered.filter(doctor => {
        if (consultationType === 'video') return doctor.videoConsult;
        if (consultationType === 'clinic') return doctor.inClinic;
        return true;
      });
    }

    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        selectedSpecialties.some(specialty =>
          doctor.specialties?.includes(specialty)
        )
      );
    }

    if (sortBy === 'fees') {
      filtered.sort((a, b) => a.fees - b.fees);
    } else if (sortBy === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }

    return filtered;
  }, [searchTerm, consultationType, selectedSpecialties, sortBy, doctors]);

  // Update URL & apply filters when state changes
  useEffect(() => {
    if (!searchTerm && !consultationType && selectedSpecialties.length === 0 && !sortBy) return;

    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (consultationType) params.set('consult', consultationType);
    if (selectedSpecialties.length > 0) params.set('specialties', selectedSpecialties.join(','));
    if (sortBy) params.set('sort', sortBy);

    navigate(`?${params.toString()}`, { replace: true });
    setFilteredDoctors(filtered);
  }, [searchTerm, consultationType, selectedSpecialties, sortBy, filtered, navigate]);

  // Debounced search input
  const debouncedSearchChange = useMemo(() => debounce(setSearchTerm, 300), []);

  const handleSearchChange = (value) => {
    debouncedSearchChange(value);
  };

  const handleConsultationChange = (type) => {
    setConsultationType(type);
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setConsultationType('');
    setSelectedSpecialties([]);
    setSortBy('');
    navigate('/');
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 p-4">
        <SearchBar 
          searchTerm={searchTerm}
          doctors={doctors}
          onSearchChange={handleSearchChange}
        />
      </header>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <FilterPanel
            consultationType={consultationType}
            selectedSpecialties={selectedSpecialties}
            sortBy={sortBy}
            onConsultationChange={handleConsultationChange}
            onSpecialtyChange={handleSpecialtyChange}
            onSortChange={handleSortChange}
            onClearFilters={handleClearFilters}
            doctors={doctors}
          />
        </div>

        <div className="w-full md:w-3/4">
          <DoctorList doctors={filteredDoctors} />
        </div>
      </div>
    </div>
  );
}

export default App;
