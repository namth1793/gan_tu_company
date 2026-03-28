'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaTimes, FaVideo } from 'react-icons/fa';
import Sidebar from '@/components/Sidebar';

export default function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/videos`)
      .then(r => r.json())
      .then(d => { if (d.success) setVideos(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getYoutubeId = (url) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleOpen = (video) => { setActiveVideo(video); document.body.style.overflow = 'hidden'; };
  const handleClose = () => { setActiveVideo(null); document.body.style.overflow = ''; };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 flex gap-6">
      <main className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 border-l-4 border-green-600 pl-3">Video</h1>
        <p className="text-gray-500 text-sm mb-6">Khám phá sản phẩm và máy móc qua video thực tế</p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl aspect-video animate-pulse" />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <FaVideo className="text-5xl mx-auto mb-3 opacity-30" />
            <p>Chưa có video nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map(video => (
              <div
                key={video.id}
                className="group relative rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-900"
                onClick={() => handleOpen(video)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.thumbnail_url || 'https://picsum.photos/640/360?random=90'}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-70"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <div className="w-14 h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <FaPlay className="text-green-600 text-xl ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white font-semibold text-sm line-clamp-2">{video.title}</p>
                  {video.description && <p className="text-gray-300 text-xs mt-1 line-clamp-1">{video.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Sidebar />

      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button onClick={handleClose} className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors">
              <FaTimes className="text-2xl" />
            </button>
            <div className="bg-black rounded-xl overflow-hidden aspect-video">
              {getYoutubeId(activeVideo.youtube_url) ? (
                <iframe
                  width="100%" height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeVideo.youtube_url)}?autoplay=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white"><FaVideo className="text-4xl" /></div>
              )}
            </div>
            <p className="text-white text-center mt-3 font-semibold">{activeVideo.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
