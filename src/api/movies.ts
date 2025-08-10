import {access_token, api_sleep, is_debug_mode} from "../utils/utils.ts";
import trending_movies_mock_data from '../mocks/trending_movies.json'
import movie_mock_data from '../mocks/movie.json'
import movies_by_title from '../mocks/movies_by_title.json'
import type {Movie} from "../components/Movie.tsx";

export async function fetch_trending_movies()
{
    if (is_debug_mode())
    {
        return trending_movies_mock_data['results'];
    }
    else
    {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token()}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch trending movies");
        return (await response.json())['results'];
    }
}

function get_watch_later_movies(): number[]
{
    if (localStorage.getItem('watchLater') === null)
    {
        return [];
    }
    return JSON.parse(localStorage.getItem('watchLater')!);
}

function get_favourite_movies(): number[]
{
    if (localStorage.getItem('favourites') === null)
    {
        return [];
    }
    return JSON.parse(localStorage.getItem('favourites')!);
}


export async function fetch_watch_later_movies()
{
    const watch_later = get_watch_later_movies();
    const res : Movie[] = [];
    for (const movie_id of watch_later)
    {
        const movie = await fetch_movie(movie_id);
        res.push(movie);
    }
    return res;
}

export async function fetch_favourite_movies()
{
    const watch_later = get_favourite_movies();
    const res : Movie[] = [];
    for (const movie_id of watch_later)
    {
        const movie = await fetch_movie(movie_id);
        res.push(movie);
    }
    return res;
}

export async function fetch_movies_by_title(title: string)
{
    if (is_debug_mode())
    {
        return movies_by_title['results'];
    }
    else
    {
        const url = `https://api.themoviedb.org/3/search/movie?query=${title}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token()}`,
            },
        });
        if (!response.ok) throw new Error("Failed to fetch trending movies");
        return (await response.json())['results'];
    }
}

export async function fetch_movie(id: number): Promise<Movie>
{
    if (is_debug_mode())
    {
        await api_sleep();
        return { ...movie_mock_data, id: id};
    }
    else
    {
        const url = `https://api.themoviedb.org/3/movie/${id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${access_token()}`,
            },
        });
        if (!response.ok) throw new Error(`Failed to fetch movie ${id}`);
        return await response.json();
    }
}
