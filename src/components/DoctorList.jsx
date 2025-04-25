function DoctorList({ doctors }) {
    return (
      <div className="space-y-6">
        {doctors.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No doctors found matching your criteria</p>
          </div>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
              data-testid="doctor-card"
            >
              <div className="flex flex-col md:flex-row md:items-center">
                
                {/* Doctor Photo */}
                <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0 md:w-1/6">
                  <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden">
                    {doctor.image ? (
                      <img
                        src={doctor.image}
                        alt={doctor.name || "Doctor"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Doctor Info */}
                <div className="flex-1 md:pl-6">
                  <h3
                    className="text-xl font-semibold text-gray-800"
                    data-testid="doctor-name"
                  >
                    {doctor.name || "Unknown Doctor"}
                  </h3>
                  <p className="text-gray-600" data-testid="doctor-specialty">
                    {Array.isArray(doctor.specialties) ? doctor.specialties.join(", ") : "General"}
                  </p>
                  <p className="text-gray-600" data-testid="doctor-experience">
                    {doctor.experience || 0} yrs exp.
                  </p>
  
                  {/* Clinic and Location */}
                  <div className="mt-3 space-y-1 text-sm text-gray-500">
                    {doctor.clinicName && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
                          />
                        </svg>
                        {doctor.clinicName}
                      </div>
                    )}
                    {doctor.location && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {doctor.location}
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Fee and Book Button */}
                <div className="flex flex-col items-center md:items-end mt-4 md:mt-0 md:w-1/5">
                  <div className="font-semibold text-lg text-gray-900" data-testid="doctor-fee">
                    {doctor.fees || 0}
                  </div>
                  <button
                    className="mt-3 px-4 py-2 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                    aria-label={`Book appointment with ${doctor.name}`}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
}

export default DoctorList;
