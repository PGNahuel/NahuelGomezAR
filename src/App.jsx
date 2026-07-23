import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navigator from './navbar/navbar';
import PanelArticles from './listproject/ListProjects';
import DetailContent from "./detailcontent/DetailContent";
import PanelContact from './contact/panelContact';
import MainContent from './maincontent/maincontent';
import tableContent from './tablecontent.json'

function HomePage({ onSelectArticle }) {
  useEffect(() => {
    setTimeout(() => {
      if (window.$) {
        window.$('.tm-parallax').each(function () {
          const imageSrc = window.$(this).data('image-src');
          window.$(this).parallax({ imageSrc: imageSrc });
        });
      }
    }, 100);
  }, []);

  return (
    <>
      <MainContent />
      <PanelArticles Load={onSelectArticle} />
      <PanelContact
        Phone="541136695771"
        Email="pgnahuel@gmail.com"
        Instagram="_nacho.png"
        X="NachoPNG"
        Youtube="NahuelGomez94"
        Linkedin="nahuel-g%C3%B3mez-a869617b"
        Podcast="escuchar-audios-nahuel-gomez_al_15792872_1.html"
      />
    </>
  );
}

function ArticleDetailPage() {
  const navigate = useNavigate();
  const fnNavigate = (arg)=>{
    window.document.title = "Nahuel Gómez";
    navigate(arg);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  const volverALista = () => {
    fnNavigate('/');

    setTimeout(() => {
      if (window.$) {
        window.$('.tm-parallax').each(function () {
          const imageSrc = window.$(this).data('image-src');
          window.$(this).parallax({ imageSrc: imageSrc });
        });
      }
    }, 100);
  };

  return <DetailContent Id={id} Volver={volverALista} />;
}

function AppContent() {
  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarArticulos = async () => {
      const datosArticulos = tableContent;
      setArticulos(datosArticulos);
    };

    cargarArticulos();
  }, []);

  const seleccionarArticulo = (articulo) => {
    navigate(`/?id=${articulo.Id}`);
  };

  const volverALista = () => {
    navigate('/');
  };

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  return (
    <div className="container-fluid" id="home">
      <div className="row">
        <Navigator Unload={volverALista} />
        <div className="tm-main">
          <Routes>
            <Route path="/" element={id ? <ArticleDetailPage articulos={articulos} /> : <HomePage onSelectArticle={seleccionarArticulo} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;