import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import '/styles/CandidateSearch.css'; 

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      console.log("API Response:", data); 
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const handleSave = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    nextCandidate();
  };

  const nextCandidate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % candidates.length);
  };

  const handleSkip = () => {
    nextCandidate();
  };

  if (candidates.length === 0) {
    return <h2 className="loading-text">Loading candidates...</h2>;
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div className="container">
      <h1 className="title">Candidate Search</h1>

      {/* Candidate Card */}
      <div className="card">
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} className="avatar" />
        </a>
        <div className="card-content">
          <h2 className="candidate-name">
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
              {currentCandidate.login} <span className="italic">({currentCandidate.login})</span>
            </a>
          </h2>
          <p className="info">Location: {currentCandidate.location ?? 'Not Provided'}</p>
          <p className="info">
            Email:{' '}
            <a href={`mailto:${currentCandidate.email ?? ''}`} className="email-link">
              {currentCandidate.email ?? 'Not Provided'}
            </a>
          </p>
          <p className="info">Company: {currentCandidate.company ?? 'Not Provided'}</p>
          <p className="bio">{currentCandidate.bio ?? 'No bio available.'}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="button-container">
        <button onClick={handleSkip} className="button skip">-</button>
        <button onClick={() => handleSave(currentCandidate)} className="button save">+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
