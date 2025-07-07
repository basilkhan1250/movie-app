import { useEffect, useState } from "react";
import "./style.css";

const ApiTest = ({ movie }) => {
    const [movies, setMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)


    useEffect(() => {

        const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmI0MmI4ZWE1ZmFmNzJiZGRhYmU2MjllMDMwOTE3MSIsIm5iZiI6MTc0OTkxNzE4Ny45MDMsInN1YiI6IjY4NGQ5ZTAzZDM3NGVlZjM5ZjNmZTA2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.itvfzkB_x0ll4c0w4NZiseaoQt0nvNuC-xxU29fNzmc'
            }
        };

        async function fetchTopMovie() {
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setTopMovies(data.results)
                console.log(data.results)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTopMovie()

    }, [])




    useEffect(() => {
        if (!movie.trim()) return;

        const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmI0MmI4ZWE1ZmFmNzJiZGRhYmU2MjllMDMwOTE3MSIsIm5iZiI6MTc0OTkxNzE4Ny45MDMsInN1YiI6IjY4NGQ5ZTAzZDM3NGVlZjM5ZjNmZTA2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.itvfzkB_x0ll4c0w4NZiseaoQt0nvNuC-xxU29fNzmc'
            }
        };

        async function fetchMovie() {
            try {
                setLoading(true)
                const response = await fetch(url, options);
                const data = await response.json();
                setMovies(data.results);
                setTotalPages(data.total_pages)
                console.log(movies)
                console.log(data.results)
                console.log(data.total_pages)
                console.log(data)
            } catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false)
            }
        }

        fetchMovie();

    }, [movie, page]);

    const nextPage = () => {
        if (page < totalPages) {
            setPage(pre => pre + 1)
        }
    }

    const previousPage = () => {
        if (page > 1) {
            setPage(pre => pre - 1)
        }
    }

    return (
        <>
            <div className="container">
                {/* <h1>Results {movie.replace(/\b\w/g, char => char.toUpperCase())}</h1> */}

                {loading ? (
                    <div className="loader-wrapper">
                        <div class="loader"></div>
                    </div>
                ) : (
                    <div className="title">
                        {topMovies.length > 0 ? (
                            topMovies.map((m, index) => (

                                <div key={index} className="movie-card">
                                    <div className="movie-card-img">
                                        <img src={`https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`} alt={m.title} />
                                    </div>
                                    <h2>{m.title}</h2>
                                    <p>Release Date: {m.release_date}</p>
                                </div>
                            ))
                        ) : ("nothin"
                        )}
                    </div>
                )}


                {loading ? (
                    <div className="loader-wrapper">
                        <div class="loader"></div>
                    </div>
                ) : (
                    <div className="title">
                        {movies.length > 0 ? (
                            movies.map((m, index) => (
                                m.backdrop_path || m.poster_path ? (
                                    <div key={index} className="movie-card">
                                        <div className="movie-card-img">
                                            <img src={`https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`} alt={m.title} />
                                        </div>
                                        <h2>{m.title}</h2>
                                        <p>Release Date: {m.release_date}</p>
                                    </div>
                                ) : ""
                            ))
                        ) : (""
                            // <p>No results found.</p>
                        )}
                    </div>
                )}
            </div>

            {movie.length > 0 && (
                <div className="pagination">
                    <button onClick={previousPage} disabled={page === 1}>Previous Page</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={nextPage} disabled={page === totalPages}>Next Page</button>
                </div>
            )}
        </>
    );
};

export default ApiTest;
