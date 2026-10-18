export default function Hero({ navegar }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-texto">
        <p className="etiqueta">CLÍNICA DENTAL</p>
        <h1>Tu sonrisa merece la mejor atención.</h1>
        <p>
          En Sonrisa Saludable ofrecemos atención dental profesional, cercana y
          pensada para cuidar de ti y de tu familia.
        </p>
        <button className="boton-principal" onClick={() => navegar("dentistas")}>
          Conoce a nuestros dentistas
        </button>
      </div>
      <div className="hero-icono" aria-label="Diente decorativo">🦷</div>
    </section>
  );
}
