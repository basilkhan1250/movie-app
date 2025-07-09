import { useEffect, useState } from "react";
import "./style.css";

const ApiTest = ({ movie }) => {
    const [movies, setMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [topLoading, setTopLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [poster, setPoster] = useState(null)
    const [activeCategory, setActiveCategory] = useState("top_rated")



    const categoryLabels = {
        top_rated: "Top Rated Movies",
        upcoming: "Upcoming Movies",
        trending: "Trending Movies",
        popular: "Popular Movies",
        nowplaying: "Now Playing Movies"
    };


    const handlePoster = (movies) => {
        setPoster(movies)
    }




    async function fetchCategory(type = "top_rated") {
        let endpoint = "";

        if (type === "trending") {
            endpoint = "trending/movie/day?language=en-US"
        }
        else if (type === "upcoming") {
            endpoint = "movie/upcoming?language=en-US&page=1"
        }
        else if (type === "popular") {
            endpoint = "movie/popular?language=en-US&page=1"
        }
        else if (type === "nowplaying") {
            endpoint = "movie/now_playing?language=en-US&page=1"
        }
        else {
            endpoint = "movie/top_rated?language=en-US&page=1"
        }


        // const url = 'https://api.themoviedb.org/3/'; //{Trending}//
        // const url = 'https://api.themoviedb.org/3/'; // {Upcoming}//
        // const url = 'https://api.themoviedb.org/3/'; //{Popular}//
        // const url = 'https://api.themoviedb.org/3/'; //{Now Playing} //


        const url = `https://api.themoviedb.org/3/${endpoint}`;  //{Top Rated}//
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmI0MmI4ZWE1ZmFmNzJiZGRhYmU2MjllMDMwOTE3MSIsIm5iZiI6MTc0OTkxNzE4Ny45MDMsInN1YiI6IjY4NGQ5ZTAzZDM3NGVlZjM5ZjNmZTA2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.itvfzkB_x0ll4c0w4NZiseaoQt0nvNuC-xxU29fNzmc'
            }
        };

        try {
            setTopLoading(true)
            const response = await fetch(url, options);
            const data = await response.json();
            setTopMovies(data.results)
            console.log(data.results)
        } catch (error) {
            console.error(error)
        } finally {
            setTopLoading(false)
        }
    }


    useEffect(() => {
        fetchCategory("top_rated")
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
                setTopMovies(false)
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

                {movie.trim().length > 0 ? (
                    <h1 className="results" id="top" >Results for {movie.replace(/\b\w/g, char => char.toUpperCase())}</h1>
                ) : (
                    <h1 className="showing" id="top">Showing: {categoryLabels[activeCategory]}</h1>
                )}


                <div className="container-btns">
                    <button onClick={() => {
                        fetchCategory("upcoming")
                        setActiveCategory("upcoming")
                    }}>Upcoming</button>
                    <button onClick={() => {
                        fetchCategory("trending")
                        setActiveCategory("trending")
                    }}>Trending</button>
                    <button onClick={() => {
                        fetchCategory("popular")
                        setActiveCategory("popular")
                    }}>Popular</button>
                    <button onClick={() => {
                        fetchCategory("nowplaying")
                        setActiveCategory("nowplaying")
                    }}>Now Playing</button>
                </div>




                {topLoading ? (
                    <div className="loader-wrapper">
                        <div class="loader"></div>
                    </div>
                ) : (
                    <div className="title">
                        {topMovies.length > 0 ? (
                            topMovies.map((m, index) => (
                                <div key={index} className="movie-card" onClick={() => handlePoster(m)}>
                                    <div className="movie-card-img">
                                        <img src={`https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`} alt={m.title} />
                                    </div>
                                    <h2>{m.title}</h2>
                                    <p>Release Date: {m.release_date}</p>
                                </div>
                            ))
                        ) : (""
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
                                    <div key={index} className="movie-card" onClick={() => handlePoster(m)}>
                                        <div className="movie-card-img">
                                            <img src={`https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`} alt={m.title} />
                                        </div>
                                        <h2>{m.title}</h2>
                                        <p>Release Date: {m.release_date}</p>
                                    </div>
                                ) : ""
                            ))
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </div>

            {poster && (
                <div className="modal-overlay" onClick={() => setPoster(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${poster.poster_path || poster.backdrop_path}`}
                            alt={poster.title}
                        />
                        <h2>{poster.title}</h2>
                        <p>Release Date: {poster.release_date}</p>
                        <p className="overview">{poster.overview?.split(" ").slice(0, 15).join(" ") + "..."}</p>
                        <button onClick={() => setPoster(null)}>Close</button>
                    </div>
                </div>
            )}


            {movie.length > 0 && (
                <div className="pagination">
                    <button onClick={previousPage} disabled={page === 1}>Previous Page</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={nextPage} disabled={page === totalPages}>Next Page</button>
                </div>
            )}
            <button className="scroll-top-btn" id="top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                {/* <a href="#top"> */}
                ⬆️
                {/* </a> */}
            </button>

        </>
    );
};

export default ApiTest;
