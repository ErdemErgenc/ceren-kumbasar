import React from 'react';
import { ARCHIVE } from '../data/portfolioData';

export default function ArchiveSection() {
  return (
    <section id="arsiv" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-label reveal">
          <span className="mono">Bölüm 02</span>
          <h2>Arşiv</h2>
        </div>
        <div className="archive">
          {ARCHIVE.map((entry, index) => (
            <article
              key={index}
              className={`entry reveal ${entry.hl ? 'hl' : ''}`}
            >
              <div className={`yr ${entry.isPeriodText ? 't' : ''}`}>
                {entry.period}
              </div>
              <span className="mono">{entry.tag}</span>
              <h3>{entry.title}</h3>
              <p>{entry.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

