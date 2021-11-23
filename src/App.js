import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";

const App = () => {
  const [books, setBooks] = useState([]);
  const [formBook, setFormBook] = useState({
    id: 1,
    title: "",
    author: "",
    month: "",
    year: "",
    synopsis: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const getDataAPI = () => {
    axios
      .get(`http://localhost:3004/books`)
      .then((response) => {
        const responseAPI = response.data;
        setBooks(responseAPI);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  const postDataToAPI = () => {
    axios
      .post(`http://localhost:3004/books`, formBook)
      .then((response) => {
        console.log(response);
        getDataAPI();
        setFormBook({
          id: 1,
          title: "",
          author: "",
          month: "",
          year: "",
          synopsis: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putDataToAPI = () => {
    axios
      .put(`http://localhost:3004/books/${formBook.id}`, formBook)
      .then((response) => {
        console.log(response);
        getDataAPI();
        setFormBook({
          id: 1,
          title: "",
          author: "",
          month: "",
          year: "",
          synopsis: "",
        });
        setIsUpdate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormChange = (event) => {
    let formBookNew = { ...formBook };
    let timestamp = new Date().getTime();
    if (!isUpdate) {
      formBookNew["id"] = timestamp;
    }
    formBookNew[event.target.name] = event.target.value;
    setFormBook(formBookNew);
  };

  const handleUpdate = (data) => {
    setFormBook(data);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((response) => {
        console.log(response);
        getDataAPI();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkbox = document.getElementById("inputBookIsComplete");
    if (checkbox.checked) {
      if (isUpdate) {
        putDataToAPI();
      } else {
        postDataToAPI();
      }
    } else {
      alert("Please check the checbox");
    }
  };

  return (
    <div className="wrapper">
      <header className="header">
        <nav className="nav container">
          <p className="nav-title">GedeBooks</p>
        </nav>
      </header>
      <section>
        <div className="home-container container">
          <div className="home-input">
            <h1 className="home-input-title">Books</h1>
            <p className="home-input-subtitle">Insert the book data below.</p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="i.e. Harry Potter and The Chamber of Secretsi.e. Harry Potter and The Chamber of Secrets"
              onChange={(e) => handleFormChange(e)}
              value={formBook.title}
            ></input>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              placeholder="i.e. J. K. Rowling"
              onChange={(e) => handleFormChange(e)}
              value={formBook.author}
            ></input>
            <label htmlFor="date">Published</label>
            <div className="input-inline">
              <select
                className="form-month"
                name="month"
                onChange={(e) => handleFormChange(e)}
                value={formBook.month}
              >
                <option>Month</option>
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sept">Sept</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
              <select
                className="form-year"
                name="year"
                onChange={(e) => handleFormChange(e)}
                value={formBook.year}
              >
                <option>Year</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
              </select>
            </div>
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              name="synopsis"
              id="synopsis"
              cols="80"
              rows="5"
              placeholder="Enter the synopsis of the book here"
              onChange={(e) => handleFormChange(e)}
              value={formBook.synopsis}
            ></textarea>
            <div className="input-inline">
              <input id="inputBookIsComplete" type="checkbox" />
              <label htmlFor="inputBookIsComplete">
                This book is eligible to be added to the list
              </label>
            </div>
            <button className="btn-submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </div>
          <div className="home-output">
            <h1 className="home-output-title">Book List</h1>
            {books.map((book) => (
              <Card
                key={book.id}
                book={book}
                deleteBook={handleDelete}
                updateBook={handleUpdate}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
