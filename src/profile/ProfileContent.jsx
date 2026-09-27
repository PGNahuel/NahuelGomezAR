import React from 'react';
import ContentSection from '../layout/ContentSection';
import useArticleContent from '../detailcontent/hooks/useArticleContent';
import { profile } from './profile';

const PROFESSIONAL_EXPERIENCE_ID = 'personal-experience';

export default function ProfileContent({ initialArticle = null }) {
  const experience = useArticleContent(PROFESSIONAL_EXPERIENCE_ID, initialArticle);

  return (
    <ContentSection className="profile-page" aria-labelledby="profile-title">
      <div className="content-section__body">
        <h1 id="profile-title" className="tm-text-primary">Sobre mí: {profile.name}</h1>
        {experience.Cargando ? (
          <p aria-live="polite">Cargando mi experiencia profesional...</p>
        ) : (
          <div
            className="detail-content profile-experience"
            dangerouslySetInnerHTML={{ __html: experience.Content }}
          />
        )}
      </div>
    </ContentSection>
  );
}
