
import React, { useState } from 'react';
import { useLinks } from '../hooks/useLinks';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import type { ShortLink } from '../types';
import Container from '../components/Container';

interface DashboardPageProps {
  onLogout: () => void;
}

const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0m-2.828-2.828a2 2 0 012.828 0l3 3a2 2 0 11-2.828 2.828m-4.243 4.243a2 2 0 010-2.828l3-3a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0z" clipRule="evenodd" /></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;


const LinkCard: React.FC<{ link: ShortLink, onDelete: (id: string) => void }> = ({ link, onDelete }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link.shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="bg-brand-gray p-4 rounded-lg border border-brand-light-gray flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
                <p className="text-brand-green truncate font-mono text-sm">{link.shortUrl}</p>
                <p className="text-gray-400 text-xs truncate mt-1">{link.originalUrl}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-center">
                    <p className="text-white font-semibold text-lg">{link.clicks}</p>
                    <p className="text-gray-400 text-xs">CLICKS</p>
                </div>
                 <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-brand-green transition-colors duration-200">
                    {copied ? 'Copied!' : <CopyIcon />}
                </button>
                 <button onClick={() => onDelete(link.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [newUrl, setNewUrl] = useState('');
  const { links, loading, addLink, deleteLink } = useLinks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.trim()) {
      try {
        new URL(newUrl); // Validate URL
        addLink(newUrl);
        setNewUrl('');
      } catch (_) {
        alert('Please enter a valid URL.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-text" style={{ background: 'radial-gradient(circle, #0a180a, #050a05 80%)' }}>
      <Header onLogout={onLogout} />
      <main>
        <Container>
            {/* Hero Section */}
            <div className="text-center py-16 md:py-24">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">The Modern Link Platform</h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Create, share, and track your short links with powerful analytics.
                </p>
            </div>
          
            {/* Link creation form */}
            <div className="mb-12">
                <div className="max-w-3xl mx-auto p-6 bg-brand-gray rounded-xl border border-brand-light-gray shadow-lg">
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                             <Input 
                                type="url" 
                                placeholder="https://your-long-url.com" 
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                icon={<LinkIcon />}
                                required
                            />
                        </div>
                        <Button type="submit" className="flex-shrink-0">
                            Shorten Link
                        </Button>
                    </form>
                </div>
            </div>

            {/* Links list */}
             <div className="space-y-4 max-w-4xl mx-auto pb-24">
                {loading ? (
                    <p className="text-center">Loading links...</p>
                ) : links.length > 0 ? (
                    links.map(link => <LinkCard key={link.id} link={link} onDelete={deleteLink} />)
                ) : (
                    <div className="text-center py-10 bg-brand-gray rounded-lg border border-brand-light-gray">
                        <p className="text-gray-400">No links yet. Create your first one!</p>
                    </div>
                )}
            </div>
        </Container>
      </main>
    </div>
  );
};

export default DashboardPage;
