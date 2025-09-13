import { useState, useCallback, useEffect } from 'react';
import type { ShortLink } from '../types';

const STORAGE_KEY = 'aniw_link_short_links';

const generateShortId = (length = 6): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};


export const useLinks = () => {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const storedLinks = localStorage.getItem(STORAGE_KEY);
      if (storedLinks) {
        setLinks(JSON.parse(storedLinks));
      }
    } catch (error) {
      console.error("Failed to load links from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveLinks = useCallback((newLinks: ShortLink[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLinks));
      setLinks(newLinks);
    } catch (error) {
      console.error("Failed to save links to localStorage", error);
    }
  }, []);

  const addLink = useCallback((originalUrl: string): ShortLink => {
    const fullShortUrl = `${window.location.origin}${window.location.pathname}#/${generateShortId()}`;
    const newLink: ShortLink = {
      id: fullShortUrl.split('/').pop()!,
      originalUrl,
      shortUrl: fullShortUrl,
      clicks: 0,
      createdAt: new Date().toISOString(),
    };
    const updatedLinks = [newLink, ...links];
    saveLinks(updatedLinks);
    return newLink;
  }, [links, saveLinks]);

  const getLinkById = useCallback((id: string): ShortLink | undefined => {
    return links.find(link => link.id === id);
  }, [links]);

  const incrementClickCount = useCallback((id: string) => {
    const updatedLinks = links.map(link => 
      link.id === id ? { ...link, clicks: link.clicks + 1 } : link
    );
    saveLinks(updatedLinks);
  }, [links, saveLinks]);
  
  const deleteLink = useCallback((id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    saveLinks(updatedLinks);
  }, [links, saveLinks]);


  return { links, loading, addLink, getLinkById, incrementClickCount, deleteLink };
};