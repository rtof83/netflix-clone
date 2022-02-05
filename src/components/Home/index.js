import React, { useEffect, useState } from 'react';
import './style.css'
import { getHomeList, getMovieInfo } from '../Services/tmdb';
import MovieRow from '../MovieRow';
import FeaturedMovie from '../FeaturedMovie';
import Header from '../Header';
import loading from '../../assets/loading.gif';

const App = () => {
  const [ movieList, setMovieList ] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null)
  const [ blackHeader, setBlackHeader ] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className='page'>

      <Header black={blackHeader} />

      { featuredData && <FeaturedMovie item={featuredData} /> }

      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Direitos de imagem Netflix<br/>
        Dados fornecidos pela API do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src={loading} alt='Carregando' />
        </div>
      }
    </div>
  )
}

export default App;