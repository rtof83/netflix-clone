import React, { useEffect, useState } from "react";
import './App.css'
import { getHomeList, getMovieInfo } from './tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from "./components/FeaturedMovie";


const App = () => {
  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null)

  const loadAll = async () => {
    const list = await getHomeList();

    const originals = list.filter(o => o.slug === 'originals');
    const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    const chosen = originals[0].items.results[randomChosen];

    const chosenInfo = await getMovieInfo(chosen.id, 'tv');

    setMovieList(list);
    setFeaturedData(chosenInfo);
  }

  useEffect(() => {
    loadAll();
  }, [])

  return (
    <div className='page'>

      { featuredData && <FeaturedMovie item={featuredData} /> }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

    </div>
  )
}

export default App;