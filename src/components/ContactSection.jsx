import React, { useState, useEffect } from 'react';

export default function ContactSection({ onShowToast }) {
  const [credits, setCredits] = useState(null);
  const currentYear = new Date().getFullYear();
  const emailAddress = 'merhaba@cerenkumbasar.com';

  useEffect(() => {
    fetch('/img/credits.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data) => {
        const items = Object.values(data);
        setCredits(items);
      })
      .catch(() => {
        setCredits(false);
      });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      onShowToast('Kopyalandı ✓');
    } catch {
      onShowToast(emailAddress);
    }
  };

  return (
    <section className="contact" id="iletisim">
      <div className="checker" aria-hidden="true">
        <i className="x" />
        <i />
        <i className="x" />
        <i />
        <i className="x" />
        <i />
        <i className="x" />
        <i className="x" />
        <i />
      </div>

      <div className="wrap">
        <span className="hand reveal">bir kahve içelim mi?</span>
        <h2 className="reveal">Birlikte bir hikâye yazalım.</h2>

        <div className="row reveal">
          <a
            className="btn fill"
            id="mail"
            href={`mailto:${emailAddress}`}
            data-mail={emailAddress}
          >
            {emailAddress}
          </a>
          <button className="btn" id="copy" type="button" onClick={handleCopy}>
            Kopyala
          </button>
        </div>

        <div className="foot">
          <div>
            <h4>Ceren Kumbasar</h4>
            <small>Stratejist, yazar ve Cube Istanbul kurucu başkanı. İstanbul.</small>
          </div>
          <div>
            <h4>Sayfalar</h4>
            <a href="#hakkinda">Hakkında</a>
            <a href="#arsiv">Arşiv</a>
            <a href="#sahne">Sahne</a>
            <a href="#ilanlar">Projeler</a>
            <a href="#yazilar">Yazılar</a>
          </div>
          <div>
            <h4>Takip edin</h4>
            <a
              href="https://www.instagram.com/cerenkumbasar/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram · @cerenkumbasar
            </a>
            <a
              href="https://x.com/cerenkumbasar"
              target="_blank"
              rel="noopener noreferrer"
            >
              X · @cerenkumbasar
            </a>
            <a
              href="https://yeniarayis.com/yazarlar/ceren-kumbasar-mumay-99"
              target="_blank"
              rel="noopener noreferrer"
            >
              Yeni Arayış köşesi
            </a>
            <a
              href="https://powerupacademy.tr/egitmenler/ceren-kumbasar-mumay/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PowerUp Academy
            </a>
            <a
              href="https://www.cumhuriyet.com.tr/yazarlar/ceren-kumbasar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cumhuriyet köşesi
            </a>
          </div>
          <div>
            <h4>Künye</h4>
            <small>
              © <span id="yr">{currentYear}</span> Ceren Kumbasar
              <br />
              Tüm hakları saklıdır.
            </small>
          </div>
        </div>

        <p className="credits" id="credits">
          {credits && Array.isArray(credits) ? (
            <>
              Fotoğraflar:{' '}
              {credits.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && ', '}
                  <a href={item.page} target="_blank" rel="noopener noreferrer">
                    {item.artist.replace(/ from .*/, '')}
                  </a>{' '}
                  ({item.license})
                </React.Fragment>
              ))}
              , Wikimedia Commons. Portreler Ceren Kumbasar Mumay’ın X/Instagram hesaplarından,
              PowerUp Academy’den ve basından; video kapakları YouTube’dan; ödül fotoğrafı
              Instagram’dan.
            </>
          ) : (
            'Şehir fotoğrafları: Wikimedia Commons (CC lisansları).'
          )}
        </p>
      </div>
    </section>
  );
}

