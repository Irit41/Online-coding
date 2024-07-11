import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Lobby.css';
import axios from 'axios';

function Lobby() {
  const [codeblocks, setCodeblocks] = useState([]);

  // Fetch code blocks from the server
  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/codeblocks`);
        setCodeblocks(response.data); // Set state with fetched data
      } catch (error) {
        console.error("There was an error fetching the codeblocks!", error);
      }
    };

    fetchCodeBlocks();
  }, []);

  return (
    <div>
      <h1>Choose code block</h1>
      <ul >
        {codeblocks.map(block => (
          <li className='code-block' key={block._id}>
            <Link to={`/codeblock/${block._id}`}>{block.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lobby;