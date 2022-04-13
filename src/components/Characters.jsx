import React ,{useState,useEffect} from 'react'
import {useQuery} from 'react-query';
import Character from './character';

export default function Characters() {
    // const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(41);
    const fetchCharacters =  async ({queryKey}) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
        return response.json();
    }
    // 아래 ["characters", page] 부분이 결국 위에 함수에서 받아오는 queryKey가 됨!! 
    const {data, status, isPreviousData} = useQuery(["characters", page], fetchCharacters, {
      // 다음 데이터를 fetching하기 전까지 기존 데이터를 유지해주는 설정, ui를 부드럽게 할 수 있음
      keepPreviousData:true
    });

    if(status === "loading") {
      return <div>Loading...</div>
    }
    if (status === "error") {
      return <div>Error</div>
    }

  return (
    <>
    <div className='characters'>
        {data.results?.map((character,idx) => (
          <Character key={character.species + idx} character={character}/>
        ))}
    </div>
    <button disabled={page === 1} onClick={() => setPage((page)=> page -1)}>Previous</button>
    <button disabled={isPreviousData && data.info.next === null} onClick={() => setPage((page) => page +1)}> Next</button>
    </>

  )
}
