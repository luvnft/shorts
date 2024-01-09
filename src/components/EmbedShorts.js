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
     * isApiLoaded 判斷是否已加載成功
     * 1. 如果 YouTube API 已加載，初始化播放器
     * 2. 增加滾動的事件監聽
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
    const initYouTubePlayers = () => {
        playerRefs.current = datas.map((data, index) => {
            return new window.YT.Player(`player-${index}`, {
                height: '800',
                width: '450',
                videoId: data.videoId,
                events: {
                    onReady: (event) => event.target.pauseVideo(),
                },
            });
        });
    };

    /**
     * 1. 獲取第一個影片元素的DOM節點
     * 2. 獲取第一個影片元素的矩形區域信息（包括位置和尺寸）
     * 3. 計算影片元素的中心位置（相對於視窗）
     * 4. 計算需要滾動的距離，使影片元素的中心位於視窗的中央位置
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