import React, { useState, useEffect } from "react";
import User from "./user";
import "./styles.css";
function GitHubProfileFinder() {
  const [userName, setUserName] = useState("Puka-jpg");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchGitHubUserData() {
    setLoading(true);
    const response = await fetch(`https://api.github.com/users/${userName}`);

    const data = await response.json();
    if (data) {
      setUserData(data);
      setLoading(false);
      setUserName("");
    }

    console.log(data);
  }

  function handleSubmit() {
    fetchGitHubUserData();
  }

  useEffect(() => {
    fetchGitHubUserData();
  }, []);

  if (loading) {
    return <h1>Loading User Profile</h1>;
  }
  return (
    <div className="github-profile-finder-container">
      <div className="input-wrapper">
        <input
          type="text"
          name="search-by-username"
          placeholder="Search GitHub Username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
      {userData !== null ? <User user={userData} /> : null}
    </div>
  );
}

export default GitHubProfileFinder;
