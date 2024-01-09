import React from 'react';
import { useBlogContext } from '../DataCollectLayer';
import EmbedShorts from '../components/EmbedShorts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComments, faShare, faEllipsisH, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const FirstPage = () => {
  const { data, error, alert, showAlert } = useBlogContext();


  return (

    <div className="flex h-screen">

      <div className="w-1/5 bg-black">
        <div className="text-white p-4 cursor-pointer">
          <span>YouTube</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-home mr-2"></i>
          <span>首頁</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-fire mr-2"></i>
          <span>Shorts</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-compass mr-2"></i>
          <span>探索頻道</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-subscriptions mr-2"></i>
          <span>訂閱內容</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-folder-open mr-2"></i>
          <span>媒體庫</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-history mr-2"></i>
          <span>觀看紀錄</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-clock mr-2"></i>
          <span>稍後觀看</span>
        </div>
        <div className="text-white p-4">
          <i className="fas fa-thumbs-up mr-2"></i>
          <span>喜歡的影片</span>
        </div>
      </div>

      <div className="w-4/5">
        <EmbedShorts datas={data} />

        <div className="relative">
          <img src="https://placehold.co/450x800"
            alt="A person singing into a microphone with headphones on, in a video player interface"
            className="video-container relative" />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <p>test 標題</p>
            <p>test圖示 - ごめんね / THE FIRST TAKE</p>
          </div>

          <div className="controls-container absolute bottom-0 right-0 p-4 text-black">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
              <span>1萬</span>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faThumbsDown} className="mr-2" />
              <span>不喜歡</span>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              <span>留言</span>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faShare} className="mr-2" />
              <span>分享</span>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faEllipsisH} className="mr-2" />
              <span>...</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faVolumeUp} className="mr-2" />
              <span>聲音</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FirstPage;