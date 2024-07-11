import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Highlight from 'react-highlight';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'highlight.js/styles/default.css';
import './CodeBlock.css';
const socket = io(import.meta.env.VITE_BACKEND_URL);

function CodeBlock() {
  const { id } = useParams();
  const [codeBlock, setCodeBlock] = useState(null);
  const [code, setCode] = useState('');
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    // Fetch the code block data from the server
    const fetchCodeBlock = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/codeblocks/${id}`);
        const data = response.data;
        setCodeBlock(data);
        setCode(data.code);
      } catch (error) {
        console.error("There was an error fetching the code block!", error);
      }
    };

    fetchCodeBlock();

    // Check if the user has visited this code block before (using cookies)
    const visitedFlag = Cookies.get(`visited_${id}`);
    if (visitedFlag) {
      setVisited(true);
    } else {
      Cookies.set(`visited_${id}`, 'true', { expires: 1 }); // Set cookie to mark this code block as visited
      setVisited(false);
    }

    // Join the socket room for real-time updates
    socket.emit('join', id);

    // Handle real-time code updates
    socket.on('codeUpdate', (updatedCode) => {
      setCode(updatedCode);
    });

    // Clean up socket.io event 
    return () => {
      socket.off('codeUpdate');
    };
  }, [id]);


  const handleCodeChange = (e) => {
    const updatedCode = e.target.value;
    setCode(updatedCode);
    socket.emit('codeChange', { codeBlockId: id, code: updatedCode });
  };

  // Function for testing purposes
  const deleteCookies = () => {
    Cookies.remove(`visited_${id}`);
    setVisited(false);
  };

  // Render loading message while code block data is being fetched
  if (!codeBlock) return <div>Loading...</div>;

  return (
    <div className="codeblock-container">
      <h2 className="codeblock-title">{codeBlock.title}</h2>
      <button className="reset-visit-button" onClick={deleteCookies}>Mentor mode </button>
      {visited ? (
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="code-editor"
         
        />
      ) : (
        <Highlight className="javascript code-highlight">
          {code}
        </Highlight>
      )}
    </div>
  );
};

export default CodeBlock;
