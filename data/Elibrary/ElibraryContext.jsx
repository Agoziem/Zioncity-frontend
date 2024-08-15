"use client";
import React, { createContext, useEffect, useState } from "react";

const ElibraryContext = createContext();

const ElibraryContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState({});

  // the subjects and classes will be fetched from the admin context
  // fetch all books and paginated
  // fetch book by ID
  // fetch books by class
  // fetch book by subject
  // search books by title, author, subject, class, category

  // fetch all videos
  // fetch video by ID
  // fetch videos by class
  // fetch video by subject
  // search videos by title, author, subject, class, category

  return (
    <ElibraryContext.Provider
      value={{
        books,
        setBooks,
        book,
        setBook,
        videos,
        setVideos,
        video,
        setVideo
      }}
    >
      {children}
    </ElibraryContext.Provider>
  );
};
const useElibraryContext = () => React.useContext(ElibraryContext);

export { useElibraryContext, ElibraryContextProvider };
