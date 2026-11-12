import React from 'react';

export default function PhotoBand() {
  return (
    <div className="band">
      <figure className="duo">
        <img
          src="/img/bogaz.jpg"
          alt="Boğaziçi Köprüsü ve İstanbul"
          width="1200"
          height="803"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <blockquote className="reveal">
        Şehir senin değildir; ona ait olursun, sahibi olmazsın.
        <cite>— “Gezi'yi anlamak” yazısından, serbest aktarım</cite>
      </blockquote>
      <span className="credit">Foto: SALT Research</span>
    </div>
  );
}

