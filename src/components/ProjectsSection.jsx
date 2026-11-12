import React, { useState } from 'react';
import { PROJECTS, PROJECT_TYPES } from '../data/portfolioData';

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'karma', label: 'Karma' },
  { key: 'konut', label: 'Konut' },
  { key: 'villa', label: 'Villa' },
  { key: 'donusum', label: 'Dönüşüm' },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id="ilanlar">
      <div className="wrap">
        <div className="sec-label reveal">
          <span className="mono">Bölüm 04</span>
          <h2>İlanlar</h2>
        </div>

        <div className="ilan-head reveal">
          <p>
            Çalıştığı ve Cube İstanbul portföyündeki projeler, gazetenin seri ilanlar sayfası gibi.
            Kutuların üzerine gelin; türe göre süzün.
          </p>
          <div className="chips" role="group" aria-label="Projeleri filtrele" id="pChips">
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

        <div className="ilanlar reveal" id="ilanList">
          {PROJECTS.map((project, index) => {
            const isHidden = activeFilter !== 'all' && project.type !== activeFilter;
            const detailsList = Object.entries(project.details || {});

            return (
              <article
                key={index}
                className={`ilan ${project.stamp ? 'big' : ''} ${isHidden ? 'hide' : ''}`}
                data-t={project.type}
              >
                <span className="mono">
                  <span>No. {String(index + 1).padStart(2, '0')}</span>
                  <span>{PROJECT_TYPES[project.type] || 'Portföy'}</span>
                </span>
                {project.stamp ? (
                  <span
                    className="stamp"
                    dangerouslySetInnerHTML={{ __html: project.stamp }}
                  />
                ) : null}
                <h3>{project.name}</h3>
                {project.location ? <span className="loc">{project.location}</span> : null}
                {detailsList.length > 0 ? (
                  <dl>
                    {detailsList.map(([key, val]) => (
                      <React.Fragment key={key}>
                        <dt>{key}</dt>
                        <dd>{val}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                ) : null}
              </article>
            );
          })}

          <a className="ilan ad" href="#iletisim" data-t="ad">
            <span className="mono">
              <span>No. {String(PROJECTS.length + 1).padStart(2, '0')}</span>
              <span>Sıradaki</span>
            </span>
            <h3>Sizin projeniz?</h3>
            <span className="loc">Konsept, strateji, satış.</span>
            <span
              className="hand"
              style={{ fontSize: '24px', color: 'var(--red)', marginTop: 'auto' }}
            >
              bize yazın →
            </span>
          </a>
        </div>

        <p className="src mono">
          Kaynaklar: Cube Istanbul'un arşivlenmiş sitesi (2012–2013), Milliyet (Canan Residence
          künyesi, 2011), TBMM tutanağı (2021). Filtreler yalnızca türü bilinen projelerde çalışır.
        </p>
      </div>
    </section>
  );
}

