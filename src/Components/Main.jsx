import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import PokemonInfo from './PokemonInfo'



const Main = () => {
    const [pokeData, setPokeData] = useState([])
    const [loading, setLoading] = useState(true)
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();


    const pokeFun = async () => {
        setLoading(true)
        const res = await axios.get(url);
        // console.log(res.data.results)
        setNextUrl(res.data.next)
        setPrevUrl(res.data.previous)

        getPokemon(res.data.results)
        setLoading(false)
    }

    const getPokemon = async (res) => {
        res.map( async (item) => {
            // getting data from urls
            const result = await axios.get(item.url);
            // console.log(result.data);
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
            
        })
    }


    useEffect(() => {
        pokeFun();
        console.log(pokeData)
    },[url])

  return (
    <>
        <div className="container">
            <div className="left-content">

                <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

                <div className="btn-group">
                    {prevUrl && <button onClick={() => {
                        setPokeData([])
                        setUrl(prevUrl)
                    }}>previous</button>}

                    {nextUrl && <button onClick={() => {
                        setPokeData([])
                        setUrl(nextUrl)
                    }}>next</button>}
                </div>
            </div>

            <div className="right-content">
                <PokemonInfo data={pokeDex} />
            </div>
        </div>
    </>
  )
}

export default Main