import { Link } from 'react-router-dom'
import './aboutPage.css'

export function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-header">
          <h1 className="about-title">DiscSpace</h1>
          <p className="about-subtitle">Um espaço cósmico para seus reviews musicais</p>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">O que é?</h2>
          <p className="about-text">
            DiscSpace é um espaço digital onde você pode expressar seus sentimentos sobre
            músicas e álbuns de forma única. Busque na biblioteca do iTunes, escreva seus
            reviews, defina sua nota e sentimento, e lance tudo no espaço — literalmente.
          </p>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Como usar?</h2>
          <ol className="about-steps">
            <li><span className="step-number">1</span> Busque uma música ou álbum</li>
            <li><span className="step-number">2</span> Escreva seu review</li>
            <li><span className="step-number">3</span> Defina a nota e o sentimento</li>
            <li><span className="step-number">4</span> Lance no espaço!</li>
          </ol>
        </div>

        <div className="about-section">
          <h2 className="about-section-title">Tech Stack</h2>
          <div className="about-tech">
            <span className="tech-tag">Vite</span>
            <span className="tech-tag">React</span>
            <span className="tech-tag">TypeScript</span>
            <span className="tech-tag">Zustand</span>
            <span className="tech-tag">React Router</span>
          </div>
        </div>

        

        <Link to="/" className="about-back-btn">
          ← Voltar ao espaço
        </Link>
      </div>
    </div>
  )
}
