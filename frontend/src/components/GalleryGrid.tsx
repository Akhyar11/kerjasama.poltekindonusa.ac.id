"use client";

import { useState } from "react";
import { PageMedia } from "@/lib/types";
import { getImageUrl } from "@/lib/api";

interface Props {
  mediaItems: PageMedia[];
}

export default function GalleryGrid({ mediaItems }: Props) {
  const [selectedMedia, setSelectedMedia] = useState<PageMedia | null>(null);

  return (
    <>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          grid-auto-rows: 250px;
        }
        
        .gallery-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-item:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          z-index: 10;
        }
        
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-item:hover img {
          transform: scale(1.08);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-caption {
          color: white;
          font-weight: 600;
          font-size: 1.05rem;
          line-height: 1.4;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .play-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: rgba(255, 0, 0, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
          opacity: 1;
          pointer-events: auto;
        }

        .lightbox-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: white;
          color: black;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: bold;
          transition: transform 0.2s ease;
          z-index: 10000;
        }
        
        .lightbox-close:hover {
          transform: scale(1.1);
        }

        .lightbox-content {
          max-width: 90vw;
          max-height: 90vh;
          position: relative;
        }
        
        .lightbox-content img {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
        }
        
        .lightbox-content iframe {
          width: 80vw;
          height: 45vw;
          max-height: 80vh;
          border-radius: 12px;
          border: none;
        }

        .lightbox-caption {
          color: white;
          text-align: center;
          margin-top: 1rem;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="gallery-grid">
        {mediaItems.map((media) => {
          // Extraksi thumbnail YouTube jika tipe youtube
          let thumbnailUrl = "";
          if (media.type === "youtube" && media.youtube_url) {
            const videoIdMatch = media.youtube_url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
            const videoId = videoIdMatch ? videoIdMatch[1] : null;
            if (videoId) thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }

          return (
            <div 
              key={media.id} 
              className="gallery-item"
              onClick={() => setSelectedMedia(media)}
            >
              {media.type === "image" && media.image_path && (
                <img src={getImageUrl(media.image_path)} alt={media.caption || "Gallery image"} loading="lazy" />
              )}
              
              {media.type === "youtube" && (
                <>
                  <img src={thumbnailUrl || "/placeholder.jpg"} alt={media.caption || "YouTube Video"} loading="lazy" />
                  <div className="play-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </>
              )}
              
              {media.caption && (
                <div className="gallery-overlay">
                  <div className="gallery-caption">{media.caption}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox / Modal */}
      <div className={`lightbox ${selectedMedia ? 'active' : ''}`} onClick={() => setSelectedMedia(null)}>
        <div className="lightbox-close" onClick={(e) => { e.stopPropagation(); setSelectedMedia(null); }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
        
        {selectedMedia && (
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "image" && selectedMedia.image_path && (
              <img src={getImageUrl(selectedMedia.image_path)} alt={selectedMedia.caption || "Image full screen"} />
            )}
            
            {selectedMedia.type === "youtube" && selectedMedia.youtube_url && (
              <iframe 
                src={selectedMedia.youtube_url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/") + "?autoplay=1"} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
            )}
            
            {selectedMedia.caption && (
              <div className="lightbox-caption">{selectedMedia.caption}</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
