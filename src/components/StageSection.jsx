import React from 'react';
import { VIDEOS, TALKS } from '../data/portfolioData';

export default function StageSection() {
  return (
    <section id="sahne">
      <div className="wrap">
        <div className="sec-label reveal">
          <span className="mono">Bölüm 03</span>
          <h2>Sahne &amp; Ekran</h2>
        </div>

        <div className="stage">
          <article className="st reveal">
            <figure className="duo red zoom">
              <img
                src="/img/zirve.jpg"
                alt="GSÜ İletişim Zirvesi afişi"
                width="512"
                height="640"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <span className="mono">Konferans · 12 Aralık 2025</span>
            <h3>“Siyasal İletişimsizlik”</h3>
            <p>
              Galatasaray Üniversitesi İletişim Kulübü'nün zirvesinde, Aydın Doğan Oditoryumu.
            </p>
          </article>

          <article className="st reveal">
            <figure className="duo zoom">
              <img
                style={{ objectPosition: '0 40%' }}
                src="/img/tv.jpg"
                alt="Ceren Kumbasar Mumay bir televizyon panelinde siyasal iletişimci olarak"
                width="360"
                height="210"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <span className="mono">Televizyon · 2026</span>
            <h3>Siyasal iletişim yorumcusu</h3>
            <p>
              Haber kanallarındaki tartışma programlarında seçmen davranışı ve muhalefetin
              iletişim dili üzerine yorumlar.
            </p>
            <span className="hand q">
              “Muhalefet, bütün olanları seçmenin gözünde anlamlandırmak zorunda.”
            </span>
          </article>

          <article className="st reveal">
            <figure className="duo zoom">
              <img
                src="/img/award.jpg"
                alt="Prime London ödülü"
                width="300"
                height="400"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <span className="mono">Ödül · Londra</span>
            <h3>Top-Selling MENA Agent of the Year</h3>
            <p>
              Prime London tarafından Berkeley Capital için verilen 2025/26 ödülü: Orta Doğu ve
              Kuzey Afrika'dan yatırımcıyı Londra gayrimenkulüyle buluşturmak.
            </p>
          </article>
        </div>

        <div className="onair reveal">
          <div className="onair-head">
            <span className="mono">Yayın akışı</span>
            <span className="hand">tıklayın, YouTube'da açılır →</span>
          </div>
          <div className="vids" id="vids">
            {VIDEOS.map((vid) => (
              <a
                key={vid.id}
                className="vid"
                href={`https://www.youtube.com/watch?v=${vid.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <figure className="duo zoom">
                  <img
                    src={`https://i.ytimg.com/vi/${vid.id}/mqdefault.jpg`}
                    alt=""
                    width="320"
                    height="180"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
                <span className="mono">{vid.subtitle}</span>
                <b>{vid.title}</b>
              </a>
            ))}
          </div>
        </div>

        <div className="talks reveal">
          <h3 className="mono">Kürsüden</h3>
          <ol>
            {TALKS.map((talk, index) => (
              <li key={index}>
                <time>{talk.year}</time>
                <span>
                  <b>{talk.host}</b> · {talk.desc}
                </span>
                {talk.link ? (
                  <a href={talk.link} target="_blank" rel="noopener noreferrer">
                    kaynak ↗
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

