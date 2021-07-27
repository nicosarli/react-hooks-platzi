import React, { useState, useEffect } from "react";
import "../Characters.css";

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  return (
    <div className="Characters">
      {characters.map(({ image, name, id, status, species }) => (
        <div key={id} className="Character-Card">
          <img src={image} alt="ImageCharacter" />
          <h2>{name}</h2>
          <p>
            <b>Status:</b> {status}
          </p>
          <p>
            <b>Specie:</b> {species}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Characters;
