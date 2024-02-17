import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faThumbsUp, faThumbsDown, faComments, faShare, faEllipsisH, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>
            <div className="sidebar-content">
                {/* Your sidebar content goes here */}
            </div>
        </div>
    );
};

const EmbedShorts = ({ datas }) => {
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const playerRefs = useRef([]);
    const [isApiLoaded, setApiLoaded] = useState(false);

    console.log('EmbedShorts data:', datas);
    console.log('Array.isArray(data)', Array.isArray(datas));

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';

            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                setApiLoaded(true);
            };
        } else {
            setApiLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isApiLoaded) {
            initYouTubePlayers();
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [isApiLoaded, datas]);

    useEffect(() => {
        scrollToFirstVideo();
    }, [datas]);

    const initYouTubePlayers = () => {
        playerRefs.current = datas.map((data, index) => {
            return new window.YT.Player(`player-${index}`, {
                height: '100%',
                width: '100%',
                videoId: data?.videoId,
                playerVars: {
                    autoplay: 0,
                },
                events: {
                    onReady: (event) => event.target.pauseVideo(),
                },
            });
        });
    };

    const scrollToFirstVideo = () => {
        if (datas && datas.length > 0) {
            const firstVideoElement = document.getElementById(`player-0`);
            if (firstVideoElement) {
                const rect = firstVideoElement.getBoundingClientRect();
                const elementCenter = (rect.top + rect.bottom) / 2;
                window.scrollBy(0, elementCenter - window.innerHeight / 2);
            }
        }
    };

    const handleScroll = () => {
        const playerElements = playerRefs.current;

        for (let i = 0; i < playerElements.length; i++) {
            if (playerElements[i] && typeof playerElements[i].playVideo === 'function') {
                const playerElement = playerElements[i].getIframe();
                const rect = playerElement.getBoundingClientRect();

                const elementCenter = (rect.top + rect.bottom) / 2;

                if (elementCenter >= 0 && elementCenter <= window.innerHeight) {
                    playerElements[i].playVideo();
                    if (currentPlaying !== i) {
                        setCurrentPlaying(i);
                    }
                } else {
                    playerElements[i].pauseVideo();
                }
            }
        }
    };

    if (!Array.isArray(datas)) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Sidebar />
            {datas.map((data, index) => {
                return (
                    <div key={index} id={`player-${index}`} className="video-container relative"></div>
                )
            })}
        </div>
    )
}

export default EmbedShorts;
