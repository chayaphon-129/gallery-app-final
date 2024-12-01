import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Masonry from 'react-masonry-css';
import './UnsplashGallery.css';

Modal.setAppElement('#root');

const UnsplashGallery = ({ onLogout }) => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/?client_id=2i-a-K8ueoe7XNCPR47xpmzFnxSTLeiOnF4pIm-6QhM&page=${currentPage}&per_page=28`);
        setPhotos(response.data);
      } catch (error) {
        console.error("Error fetching photos from Unsplash:", error);
      }
    };

    const searchPhotos = async (query) => {
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&page=${currentPage}&per_page=28&client_id=2i-a-K8ueoe7XNCPR47xpmzFnxSTLeiOnF4pIm-6QhM`);
        setPhotos(response.data.results);
      } catch (error) {
        console.error("Error searching photos from Unsplash:", error);
      }
    };

    if (isSearching) {
      searchPhotos(query);
    } else {
      fetchPhotos();
    }
  }, [currentPage, isSearching, query]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setIsSearching(true);
    setCurrentPage(1); // Reset page to 1 when starting a new search
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="gallery-container dark-theme">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search photos..."
          className="search-input"
        />
        <button type="submit" className="search-button">Theme</button>
      </form>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="photos-grid"
        columnClassName="photos-grid_column"
      >
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            <img
              src={photo.urls.small}
              alt={photo.description}
              className="photo"
              onClick={() => openModal(photo)}
            />
          </div>
        ))}
      </Masonry>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="page-button">Previous</button>
        <button onClick={handleNextPage} className="page-button">Next</button>
        <button onClick={handleLogout} className="page-button">Close</button>
      </div>

      {selectedPhoto && (
        <Modal
          isOpen={!!selectedPhoto}
          onRequestClose={closeModal}
          contentLabel="Photo Modal"
          className="photo-modal"
          overlayClassName="photo-modal-overlay"
        >
          <div className="modal-content">
            <img src={selectedPhoto.urls.regular} alt={selectedPhoto.description} className="modal-photo" />
            <button onClick={closeModal} className="close-button">Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UnsplashGallery;