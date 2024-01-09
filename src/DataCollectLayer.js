import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import items from "./data/shortsLIstData";

const PageContext = React.createContext();

const DataCollectLayer = ({ children }) => {
    const yt_url = process.env.REACT_APP_YOUTUBE_URL;
    const base_url = process.env.REACT_APP_YOUTUBE_BASE_URL;
    const channel_Id = process.env.REACT_APP_CHANNEL_ID;
    const youtube_Api_Key = process.env.REACT_APP_YOUTUBE_APIKEY;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({
        show: false,
        msg: '',
        type: '',
    });

    /**
     * 如果有需要Show Alert 可以從這裡開始 :)
     * @param {*} show 
     * @param {*} msg 
     * @param {*} type 
     */
    const showAlert = (show = false, msg = '', type = '') => {
        setAlert({ show, msg, type });
    };

    const getShortVideos = async (base_url, channelId, maxResults, YOUTUBE_API_KEY) => {
        try {
            const response = await axios.get(`${base_url}/search`, {
                params: {
                    part: 'snippet',
                    channelId: channelId,
                    maxResults: maxResults,
                    type: 'short',
                    key: YOUTUBE_API_KEY,
                    order: 'date',
                },
            });

            console.log('response.data:', response.data);

            const videos = response.data.items.map(item => {
                return {
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                };
            });

            setData(videos);
        } catch (error) {
            console.error('Error fetching data:', JSON.stringify(error, null, 2));
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // getShortVideos(base_url, channel_Id, 2, youtube_Api_Key); // 當使用到API時才開啟
        // console.log('videos:', datas);  
    }, []);

    /**
     * 因為API KEY 配額滿了，所以先使用固定資料。
     * 1. 模擬loading 1 seconds
     */
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        setData(items);

        return () => clearTimeout(timer);
    }, []);

    if (!data) return <div>Loading...</div>;
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <PageContext.Provider
            value={{
                data,
                loading,
                error,
                alert,
                showAlert,
            }}
        >
            {children}
        </PageContext.Provider>
    );
}

const useBlogContext = () => {
    return useContext(PageContext);
};

export { DataCollectLayer, useBlogContext };
