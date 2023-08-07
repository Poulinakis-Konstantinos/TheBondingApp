import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = ({ username }) => {
  const [books, setBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);

  const fetchMyBooks = () => {
    axios
      .get('http://localhost:8080/api/getMyBooks')
      .then((response) => {
        const booksData = response.data;
        setBooks(booksData);
        fetchAvailableBooks(booksData); // Pass the fetched books to fetchAvailableBooks
      })
      .catch((error) => {
        console.error('Error fetching user books:', error);
      });
  };

  const fetchAvailableBooks = (myBooks) => { // Accept myBooks as a parameter
    axios
      .get('http://localhost:8080/api/getAllBooks')
      .then((response) => {
        const allBooksData = response.data;
        const booksNotOwned = allBooksData.filter(
          (book) => !myBooks.some((myBook) => myBook.id === book.id)
        );
        setAvailableBooks(booksNotOwned);
      })
      .catch((error) => {
        console.error('Error fetching available books:', error);
      });
  };

  const requestAccess = (bookIds) => {
    axios
      .post('http://localhost:8080/api/users/addToMyBooks', bookIds)
      .then((response) => {
        console.log('Access requested successfully:', response.data);
        fetchMyBooks();
        fetchAvailableBooks(books); // Pass the books state to update available books
      })
      .catch((error) => {
        console.error('Error requesting access:', error);
      });
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Your Account</h2>
          <p className="card-text">Username: {username}</p>
          <h3 className="card-subtitle mb-2 text-muted">Books you have access to:</h3>
          <ul className="list-group">
            {books.map((book) => (
              <li key={book.id} className="list-group-item">
                {book.bookName}
              </li>
            ))}
          </ul>
          <h3 className="card-subtitle mb-2 mt-4 text-muted">Available Books:</h3>
          <ul className="list-group">
            {availableBooks.map((book) => (
              <li key={book.id} className="list-group-item">
                {book.bookName}
                <button
                  className="btn btn-sm btn-primary float-end"
                  onClick={() => requestAccess([book.id])}
                >
                  Request Access
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default User;
