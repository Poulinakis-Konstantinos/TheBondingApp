import React, { useEffect, useState } from 'react';
import axios from 'axios';



const User = ({ username }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
      // Function to fetch the user's books
      const fetchMyBooks = () => {
        axios
          .get('http://localhost:8080/api/getMyBooks')
          .then((response) => {
            const booksData = response.data;
            setBooks(booksData);
            console.log(booksData);
          })
          .catch((error) => {
            console.error('Error fetching user books:', error);
          });
      };
  
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
        </div>
      </div>
    </div>
  );
};

export default User;
