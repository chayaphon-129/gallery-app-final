import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/collections', {
          headers: {
            Authorization: `2i-a-K8ueoe7XNCPR47xpmzFnxSTLeiOnF4pIm-6QhM`
          }
        });
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections from Unsplash:", error);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div>
      {collections.map(collection => (
        <div key={collection.id}>
          <h3>{collection.title}</h3>
          <p>{collection.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Collections;
