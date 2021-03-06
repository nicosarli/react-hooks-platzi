import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "../styles/Characters.css";
import Search from "./Search";
import useCharacters from "../hooks/useCharacters";

const API = "https://rickandmortyapi.com/api/character/";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "DELETE_TO_FAVORITE":
      return {
        ...state,
        favorites: [
          ...state.favorites.filter(
            (favorite) => favorite.id !== action.payload.id
          ),
        ],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  const characters = useCharacters(API);

  const isCharacterInFavorites = (favorite) =>
    favorites.favorites.find((character) => character.id === favorite.id);

  const handleClick = (favorite) => {
    dispatch({
      type: !!isCharacterInFavorites(favorite)
        ? "DELETE_TO_FAVORITE"
        : "ADD_TO_FAVORITE",
      payload: favorite,
    });
  };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <div className="Container">
      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />
      <h1>Personajes Favoritos</h1>
      <div className="FavoriteCharacters">
        {favorites.favorites.map((favorite) => (
          <li key={favorite.id}>
            <img src={favorite.image} alt={`Imagen de ${favorite.name}`} />
          </li>
        ))}
      </div>
      <div className="Characters">
        {filteredUsers.map((character) => (
          <div key={character.id} className="Character-Card">
            <img src={character.image} alt="ImageCharacter" />
            <h2>{character.name}</h2>
            <p>
              <b>Status:</b> {character.status}
            </p>
            <p>
              <b>Specie:</b> {character.species}
            </p>
            <button type="button" onClick={() => handleClick(character)}>
              Agregar a favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
