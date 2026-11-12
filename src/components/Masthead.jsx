import React from 'react';

export default function Masthead() {
  const text = 'Ceren Kumbasar';
  const words = text.split(' ');
  let letterIndex = 0;

  return (
    <header className="mast" id="top">
      <div className="wrap">
        <h1 className="mast-name" aria-label="Ceren Kumbasar" id="mastName">
          {words.map((word, wIdx) => {
            const letterSpans = [...word].map((char) => {
              const delay = letterIndex * 35;
              letterIndex++;
              return (
                <span
                  key={letterIndex}
                  aria-hidden="true"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {char}
                </span>
              );
            });

            return (
              <React.Fragment key={wIdx}>
                {wIdx > 0 && ' '}
                <b style={{ font: 'inherit', whiteSpace: 'nowrap' }}>
                  {letterSpans}
                </b>
              </React.Fragment>
            );
          })}
        </h1>
        <div className="mast-sub">
          <span className="mono">Est. 2005 · Cube İstanbul</span>
          <em>“Bir ev sadece bir ev değildir.”</em>
          <span className="mono">Gayrimenkul · Siyasi İletişim</span>
        </div>
      </div>
    </header>
  );
}

