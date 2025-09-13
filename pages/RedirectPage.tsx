
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLinks } from '../hooks/useLinks';

const RedirectPage: React.FC = () => {
  const { shortId } = useParams<{ shortId: string }>();
  const { getLinkById, incrementClickCount } = useLinks();
  const [countdown, setCountdown] = useState<number>(5);
  const [destination, setDestination] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shortId) {
      const link = getLinkById(shortId);
      if (link) {
        incrementClickCount(shortId);
        setDestination(link.originalUrl);
      } else {
        setError("This link doesn't exist or has been removed.");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shortId, getLinkById]); // Do not add incrementClickCount here to avoid loop

  useEffect(() => {
    if (destination) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        window.location.href = destination;
      }
    }
  }, [countdown, destination]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4" style={{ background: 'radial-gradient(circle, #0a180a, #050a05 70%)' }}>
      <div className="w-full max-w-md p-8 text-center bg-brand-gray rounded-2xl border border-brand-light-gray shadow-2xl shadow-black/30">
        {error ? (
          <>
            <h1 className="text-2xl font-bold text-red-500 mb-4">Link Not Found</h1>
            <p className="text-gray-300">{error}</p>
          </>
        ) : destination ? (
          <>
            <h1 className="text-2xl font-bold text-white mb-4">Redirecting...</h1>
            <p className="text-gray-300 mb-6">You will be redirected in</p>
            <div className="text-6xl font-bold text-brand-green mb-6">{countdown}</div>
            <p className="text-xs text-gray-500 break-all">to: {destination}</p>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-white">Loading link...</h1>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;
