'use client';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlay, FaTimes, FaVideo } from 'react-icons/fa';

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/videos`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setVideos(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getYoutubeId = (url) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleOpen = (video) => {
    setActiveVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setActiveVideo(null);
    document.body.style.overflow = '';
  };

  if (!loading && videos.length === 0) return null;

  return (
    <>
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1 h-6 bg-primary-600 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Video giới thiệu</h2>
              </div>
              <p className="text-gray-500 text-sm ml-3">Khám phá sản phẩm qua video thực tế</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl aspect-video animate-pulse"></div>
              ))}
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
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <div className="w-14 h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <FaPlay className="text-primary-600 text-xl ml-1" />
                    </div>
                  </div>
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-white font-semibold text-sm line-clamp-2">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
            <div className="bg-black rounded-xl overflow-hidden aspect-video">
              {getYoutubeId(activeVideo.youtube_url) ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeVideo.youtube_url)}?autoplay=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <FaVideo className="text-4xl" />
                </div>
              )}
            </div>
            <p className="text-white text-center mt-3 font-semibold">{activeVideo.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
