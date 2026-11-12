import React from 'react';
import { ARTICLES } from '../data/portfolioData';

const BASE_URL = 'https://www.cumhuriyet.com.tr/yazarlar/ceren-kumbasar/';
const getArticleHref = (item) => (item.slug.startsWith('http') ? item.slug : BASE_URL + item.slug);

export default function Ticker() {
  const tickerItems = [...ARTICLES, ...ARTICLES];

  return (
    <div className="ticker" aria-label="Öne çıkan yazılar">
      <b>Köşeden</b>
      <div className="ticker-track" id="ticker">
        {tickerItems.map((item, index) => (
          <a
            key={index}
            href={getArticleHref(item)}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

