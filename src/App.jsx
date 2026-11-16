import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import Dentistas from "./components/Dentistas";
import FormularioCita from "./components/FormularioCita";
import Acceso from "./components/Acceso";
import PanelPaciente from "./components/PanelPaciente";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import EntregaFinal from "./components/EntregaFinal";
import { leerSesion, cerrarSesion as cerrarSesionStorage } from "./utils/almacenamiento";
import "./App.css";

export default function App() {
  const [vista, setVista] = useState("inicio");
  const [usuario, setUsuario] = useState(leerSesion());
  const [dentistaInicial, setDentistaInicial] = useState(null);
  const [seccionEntrega, setSeccionEntrega] = useState("actividades");

  function abrirSeccion(id) {
    setSeccionEntrega(id);
    navegar("entrega");
  }

  function navegar(destino, ancla) {
    setVista(destino);
    if (ancla) {
      setTimeout(() => {
        document.getElementById(ancla)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      window.scrollTo({ top: 0 });
    }
  }

  function pedirCita(dentista) {
    setDentistaInicial(dentista);
    setVista("cita");
    window.scrollTo({ top: 0 });
  }

  function alIniciar(usuarioValido) {
    setUsuario(usuarioValido);
    navegar("panel");
  }

  function salir() {
    cerrarSesionStorage();
    setUsuario(null);
    navegar("inicio");
  }

  return (
    <>
      <Header
        vista={vista}
        navegar={navegar}
        usuario={usuario}
        salir={salir}
        abrirSeccion={abrirSeccion}
      />
      {vista === "inicio" && (
        <>
          <Hero navegar={navegar} />
          <Servicios />
          <Contacto />
        </>
      )}
      {vista === "dentistas" && <Dentistas pedirCita={pedirCita} />}
      {vista === "cita" && (
        <FormularioCita usuario={usuario} navegar={navegar} dentistaInicial={dentistaInicial} />
      )}
      {vista === "acceso" && <Acceso alIniciar={alIniciar} />}
      {vista === "panel" && <PanelPaciente usuario={usuario} navegar={navegar} pedirCita={pedirCita} />}
      {vista === "entrega" && (
        <EntregaFinal
          seccion={seccionEntrega}
          cambiarSeccion={setSeccionEntrega}
          navegar={navegar}
        />
      )}
      <Footer />
    </>
  );
}
