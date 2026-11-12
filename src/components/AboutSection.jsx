import React, { useState, useRef } from 'react';
import { SKILLS } from '../data/portfolioData';

export default function AboutSection() {
  const scrapRef = useRef(null);
  const [activeSkillIndex, setActiveSkillIndex] = useState(null);
  const activePolaroidZRef = useRef(null);

  // Initial cloud note state
  const currentSkill =
    activeSkillIndex !== null
      ? SKILLS[activeSkillIndex]
      : {
          kicker: 'Bir kelimeye dokunun',
          label: 'Ne yapar?',
          text: "Soldaki kelimelerin her biri Ceren Kumbasar'ın çalışma alanlarından birini anlatıyor.",
        };

  // Draggable polaroid setup
  const bindDrag = () => {
    let sx = 0;
    let sy = 0;
    let ox = 0;
    let oy = 0;
    let pointerId = null;

    return {
      onPointerDown: (e) => {
        const el = e.currentTarget;
        pointerId = e.pointerId;
        el.setPointerCapture(pointerId);
        sx = e.clientX - ox;
        sy = e.clientY - oy;

        // Reset all polaroids z-index
        if (scrapRef.current) {
          const polaroids = scrapRef.current.querySelectorAll('.polaroid');
          polaroids.forEach((p) => {
            p.style.zIndex = '1';
          });
        }
        el.style.zIndex = '5';
      },
      onPointerMove: (e) => {
        if (e.pointerId !== pointerId) return;
        if (!scrapRef.current) return;
        const box = scrapRef.current.getBoundingClientRect();
        ox = Math.max(-box.width * 0.4, Math.min(box.width * 0.4, e.clientX - sx));
        oy = Math.max(-160, Math.min(200, e.clientY - sy));
        e.currentTarget.style.translate = `${ox}px ${oy}px`;
      },
      onPointerUp: (e) => {
        pointerId = null;
      },
      onPointerCancel: (e) => {
        pointerId = null;
      },
    };
  };

  const dragHandlersP1 = useRef(bindDrag()).current;
  const dragHandlersP2 = useRef(bindDrag()).current;
  const dragHandlersP3 = useRef(bindDrag()).current;

  return (
    <section id="hakkinda">
      <div className="wrap">
        <div className="sec-label reveal">
          <span className="mono">Bölüm 01</span>
          <h2>Hakkında</h2>
        </div>

        <div className="about">
          <div className="scrap reveal" id="scrap" ref={scrapRef}>
            <figure className="polaroid p1" data-drag {...dragHandlersP1}>
              <div className="duo">
                <img
                  src="/img/portre-powerup.jpg"
                  alt="Ceren Kumbasar Mumay, eğitmen portresi"
                  width="550"
                  height="500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>kürsüde, bugün</figcaption>
            </figure>

            <figure className="polaroid p2" data-drag {...dragHandlersP2}>
              <div className="duo red">
                <img
                  src="/img/zirve.jpg"
                  alt="GSÜ İletişim Zirvesi afişi: Ceren Kumbasar, Siyasal İletişimsizlik"
                  width="512"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>zirvede konuşmacı</figcaption>
            </figure>

            <figure className="polaroid p3" data-drag {...dragHandlersP3}>
              <div className="duo">
                <img
                  src="/img/award.jpg"
                  alt="Prime London ödülü: Top-Selling MENA Agent of the Year for Berkeley Capital 2025/26"
                  width="300"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>2025/26 ✦</figcaption>
            </figure>

            <div className="note n1">
              sahne + beden dili<br />= iyi bir sunum!
              <svg width="90" height="60" viewBox="0 0 90 60" style={{ margin: '4px 0 0 auto' }}>
                <path
                  pathLength="1"
                  d="M80 4 C 70 30, 40 44, 10 50 M10 50 l12 -10 M10 50 l14 4"
                />
              </svg>
            </div>

            <div className="note n2">
              <svg width="80" height="56" viewBox="0 0 80 56">
                <path
                  pathLength="1"
                  d="M8 52 C 18 24, 40 10, 70 8 M70 8 l-12 -6 M70 8 l-10 10"
                />
              </svg>
              Londra'dan ödül!
            </div>

            <span className="drag-hint mono">↔ Fotoğrafları sürükleyebilirsiniz</span>
          </div>

          <div className="about-text">
            <span className="hello reveal">Merhaba!</span>
            <h3 className="reveal">
              Bir projenin <em>hikâyesini</em> bulmadan satışı konuşmam.
            </h3>
            <p className="dropcap reveal">
              Ceren Kumbasar, yalnızca inşaat sektörüne <strong>stratejik pazarlama, konsept ve satış</strong>{' '}
              danışmanlığı veren Cube Istanbul'un kurucusu ve başkanı. Ondan önce Soyak, Sinpaş ve
              Ağaoğlu'nda pazarlama müdürü, müdür yardımcısı ve direktör olarak çalıştı. Ekibiyle
              birlikte Türkiye'de geniş kitlelerin tanıdığı projelere imza attı.
            </p>
            <p className="reveal">
              2007'den beri yabancı yatırımcıları Türkiye'ye çekmek için çalışıyor; Orta Doğu ve Körfez
              ülkelerindeki inşaat projelerine danışmanlık verdi. 2008'den bu yana anlattığı
              gayrimenkul satışı derslerinden <strong>300'ü aşkın profesyonel</strong> çıktı. Doğu
              Ataşehir'deki 269 konutluk Canan Residence'ın satış ve pazarlama sorumlusuydu; 2021'de
              Avcılar Belediyesi şirketi AVBEL'de genel müdür yardımcısı olarak depreme yönelik
              “Avcılar Modeli”ni TBMM'ye sundu.
            </p>
            <p className="reveal">
              Marmara Üniversitesi İşletme mezunu. Öğrenciliğinde beden dili, oyunculuk ve performans
              sanatları üzerine dersler aldı; sunuma ve sahneye olan yakınlığı oradan geliyor.
              Hürriyet, Vatan ve Cumhuriyet'te yazdı; Cumhuriyet'te emlak sayfası editörüydü. Bugün
              Yeni Arayış'ta siyasal iletişim yazıyor. 2023'te bir siyasi partinin yeni kurulan dijital
              ve sosyal medya biriminin başına <strong>stratejist ve siyasi iletişim uzmanı</strong>{' '}
              olarak getirildi. Bugün televizyonlarda siyasal iletişim yorumcusu olarak da izleniyor.
            </p>
            <p className="reveal">
              Gayrimenkuldeki uluslararası işi de sürüyor: Londra merkezli Prime London ve Berkeley
              Capital, onu <strong>2025/26 yılının en çok satış yapan MENA temsilcisi</strong> seçti.
            </p>
          </div>
        </div>

        <div className="cloud-wrap">
          <div className="cloud reveal" id="cloud" role="group" aria-label="Uzmanlık alanları">
            {SKILLS.map((skill, index) => (
              <button
                key={index}
                className={skill.class}
                data-k={index}
                type="button"
                aria-pressed={activeSkillIndex === index}
                onClick={() => setActiveSkillIndex(index)}
              >
                {skill.label}
              </button>
            ))}
          </div>

          <div className="cloud-note reveal" aria-live="polite">
            <span className="mono" id="cnK">
              {currentSkill.kicker}
            </span>
            <h4 id="cnT">{currentSkill.label}</h4>
            <p id="cnP">{currentSkill.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

