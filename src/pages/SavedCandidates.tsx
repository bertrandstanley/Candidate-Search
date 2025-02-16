import { useState, useEffect } from 'react';
import '/styles/SavedCandidates.css';

const SavedCandidates = () => {
  interface Candidate {
    login: string;
    avatar_url: string;
    html_url: string;
    location?: string;
    email?: string;
    company?: string;
    bio?: string;
  }

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'location'>('name');

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  const handleRemove = (login: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  const handleLocationFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'location');
  };

  // Filtering candidates by location
  const filteredCandidates = savedCandidates.filter(candidate =>
    candidate.location
      ? candidate.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true
  );

  // Sorting candidates by name or location
  const sortedCandidates = filteredCandidates.sort((a, b) => {
    if (sortBy === 'name') {
      return a.login.localeCompare(b.login);
    } else {
      const locationA = a.location ?? '';
      const locationB = b.location ?? '';
      return locationA.localeCompare(locationB);
    }
  });

  if (savedCandidates.length === 0) {
    return <h2 className="container">No potential candidates saved yet!</h2>;
  }

  return (
    <div className="container">
      <h1>Potential Candidates</h1>

      {/* Filters and Sorting */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by location"
          value={locationFilter}
          onChange={handleLocationFilter}
          className="filter-input"
        />
        <select onChange={handleSortChange} value={sortBy} className="sort-select">
          <option value="name">Sort by Name</option>
          <option value="location">Sort by Location</option>
        </select>
      </div>

      {/* Table of Saved Candidates */}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {sortedCandidates.map((candidate) => (
            <tr key={candidate.login}>
              <td className="image-cell">
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  <img src={candidate.avatar_url || 'default-avatar.png'} alt={candidate.login} />
                </a>
              </td>
              <td>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  <strong>{candidate.login}</strong>
                </a>
              </td>
              <td>{candidate.location ? candidate.location : 'Not provided'}</td>
              <td>
                {candidate.email ? (
                  <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                ) : (
                  'Not provided'
                )}
              </td>
              <td>{candidate.company ? candidate.company : 'Not provided'}</td>
              <td>{candidate.bio ? candidate.bio : 'No bio available.'}</td>
              <td>
                <button id="button" onClick={() => handleRemove(candidate.login)} title="Remove Candidate">
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
