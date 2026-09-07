'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

type MediaRevealProps = {
  poster: string;
  videoSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function MediaReveal({
  poster,
  videoSrc,
  alt,
  className = '',
  priority = false,
}: MediaRevealProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (!videoSrc || videoFailed) return;

    const video = videoRef.current;
    if (!video) return;

    ctxRef.current = gsap.context(() => {
      const play = async () => {
        try {
          await video.play();
        } catch {
          // autoplay bloqueado, mantém o poster visível
        }
      };

      const crossfade = () => {
        if (videoRef.current && imageRef.current) {
          gsap.to(videoRef.current, {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          });
          gsap.to(imageRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      };

      const onCanPlayThrough = () => {
        play();
        crossfade();
      };

      const onLoadedData = () => {
        play();
        crossfade();
      };

      const onError = () => {
        setVideoFailed(true);
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      };

      const timeout = window.setTimeout(() => {
        play();
        crossfade();
      }, 3000);

      video.addEventListener('canplaythrough', onCanPlayThrough);
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('error', onError);

      return () => {
        window.clearTimeout(timeout);
        video.removeEventListener('canplaythrough', onCanPlayThrough);
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('error', onError);
      };
    });

    return () => {
      ctxRef.current?.revert();
    };
  }, [videoSrc, videoFailed]);

  const showVideo = videoSrc && !videoFailed;

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image
        ref={imageRef}
        src={poster}
        alt={alt}
        fill
        priority={priority}
        className="absolute inset-0 object-cover"
      />
      {showVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-0"
          onError={() => setVideoFailed(true)}
        />
      )}
    </div>
  );
}
