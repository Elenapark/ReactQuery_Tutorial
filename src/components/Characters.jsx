import React ,{useState,useEffect} from 'react'
import {useQuery} from 'react-query';
import Character from './character';

export default function Characters() {
    // const [characters, setCharacters] = useState([]);
    
    const fetchCharacters =  async () => {
        const response = await fetch("https://rickandmortyapi.com/api/character")
        return response.json();
    }
    const {data, status} = useQuery("characters", () => fetchCharacters());
    console.log(data);

    if(status === "loading") {
      return <div>Loading...</div>
    }
    if (status === "error") {
      return <div>Error</div>
    }

  return (
    <div className='characters'>
        {data.results?.map((character,idx) => (
          <Character key={character.species + idx} character={character}/>
        ))}
    </div>
  )
}
