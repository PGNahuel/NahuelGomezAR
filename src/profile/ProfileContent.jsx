import React from 'react';
import ContentSection from '../layout/ContentSection';
import { articlePath } from '../articlePaths';
import { profile } from './profile';

export default function ProfileContent() {
  return (
    <ContentSection className="profile-page" aria-labelledby="profile-title">
      <div className="content-section__body">
        <h1 id="profile-title" className="tm-text-primary">Sobre mí: {profile.name}</h1>
        <p className="profile-lead">{profile.description}</p>
        <p>Soy desarrollador de software especializado en backend. En este sitio escribo sobre problemas que encontré al construir y mantener sistemas, las decisiones técnicas que tomé y lo que aprendí trabajando con otros equipos.</p>
        <h2>Trayectoria</h2>
        <p>En mi relato de experiencia cuento mi trabajo en Mercado Libre y mi recorrido anterior en Softtek, con proyectos para OSDE y Ternium. También describo tareas de bases de datos, desarrollo, diseño de soluciones y colaboración entre equipos.</p>
        <p><a href={articlePath('personal-experience')}>Leer mi experiencia profesional completa</a></p>
        <h2>Temas que comparto</h2>
        <ul>
          <li><a href={articlePath('observability')}>Observabilidad y operación de sistemas</a></li>
          <li><a href={articlePath('pensar-abstracciones')}>Abstracciones y diseño de software</a></li>
          <li><a href={articlePath('codificacion-documentacion')}>Código y documentación</a></li>
          <li><a href={articlePath('planification')}>Planificación del desarrollo</a></li>
        </ul>
        <h2>También escribo fuera del trabajo</h2>
        <p>En <a href={articlePath('mi-libro')}>Código del alma</a> presento un libro personal sobre mis experiencias y la paternidad.</p>
        <p>Podés encontrarme en <a href={profile.linkedIn}>LinkedIn</a> y <a href={profile.github}>GitHub</a>.</p>
      </div>
    </ContentSection>
  );
}
