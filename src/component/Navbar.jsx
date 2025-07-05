import { useState } from "react";
import "./style.css";
import ApiTest from "./ApiTest";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [submittedTerm, setSubmittedTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmittedTerm(searchTerm);
        console.log("Searching for:", searchTerm);
        setSearchTerm("")
    };

    return (
        <>
            <div className="Navbar">
                <h1>Movie posters</h1>
                <div>
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
            </div>
            <ApiTest movie={submittedTerm} />
        </>
    );
};

export default Navbar;
