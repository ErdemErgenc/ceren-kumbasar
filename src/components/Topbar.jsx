import React, { useMemo } from 'react';

export default function Topbar() {
  const todayFormatted = useMemo(() => {
    return (
      'İstanbul · ' +
      new Date().toLocaleDateString('tr-TR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  }, []);

  return (
    <div className="topbar">
      <div className="wrap">
        <span className="mono" id="today">
          {todayFormatted}
        </span>
        <span className="mono hide-m">Sayı 01 · Kişisel Yayın</span>
        <span className="mono">Strateji · Şehir · İletişim</span>
      </div>
    </div>
  );
}

