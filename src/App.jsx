import React, { useState, useEffect } from 'react';

function App() {
  // State variables to store fetched posts and error messages
  const [posts, setPosts] = useState([]); // Initialize posts state as an empty array
  const [error, setError] = useState(null); // Initialize error state as null

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        // Fetch posts data from JSONPlaceholder API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if response is ok; if not, throw an error
        if (!response.ok) {
          throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        
        // Parse response data to JSON format
        const data = await response.json();
        
        // Update posts state with fetched data
        setPosts(data);
      } catch (error) {
        // Catch any errors that occur during fetching and update error state
        setError(error.message);
      }
    };

    // Call fetchData function when component mounts (empty dependency array ensures it runs only once)
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only on component mount

  return (
    <div>
      {error ? ( // Conditional rendering: display error message if error state is not null
        <div>Error: {error}</div>
      ) : (
        posts.map((post) => ( // Map through posts array and render each post as a div
          <div key={post.id}>
            <h2>{post.title}</h2> {/* Render post title */}
            <p>{post.body}</p> {/* Render post body */}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
