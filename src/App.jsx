import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navigator from './navbar/navbar';
import PanelArticles from './listproject/ListProjects';
import DetailContent from "./detailcontent/DetailContent";
import PanelContact from './contact/panelContact';
import MainContent from './maincontent/maincontent';

function HomePage({ onSelectArticle }) {
  const [selectedPath, setSelectedPath] = useState(null);

  return (
    <>
      <MainContent onSelectPath={setSelectedPath} />
      <PanelArticles Load={onSelectArticle} selectedPath={selectedPath} onClearPath={() => setSelectedPath(null)} />
      <PanelContact
        Phone="541136695771"
        Email="pgnahuel@gmail.com"
        Instagram="_nacho.png"
        X="NachoPNG"
        Youtube="NahuelGomez94"
        Linkedin="pgnahuel"
        Podcast="escuchar-audios-nahuel-gomez_al_15792872_1.html"
      />
    </>
  );
}

function ArticleDetailPage({ onOpenSiteNavigation }) {
  const navigate = useNavigate();
  const fnNavigate = (arg)=>{
    window.document.title = "Nahuel Gómez";
    navigate(arg);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  const volverALista = () => {
    fnNavigate('/');
  };

  return <DetailContent Id={id} Volver={volverALista} onOpenSiteNavigation={onOpenSiteNavigation} />;
}

function AppContent() {
  const [isSiteNavigationOpen, setIsSiteNavigationOpen] = useState(false);
  const navigate = useNavigate();

  const seleccionarArticulo = (articulo) => {
    navigate(`/?id=${articulo.Id}`);
  };

  const volverALista = () => {
    navigate('/');
  };

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      setIsSiteNavigationOpen(false);
    }
  }, [id]);

  return (
    <div className="container-fluid" id="home">
      <div className="row">
        <Navigator
          Unload={volverALista}
          articleMode={Boolean(id)}
          isMenuOpen={isSiteNavigationOpen}
          onMenuOpenChange={setIsSiteNavigationOpen}
        />
        <div className="tm-main">
          <Routes>
            <Route path="/" element={id ? <ArticleDetailPage onOpenSiteNavigation={() => setIsSiteNavigationOpen(true)} /> : <HomePage onSelectArticle={seleccionarArticulo} />} />
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
