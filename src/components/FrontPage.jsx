import React, { useState, useEffect, useRef } from 'react';

export default function FrontPage() {
  const [countText, setCountText] = useState('300');
  const counterRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetCount = 300;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        observer.disconnect();

        if (reduceMotion) {
          setCountText(`${targetCount}+`);
          return;
        }

        const startTime = performance.now();
        const duration = 1500;

        function animate(currentTime) {
          const progress = Math.min(1, (currentTime - startTime) / duration);
          const eased = 1 - Math.pow(1 - progress, 4);
          const currentVal = Math.round(targetCount * eased);
          setCountText(`${currentVal}${progress === 1 ? '+' : ''}`);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="wrap">
      <div className="front">
        <article className="lead reveal">
          <figure className="duo zoom">
            <img
              src="/img/levent.jpg"
              alt="Levent'in gökdelenleri, İstanbul"
              width="1200"
              height="674"
              fetchPriority="high"
            />
          </figure>
          <p className="mono kicker">Manşet · Profil</p>
          <h2
            className="lead-h"
            style={{
              font: '400 clamp(34px,4.8vw,66px)/1.02 var(--display)',
              letterSpacing: '-.025em',
              maxWidth: '17ch',
            }}
          >
            Binalara konsept, şehirlere{' '}
            <em style={{ color: 'var(--green)', fontWeight: 300 }}>vicdan</em> arayan bir
            stratejist.
          </h2>
          <p className="dek">
            Soyak, Sinpaş ve Ağaoğlu'nun pazarlama masalarından Cube İstanbul'u kurmaya, köşe
            yazılarına, siyasi iletişime ve Londra'dan gelen bir ödüle uzanan bir yol. Ceren
            Kumbasar yirmi yıldır aynı soruyu soruyor: Bir proje insanlara ne anlatıyor?
          </p>
          <div className="byline mono">
            <span>
              Doğum yeri<b>Ankara</b>
            </span>
            <span>
              Büyüdüğü şehir<b>Samsun</b>
            </span>
            <span>
              Üs<b>İstanbul</b>
            </span>
          </div>
        </article>

        <aside className="side">
          <div className="box featured redline reveal">
            <span className="mono">Kurucu &amp; Başkan</span>
            <figure className="duo red">
              <img
                src="/img/portre.jpg"
                alt="Ceren Kumbasar Mumay portresi"
                width="400"
                height="400"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <h3>Ceren Kumbasar</h3>
            <p>
              Cube İstanbul kurucu başkanı; stratejist ve siyasi iletişimci. Hürriyet, Vatan,
              Cumhuriyet eski yazarı.
            </p>
          </div>
          <div className="box reveal">
            <div className="bignum" data-count="300" ref={counterRef}>
              {countText}
            </div>
            <p>
              2008'den bu yana verdiği satış eğitimleriyle sektöre kazandırdığı gayrimenkul
              profesyoneli.
            </p>
          </div>
          <div className="box reveal">
            <p className="mono" style={{ color: 'var(--red)', marginBottom: '8px' }}>
              Künye
            </p>
            <ul className="fact-list">
              <li>
                <span>Eğitim</span>
                <span>Marmara Ü., İşletme</span>
              </li>
              <li>
                <span>Diller</span>
                <span>İngilizce, Fransızca</span>
              </li>
              <li>
                <span>Kalem</span>
                <span>Hürriyet, Vatan, Cumhuriyet</span>
              </li>
              <li>
                <span>Bölge</span>
                <span>Türkiye, Orta Doğu, Körfez</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

