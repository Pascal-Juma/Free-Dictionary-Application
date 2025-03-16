import Header from './assets/components/Header/Header'
import { IoSearchSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";

function App() {
  const [wordMeaning, setWordMeaning] = useState("");
  const [searchTerm, setSearchTerm] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["word", searchTerm],
    queryFn: async () => {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      if (!response.ok) {
        throw new Error("Error fetching word");
      }
      return response.json();
    },
    enabled: Boolean(searchTerm),
  });

  function handleSearch() {
    setSearchTerm(wordMeaning.trim());
  }

  return (
    <>
    <div className="landing-page">
      <div className="landing-page-heading">
        <div className="header-section">
        <Header />
        <div className="input-section">
          <input
            type="text"
            className="input-words"
            value={wordMeaning}
            onChange={(e) => setWordMeaning(e.target.value)}
            placeholder="Type to Search"
          />
          <button type="button" onClick={handleSearch} className="search-btn">
            <IoSearchSharp />Search
          </button>
        </div>         
        </div>
        <div className="status-message">
          {isLoading && <h1 className="loading-message">Loading Please Wait...</h1>}
          {isError && <h1 className="error-message">{error.message}</h1>}
        </div>

        {data && data.length > 0 && (
          <div className="word-details">
            <div className="word-intro">
            <h2>Word: {data[0].word}</h2>
            {data[0].phonetic && <p className="intro-phonetic">Phonetic: {data[0].phonetic}</p>}
            {data[0].phonetics.map((phonetic, i) =>
              phonetic.audio ? (
                <div key={i}>
                  <audio controls>
                    <source src={phonetic.audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : null
            )}
            </div>

            {data[0].meanings.map((meaning, i) => (
              <div key={i} className="meaning-section">
                <h3><span className="meaning-category">Part of Speech:</span> {meaning.partOfSpeech}</h3>
                <ol className="meaning-list">
                  {meaning.definitions.map((def, j) => (
                    <li key={j}>{def.definition}</li>
                  ))}
                </ol>
                {meaning.synonyms.length > 0 && (
                  <p className="meaning-synonyms">
                    <span className="synonym-title">Synonyms:</span> <span className="synonyms-details">{meaning.synonyms.join(", ")}</span>
                  </p>
                )}
                {meaning.antonyms.length > 0 && (
                  <p className="meaning-antonyms">
                    <span className="antonym-title">Antonyms:</span> <span className="antonyms-details">{meaning.antonyms.join(", ")}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="footer-section">
      <p className="footer-details">
        &copy; 2025 Pascal Juma. All CopyRight Reserved. Powered by Creative  <span className="footer-branding">  Vortex.</span>
      </p>
    </div>
    </>
  );
}

export default App;
