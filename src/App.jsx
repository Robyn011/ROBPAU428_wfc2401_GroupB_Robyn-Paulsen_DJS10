import React, { useState, useEffect } from 'react';

// Main App component
function App() {
  // State to hold the fetched posts
  const [posts, setPosts] = useState([]);
  // State to hold any error that occurs during fetching
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch data from the API
    const fetchData = async () => {
      try {
        // Fetching posts from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        // Check if the response is not ok (status is not in the range 200-299)
        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        // Parsing the response data as JSON
        const data = await response.json();
        // Setting the fetched posts to the state
        setPosts(data);
      } catch (error) {
        // If an error occurs, set the error message to the state
        setError(error.message);
      }
    };

    // Calling the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {error ? ( // Conditional rendering based on whether there is an error
        <div>Error: {error}</div> // Display error message if there is an error
      ) : (
        posts.map((post, index) => ( // Map over the posts array to render each post
          <div key={post.id}> {/* Each post needs a unique key */}
            <h2>{`${index + 1}. ${post.title}`}</h2> {/* Display the post title with a numbered heading */}
            <p>{post.body}</p> {/* Display the post body */}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
