import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Navigator from './navbar/navbar';
import PanelArticles from './listproject/ListProjects';
import DetailContent from "./detailcontent/DetailContent";
import PanelContact from './contact/panelContact';
import MainContent from './maincontent/maincontent';
import ProfileContent from './profile/ProfileContent';
import { articlePath, profilePath } from './articlePaths';

function HomePage() {
  const [selectedPath, setSelectedPath] = useState(null);

  return (
    <>
      <MainContent onSelectPath={setSelectedPath} />
      <PanelArticles selectedPath={selectedPath} onClearPath={() => setSelectedPath(null)} />
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

function ArticleDetailPage({ id, initialArticle, onOpenSiteNavigation }) {
  return <DetailContent Id={id} Articulo={initialArticle?.id === id ? initialArticle : null} onOpenSiteNavigation={onOpenSiteNavigation} />;
}

export function AppContent({ initialArticle = null }) {
  const [isSiteNavigationOpen, setIsSiteNavigationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const articleId = location.pathname.match(/^\/articulos\/([^/]+)\/?$/)?.[1];
  const legacyId = new URLSearchParams(location.search).get('id');

  const volverALista = () => {
    navigate('/');
  };

  useEffect(() => {
    if (legacyId) navigate(articlePath(legacyId), { replace: true });
  }, [legacyId, navigate]);

  useEffect(() => {
    if (articleId) {
      setIsSiteNavigationOpen(false);
    }
  }, [articleId]);

  useEffect(() => {
    if (location.pathname === '/') document.title = 'Nahuel Gómez | Backend, sistemas y crecimiento profesional';
    if (location.pathname === profilePath) document.title = 'Sobre mí | Nahuel Gómez';
  }, [location.pathname]);

  return (
    <div className="container-fluid" id="home">
      <div className="row">
        <Navigator
          Unload={volverALista}
          articleMode={Boolean(articleId)}
          isMenuOpen={isSiteNavigationOpen}
          onMenuOpenChange={setIsSiteNavigationOpen}
        />
        <div className="tm-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articulos/:id" element={<ArticleDetailPage id={decodeURIComponent(articleId || '')} initialArticle={initialArticle} onOpenSiteNavigation={() => setIsSiteNavigationOpen(true)} />} />
            <Route path={profilePath} element={<ProfileContent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App({ initialArticle = null }) {
  return (
    <Router>
      <AppContent initialArticle={initialArticle} />
    </Router>
  );
}

export default App;
