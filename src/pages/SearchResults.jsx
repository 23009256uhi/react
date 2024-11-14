import "./SearchResult.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const { word } = useParams();
  const [wordData, setWordData] = useState(null);
  const navigate = useNavigate();

  // Fetch data based on the route parameter
  async function fetchWordData() {
    try {
      const response = await axios.post("http://localhost:5000/fetchword", {
        userInput: word,
      });
      setWordData(response.data);
    } catch (error) {
      console.error("Error fetching word data:", error);
      setWordData(null);
    }
  }

  // Navigate to the practice page
  function handlePracticeClick(word, phonetic) {
    navigate(`/practice`, { state: { word, phonetic } });
  }

  // Fetch the word data when the component is mounted
  useEffect(() => {
    fetchWordData();
  }, [word]);

  return (
    <div className="results-div">
      {/* Loop through the searched word data */}
      {wordData && (
        <>
          {wordData.map((word, index) => (
            <div key={index}>
              <div className="word-button">
                <h3 className="word-header">{word.word}</h3>
                <button
                  onClick={() => handlePracticeClick(word.word, word.phonetic)}
                  className="btn"
                >
                  Practice this word
                </button>
              </div>
              <span className="phonetic">{word.phonetic}</span>

              {/* Loop through the word meanings */}
              {word.meanings.map((meaning, index) => (
                <div key={index} className="definitions">
                  <h4 className="part-of-speech">{meaning.partOfSpeech}</h4>

                  {/* Loop through the word definitions */}
                  {meaning.definitions.map((definition, index) => (
                    <div key={index} className="definition-div">
                      <span className="index-span">{index + 1}</span>
                      <p className="definition">{definition.definition}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SearchResults;
