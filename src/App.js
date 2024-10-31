import axios from "axios";
import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://randomuser.me/api?results=10")
      .then(response => setUsers(response.data.results))
      .catch(error => console.error("Veriler yüklenemedi", error));
  }, []);

  const filteredUsers = users.filter(user =>
    `${user.name.first} ${user.name.last}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Kullanıcı Listesi</h1>
      <input
        type="text"
        placeholder=" İsim Giriniz.."
        className="search-input"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.login.uuid} className="user-list-item">
            <img
              src={user.picture.thumbnail}
              alt={`${user.name.first} ${user.name.last}`}
              className="user-image"
            />
            <div>
              <span className="user-name">
                {user.name.first} {user.name.last}
              </span>
              <div className="user-title">{user.name.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
