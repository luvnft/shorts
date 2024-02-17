import React, { useState } from 'react';
import { useBlogContext } from '../DataCollectLayer';
import EmbedShorts from '../components/EmbedShorts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faMessage, faShare, faEllipsisH, faCircle } from '@fortawesome/free-solid-svg-icons';
import './style.css'; // Assuming you have a separate CSS file for styling

const FirstPage = () => {
  const { data, error, alert, showAlert } = useBlogContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container">
      <div className={`fixed-content ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="menu-toggle" onClick={toggleMenu}>
          <span>Menu</span>
        </div>
        <div className="menu-items">
          <div className="text-white p-4 cursor-pointer">
            <span>YouTube</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-home mr-2"></i>
            <span>Home</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-fire mr-2"></i>
            <span>Shorts</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-compass mr-2"></i>
            <span>Explore channels</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-subscriptions mr-2"></i>
            <span>Subscriptions</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-folder-open mr-2"></i>
            <span>Library</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-history mr-2"></i>
            <span>History</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-clock mr-2"></i>
            <span>Watch later</span>
          </div>
          <div className="text-white p-4">
            <i className="fas fa-thumbs-up mr-2"></i>
            <span>Liked videos</span>
          </div>
        </div>
      </div>

      <div className="scrollable-content">
        <EmbedShorts datas={data} />

        <div className="relative">
          <img src="https://placehold.co/450x800"
            alt="A person singing into a microphone with headphones on, in a video player interface"
            className="video-container relative" />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <p>Test Title</p>
            <p>Icon Test - ごめんね / THE FIRST TAKE</p>
          </div>

          <div className="controls-container absolute bottom-0 right-0 p-4 text-black">
            <div className="flex items-center flex-col mb-2">
              <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
              <span className="mt-1">10,000</span>
            </div>
            <div className="flex items-center flex-col mb-2">
              <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
              <span className="mt-1">Dislike</span>
            </div>
            <div className="flex items-center flex-col mb-2">
              <FontAwesomeIcon icon={faMessage} className="mr-2" />
              <span className="mt-1">Comment</span>
            </div>
            <div className="flex items-center flex-col mb-2">
              <FontAwesomeIcon icon={faShare} className="mr-2" />
              <span className="mt-1">Share</span>
            </div>
            <div className="flex items-center flex-col mb-2">
              <FontAwesomeIcon icon={faEllipsisH} className="mr-2" />
              <span className="mt-1"></span>
            </div>
            <div className="flex items-center flex-col">
              <div className="rounded-full bg-gray-400 w-10 h-10 flex items-center justify-center">
                <FontAwesomeIcon icon={faCircle} className="text-white" />
              </div>
              <span className="mt-1"></span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default FirstPage;
