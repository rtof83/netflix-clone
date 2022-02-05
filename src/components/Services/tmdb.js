import axios from 'axios';

const API_KEY = ''
const API_BASE = 'https://api.themoviedb.org/3'

const basicSearch = async (endpoint) => {
    let items;
    await axios.get(API_BASE+endpoint)
    .then(({ data }) => {
        items = data
      })

    return items;
}

const getHomeList = async () => {
    return ([
        {
            slug: 'originals',
            title: 'Originais do Netflix',
            items: await basicSearch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
        },

        {
            slug: 'trending',
            title: 'Recomendados para Você',
            items: await basicSearch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
        },

        {
            slug: 'toprated',
            title: 'Em alta',
            items: await basicSearch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
        },

        {
            slug: 'action',
            title: 'Ação',
            items: await basicSearch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
        },

        {
            slug: 'comedy',
            title: 'Comédia',
            items: await basicSearch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
        },

        {
            slug: 'horror',
            title: 'Terror',
            items: await basicSearch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
        },

        {
            slug: 'romance',
            title: 'Romance',
            items: await basicSearch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
        },

        {
            slug: 'documentary',
            title: 'Documentários',
            items: await basicSearch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
        }
    ]);
}

const getMovieInfo = async (movieId, type) => {
    return await basicSearch(`/${type}/${movieId}?language=pt-BR&api_key=${API_KEY}`);
}

export { getHomeList, getMovieInfo };