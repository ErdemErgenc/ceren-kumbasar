import React, { useState } from 'react';
import { ARTICLES, ARTICLE_TYPES } from '../data/portfolioData';

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'sehir', label: 'Şehircilik' },
  { key: 'yatirim', label: 'Yatırım' },
  { key: 'sektor', label: 'Sektör' },
  { key: 'siyaset', label: 'Siyaset' },
];

const BASE_URL = 'https://www.cumhuriyet.com.tr/yazarlar/ceren-kumbasar/';
const getArticleHref = (item) => (item.slug.startsWith('http') ? item.slug : BASE_URL + item.slug);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const REDS = new Set([0, 2, 10]);

export default function ArticlesSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id="yazilar" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-label reveal">
          <span className="mono">Bölüm 05</span>
          <h2>Yazılar</h2>
        </div>

        <div className="ilan-head reveal">
          <p>
            Cumhuriyet, Vatan ve Yeni Arayış'taki köşelerinden seçmeler. Görsellerin üzerine gelince
            renkleniyor.
          </p>
          <div className="chips" role="group" aria-label="Yazıları filtrele" id="cChips">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className="chip"
                data-f={f.key}
                type="button"
                aria-pressed={activeFilter === f.key}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mag" id="mag">
          {ARTICLES.map((article, index) => {
            const isWide = index === 2;
            const hasImage = Boolean(article.img);
            const isRed = REDS.has(index);
            const isHidden = activeFilter !== 'all' && article.category !== activeFilter;

            const readMoreLabel =
              article.source === 'Vatan'
                ? "Yeniemlak'ta oku"
                : article.source
                ? `${article.source}'ta oku`
                : "Cumhuriyet'te oku";

            const arrowIcon = (
              <svg
                viewBox="0 0 16 16"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M4 12 12 4M5 4h7v7" />
              </svg>
            );

            const meta = (
              <span className="mono">
                <b>{ARTICLE_TYPES[article.category]}</b>
                {article.date ? (
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                ) : (
                  <span>{article.source}</span>
                )}
              </span>
            );

            const bodyContent = (
              <>
                {meta}
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <span className="go">
                  {readMoreLabel} {arrowIcon}
                </span>
              </>
            );

            const figureImg = hasImage ? (
              <figure className="duo zoom">
                <img
                  src={`/img/${article.img}.jpg`}
                  alt={article.imgAlt}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="800"
                />
              </figure>
            ) : null;

            const classNames = [
              'art',
              'reveal',
              isWide ? 'wide' : '',
              hasImage ? '' : 'txtonly',
              isRed ? 'red' : '',
              isHidden ? 'hide' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <a
                key={index}
                className={classNames}
                data-t={article.category}
                href={getArticleHref(article)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isWide ? (
                  <>
                    {figureImg}
                    <div className="txt">{bodyContent}</div>
                  </>
                ) : (
                  <>
                    {figureImg}
                    {bodyContent}
                  </>
                )}
              </a>
            );
          })}
        </div>

        <div className="more-row reveal">
          <span className="hand" style={{ fontSize: '26px', color: 'var(--green)' }}>
            daha fazlası arşivde →
          </span>
          <a
            className="btn"
            href="https://www.cumhuriyet.com.tr/yazarlar/ceren-kumbasar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tüm yazılar{' '}
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 12 12 4M5 4h7v7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

