interface Partner {
  name: string
  file: string
}

const PARTNERS: Partner[] = [
  { name: 'Real Latas',                  file: 'real-latas.jpg' },
  { name: 'Universal Auto Center',       file: 'universal-auto-center.jpg' },
  { name: 'Lucas Gyn — Personal Trainer', file: 'lucas-gyn.jpg' },
  { name: 'OralFace',                    file: 'oral-face.jpg' },
  { name: 'ZH — Casa de Carnes e Conveniência', file: 'zh-carnes.jpg' },
  { name: 'WFIT Academia',               file: 'wfit.jpg' },
  { name: 'Activo Contabilidade',        file: 'activo-contabilidade.jpg' },
  { name: 'Nós & O Empresário Podcast',  file: 'nos-e-o-empresario.jpg' },
  { name: 'Mia Bella Beauty',            file: 'mia-bella.jpg' },
  { name: 'Nexus Studio',                file: 'nexus-studio.jpg' },
  { name: 'Vereador Fernando Henrique',  file: 'vereador-fernando-henrique.jpg' },
]

export default function Partners() {
  return (
    <section className="partners-wrap" id="parceiros" aria-labelledby="parceiros-title">
      <div className="inner">
        <p className="section-label grad-text">Parceiros</p>
        <h2 className="section-title" id="parceiros-title">
          Marcas que Já Confiaram na JAVES
        </h2>
        <div className="partners-grid">
          {PARTNERS.map((p) => (
            <div className="partner-item" key={p.name}>
              <img
                src={`/png/parceiros/${p.file}`}
                alt={p.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
