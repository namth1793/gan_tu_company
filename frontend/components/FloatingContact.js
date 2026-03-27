'use client';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-3">

      {/* Zalo */}
      <div className="float-btn relative group">
        <div className="pulse-ring bg-blue-500 opacity-50"></div>
        <a
          href="https://zalo.me/0902487928"
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Chat Zalo"
        >
          <svg viewBox="0 0 50 50" className="w-7 h-7 fill-white">
            <path d="M25 2C12.3 2 2 11.6 2 23.4c0 6.4 3.1 12.2 8 16L8 44l7.2-3.5c3 1 6.3 1.6 9.8 1.6C37.7 42.1 48 32.5 48 20.7S37.7 2 25 2zm-8.4 18.5H14v-8.3h2.6v8.3zm4.6 0h-2.5v-8.3h2.5v3.3l3-3.3h3.1l-3.5 3.8 3.8 4.5h-3.1l-3.3-3.9v3.9zm11.4 0h-6.1v-8.3h2.5v6h3.6v2.3z"/>
          </svg>
        </a>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat Zalo
        </span>
      </div>

      {/* Messenger */}
      <div className="float-btn relative group">
        <a
          href="https://m.me/gantu"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}
          title="Chat Messenger"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.201V22l3.354-1.845c.895.248 1.843.381 2.96.381 5.523 0 10-4.145 10-9.293C22 6.145 17.523 2 12 2zm1.008 12.508l-2.55-2.718-4.976 2.718 5.474-5.808 2.61 2.718 4.916-2.718-5.474 5.808z"/>
          </svg>
        </a>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Messenger
        </span>
      </div>

      {/* Phone */}
      <div className="float-btn relative group">
        <div className="pulse-ring bg-[#271C1C] opacity-50"></div>
        <a
          href="tel:0902487928"
          className="relative w-12 h-12 rounded-full bg-[#271C1C] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Gọi ngay"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          0902 487 928
        </span>
      </div>

    </div>
  );
}
