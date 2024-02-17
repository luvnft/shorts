import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComments, faShare, faEllipsisH, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const EmbedShorts = ({ datas }) => {
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const playerRefs = useRef([]);
    const [isApiLoaded, setApiLoaded] = useState(false);

    console.log('EmbedShorts data:', datas);
    console.log('Array.isArray(data)', Array.isArray(datas));

    /**
     * 檢查是否已經加載 YouTube API
     * 1. 創建一個 script 元素
     * 2. 將 script 元素添加到頁面上
     * 3. isApiLoaded 設置當腳本加載完畢時的回調函數
     */
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

    /**
"isApiLoaded Determine whether loading is successful
1. If the YouTube API has been loaded, initialize the player
2. Add scrolling event listener"
     */
    useEffect(() => {
        if (isApiLoaded) {
            initYouTubePlayers();
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [isApiLoaded, datas]);

    /**
     * 確保第一個影片初始在視窗中心
     */
    useEffect(() => {
        scrollToFirstVideo();
    }, [datas]);

    /**
     * 初始化 YouTube 播放器
     */
    const initYouTubePlayers = () =&gt; {
  playerRefs.current = datas.map((data, index) =&gt; {
    return new window.YT.Player(`player-${index}`, {
      height: '100%',
      width: '100%',
      videoId: data.videoId,
      playerVars: {
        // Disable autoplay on mobile devices
        autoplay: 0,
      },
      events: {
        onReady: (event) =&gt; event.target.pauseVideo(),
      },
    });
  });
};

    /**
     * 1. Obtain the DOM node of the first video element.
       2. Get the rectangular area information (including position and size) of the first video element.
       3. Calculate the center position of the video element (relative to the viewport).
       4. Calculate the distance needed to scroll to center the video element within the viewport.
     */
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

    /**
     *  處理滾動的邏輯
     * 
     *  1. 檢查視頻是否在視窗中可見
     *      if   如果當前視頻在視窗中，則播放該視頻
     *      else 如果當前視頻不在視窗中，則暫停該視頻 
     *  2. 計算元素中心點，並判斷滾動到特定點時，是否要播放影片。
     */
    const handleScroll = () => {
        const playerElements = playerRefs.current;

        for (let i = 0; i < playerElements.length; i++) {
            if (playerElements[i] && typeof playerElements[i].playVideo === 'function') {
                const playerElement = playerElements[i].getIframe();
                const rect = playerElement.getBoundingClientRect();

                const elementCenter = (rect.top + rect.bottom) / 2;

                // if (rect.top >= 0 && rect.bottom <= window.innerHeight) { 
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
            {datas.map((data, index) => {
                return (
                    <div key={index} id={`player-${index}`} className="video-container relative"></div> 
                )
            })}
        </div>
    )
}

export default EmbedShorts;
