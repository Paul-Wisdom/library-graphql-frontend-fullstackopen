import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const { data, loading } = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (data && data.allBooks) {
      const allGenres = data.allBooks.flatMap(book => book.genres);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(uniqueGenres);
      setFilteredBooks(data.allBooks);  // default view is all books
    }
  }, [data]);

  useEffect(() => {
    if (!data || !data.allBooks) return;

    if (selectedGenre) {
      const filtered = data.allBooks.filter(book =>
        book.genres.includes(selectedGenre)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(data.allBooks);
    }
  }, [selectedGenre, data]);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>loading books data...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre? <p>in pattern <b>{selectedGenre}</b></p>: <p>all books</p>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1em" }}>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
