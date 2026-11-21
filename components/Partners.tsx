interface Partner {
  name: string
  file: string
}

const PARTNERS: Partner[] = [
  { name: 'Gazin',                              file: 'gazin.png' },
  { name: 'Real Latas',                         file: 'real-latas.png' },
  { name: 'Universal Auto Center',              file: 'universal-auto-center.png' },
  { name: 'OULAB',                              file: 'oulab.png' },
  { name: 'Lucas Gyn — Personal Trainer',       file: 'lucas-gyn.png' },
  { name: 'OralFace',                           file: 'oral-face.png' },
  { name: 'Predileta',                          file: 'predileta.png' },
  { name: 'WFIT Academia',                      file: 'wfit.png' },
  { name: 'Zero Hora',                          file: 'zero-hora.png' },
  { name: 'Vanelli',                            file: 'vanelli.png' },
  { name: 'Activo Contabilidade',               file: 'activo-contabilidade.png' },
  { name: 'Arlete Sampaio',                     file: 'arlete-sampaio.png' },
  { name: 'Nós & O Empresário Podcast',         file: 'nos-e-o-empresario.png' },
  { name: 'Nanda Rocha',                        file: 'nanda-rocha.png' },
  { name: 'Mia Bella Beauty',                   file: 'mia-bella.png' },
  { name: 'Nexus Studio',                       file: 'nexus-studio.png' },
  { name: 'Vereador Fernando Henrique',         file: 'vereador-fernando-henrique.png' },
]

export default function Partners() {
  // Duplicamos a lista pra permitir loop CSS infinito sem "pulo" visivel.
  // O keyframe translada de 0 a -50% da track, voltando ao inicio da copia
  // identica em perfeita sincronia com a primeira.
  const loopPartners = [...PARTNERS, ...PARTNERS]

  return (
    <section className="partners-wrap" id="parceiros" aria-labelledby="parceiros-title">
      <div className="inner">
        <p className="section-label grad-text">Parceiros</p>
        <h2 className="section-title" id="parceiros-title">
          Marcas que Já Confiaram na JAVES
        </h2>
      </div>

      <div
        className="partners-carousel"
        role="region"
        aria-label="Logos dos parceiros"
      >
        <div className="partners-carousel-track">
          {loopPartners.map((p, i) => (
            <div
              className="partner-item"
              key={`${p.file}-${i}`}
              aria-hidden={i >= PARTNERS.length ? 'true' : undefined}
            >
              <img
                src={`/png/parceiros/${p.file}`}
                alt={i >= PARTNERS.length ? '' : p.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
