"use client";

import { useEffect, useRef, useState } from "react";

const FADE_MS = 200;

/**
 * "Watch demo" trigger + lightbox. No-JS default: a real anchor straight to
 * the video file (works with JS off, per the brief). With JS: the click is
 * intercepted and opens a native <dialog> instead, which supplies focus
 * trapping and Escape-to-close for free. The <video> gets no <source> at all
 * until the first open, so zero video bytes are ever fetched by page load or
 * scroll — only by this exact click.
 */
export default function VideoModal({
  label,
  ariaLabel,
  videoSrc,
  videoSrcWebm,
  posterSrc,
}: {
  label: string;
  ariaLabel: string;
  videoSrc: string;
  videoSrcWebm?: string;
  posterSrc: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const [hasOpened, setHasOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fires after the <source> tags have actually committed to the DOM (an
  // effect, not requestAnimationFrame — rAF is throttled on background tabs
  // and this needs to run reliably regardless of paint timing).
  useEffect(() => {
    if (!hasOpened) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [hasOpened]);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setHasOpened(true);
    dialog.showModal();
    requestAnimationFrame(() => setIsOpen(true));
  };

  const close = () => {
    setIsOpen(false);
    videoRef.current?.pause();
    window.setTimeout(() => {
      dialogRef.current?.close();
      triggerRef.current?.focus();
    }, FADE_MS);
  };

  return (
    <>
      <a
        ref={triggerRef}
        href={videoSrc}
        aria-label={ariaLabel}
        className="work-valley__link"
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
      >
        {label} <span aria-hidden="true">&rarr;</span>
      </a>

      <dialog
        ref={dialogRef}
        aria-label={ariaLabel}
        className={`work-valley__dialog ${isOpen ? "is-open" : ""}`}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onClose={() => {
          setIsOpen(false);
          videoRef.current?.pause();
          triggerRef.current?.focus();
        }}
      >
        <div className="work-valley__dialog-inner">
          <button
            type="button"
            className="work-valley__dialog-close"
            aria-label="Close"
            onClick={close}
          >
            &times;
          </button>
          <video
            ref={videoRef}
            poster={posterSrc}
            preload="none"
            muted
            loop
            playsInline
            className="work-valley__dialog-video"
          >
            {hasOpened && videoSrcWebm ? <source src={videoSrcWebm} type="video/webm" /> : null}
            {hasOpened ? <source src={videoSrc} type="video/mp4" /> : null}
          </video>
        </div>
      </dialog>
    </>
  );
}
