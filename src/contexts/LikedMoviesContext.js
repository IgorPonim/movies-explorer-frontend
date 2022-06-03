import React from "react";

export const LikedMoviesContext = React.createContext(
    {
        LikedMovies: [],
        updateLikedMovies: () => { },
        isLoading: false
    }
);

