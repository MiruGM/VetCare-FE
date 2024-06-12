import { useRef } from "react";

import Carousel from "./Carousel";
import TextAndImage from "./TextAndImage";
import CardServices from "./CardServices";
import CardServicesSmall from "./CardServicesSmall";
import LandPageToken from "./LandPageToken";
import Footer from "./Footer";

import { Divider } from "@mui/material";

import descriptionImg from "../styles/img/intro-img-custom.png";
import club from "../styles/img/club-img.png";
import icon1 from "../styles/img/compromiso-icon.png";
import icon2 from "../styles/img/ciencia-y-tecnologia-icon.png";
import icon3 from "../styles/img/atencion-icon.png";
import nutrition from "../styles/img/nutricion.png";
import lab from "../styles/img/laboratorio.png";
import interna from "../styles/img/interna.png";
import preventiva from "../styles/img/preventiva.png";
import cirugia from "../styles/img/cirugia.png";
import peluqueria from "../styles/img/peluqueria.png";
import scan from "../styles/img/scan.png";
import urgencias from "../styles/img/urgencias.png";


function LandPage() {
  const sectionRef = useRef(null);

  const introText = (
    <>
      <p>
        VetCare es un Centro Veterinario Especializado que cuenta con un equipo de profesionales altamente cualificados para dar a su mascota la mejor de las atenciones.
      </p>
      <p>
        Además, el centro está equipado con la mejor tecnología para poder dar un servicio completo a las necesidades de cualquier animal.
      </p>
      <p>
        La filosofía que seguimos tiene el principal objetivo de fomentar la prevención y el correcto cuidado de los diferentes tipos de mascotas, haciendo así que éstas vivan una vida sana y feliz.
      </p>
    </>
  );
  const clubText = (
    <>
      <p>
        Desde VetCare invitamos a todos los dueños responsables a unirse a nuestro Club VetCare. Este programa exclusivo esta diseñado para mejorar el bienestar de tu mascota.
      </p>
      <p>
        Al hacerte socio de nuestro club, tendrás acceso a una amplia gama de beneficios pensados para facilitar y abaratar los cuidados de su mascota.
      </p>
      <p>
        No dude en contactarnos para obtener información detallada sobre nuestro Club VetCare y cómo aprovechar al máximo el tiempo con su mascota.
      </p>

    </>
  );

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="mb-5" >
        <Carousel />
      </div>
      <TextAndImage
        overTitle="Bienvenidos a VetCare"
        title="Centro Veterinario Especialialzado"
        text={introText}
        img={descriptionImg}
        alt="Estetoscopio amarillo sobre fondo azul con un corazon rojo dibujado"
        buttonText="Contáctanos"
        buttonClick={scrollToSection}
        orderFirst="order-1"
        orderSecond="order-2"
      />


      <Divider className="long-divider mb-5" />

      <div className="container d-flex flex-wrap flex-sm-nowrap justify-content-evenly mb-5">
        <LandPageToken
          img={icon1}
          alt=""
          title={<>Compromiso<br />y Eficacia</>}
          text="Comprometidos con la salud de tu mascota estamos disponibles las 24 horas del día."
        />
        <LandPageToken
          img={icon2}
          alt=""
          title={<>Última<br />Tecnología</>}
          text="Aportamos los últimos avances tecnológicos para tratar a tu mascota de la mejor manera posible."
        />
        <LandPageToken
          img={icon3}
          alt=""
          title={<>Atención<br />Personalizada</>}
          text="Estudiamos cada caso de forma individual y personalizada para solventar cualquier problema de forma rápida y eficaz."
        />
      </div>

      <div className="bg-light mb-5">
        <div className="container d-flex-column d-md-none py-5">
          <h1 className="text-center mb-4 title">Nuestros Servicios</h1>
          <CardServicesSmall
            title="Medicina Preventiva"
            img={preventiva}
            alt="Dos veterinarios oscultando a un perro"
            textOrder="order-1"
            imgOrder="order-2"
          />
          <CardServicesSmall
            title="Medicina Interna"
            img={interna}
            alt="Perro en la mesa de quirofano con jeringuilla"
            textOrder="order-2"
            imgOrder="order-1"
          />
          <CardServicesSmall
            title="Nutrición"
            img={nutrition}
            alt="bol con comida de perro"
            textOrder="order-1"
            imgOrder="order-2"
          />
          <CardServicesSmall
            title="Cirugía Veterinaria"
            img={cirugia}
            alt="Dos veterinarios en un quirofano"
            textOrder="order-2"
            imgOrder="order-1"
          />
          <CardServicesSmall
            title="Urgencias 24h"
            img={urgencias}
            alt="Veterinario atendiendo un gato"
            textOrder="order-1"
            imgOrder="order-2"
          />
          <CardServicesSmall
            title="Diagnóstico por Imagen"
            img={scan}
            alt="Máquina de radiodiagnostico"
            textOrder="order-2"
            imgOrder="order-1"
          />
          <CardServicesSmall
            title="Análisis de Laboratorio"
            img={lab}
            alt="Hombre mirando en un microscopio"
            textOrder="order-1"
            imgOrder="order-2"
          />
          <CardServicesSmall
            title="Peluquería"
            img={peluqueria}
            alt="Veterinaria peinando a un yorkshire"
            textOrder="order-2"
            imgOrder="order-1"
          />

        </div>

        <div className="container d-none d-md-block py-5">
          <h1 className="text-center title">Nuestros Servicios</h1>
          <div className="d-flex  justify-content-evenly flex-wrap ">
            <CardServices
              img={preventiva}
              alt="Dos veterinarios oscultando a un perro"
              title="Medicina Preventiva"
              text="Es importante llevar a cabo un seguimiento de la salud de nuestra mascota para que puedan vivir una vida sana y feliz." />

            <CardServices
              img={interna}
              alt="Perro en la mesa de quirofano con jeringuilla"
              title="Medicina Interna"
              text="La Medicina Interna se encarga de atender amplios problemas de salud de nuestros pacientes. Engloba consultas de pediatría, cardiología, dermatología, odontología, oftalmología, geriatría y endocrinología." />

            <CardServices
              img={nutrition}
              alt="bol de comida de perro"
              title="Nutrición"
              text="Cada animal tiene unas necesidades nutricionales propias en función de su especie, raza, edad, actividad física, enfermedades o alergias alimentarias." />

            <CardServices
              img={cirugia}
              alt="Dos veterinarios en un quirofano"
              title="Cirugía Veterinaria"
              text="Quirófano totalmente equipado con la última tecnología para realizar las cirugías necesarias para las mascotas las 24 horas." />

            <CardServices
              img={urgencias}
              alt="Veterinrio atendiendo a un gato"
              title="Urgencias 24h"
              text="Sabemos que la salud no tiene horarios por lo que siempre estaremos ahí cuando lo necesites, servicio de urgencias veterinarias 24 horas durante los 7 días de las semana. " />

            <CardServices
              img={scan}
              alt="Máquina de radiodiagnostico"
              title="Diagnóstico por Imagen (RDD)"
              text="En nuestros centros contamos con un sistema de radiología digital directa de alta calidad permitiéndonos tener al instante las imágenes radiológicas." />

            <CardServices
              img={lab}
              alt="Hombre mirando en un microscopio"
              title="Análisis de Laboratorio"
              text="Laboratorio propio para realizar las diferentes analíticas a las mascotas y trabajamos con los mejores laboratorios externos a nivel nacional." />

            <CardServices
              img={peluqueria}
              alt="Veterinaria peinando a un yorkshire"
              title="Peluquería Canina y Felina"
              text="Peluquería canina y felina donde realizamos servicios de belleza e higiene y tratamientos (lavado y corte para mascotas, arreglos de peluquería, cortes de raza, stripping)." />

          </div>
        </div>
      </div>

      <TextAndImage
        overTitle="¡Apuntate ya!"
        title="Club VetCare"
        text={clubText}
        img={club}
        alt="Estetoscopio amarillo sobre fondo azul con un corazon rojo dibujado"
        buttonText="Más Información"
        buttonClick={scrollToSection}
        orderFirst="order-2"
        orderSecond="order-1"
      />

      <Footer ref={sectionRef} />

    </div>
  );
}

export default LandPage; 