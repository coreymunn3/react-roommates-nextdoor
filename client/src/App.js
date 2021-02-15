import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // sample useEffect to show how you can asyncronously pull data from the server
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/posts');
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>This is the React App</h1>
    </div>
  );
};

export default App;
