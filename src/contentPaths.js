export const contentPaths = [
    {
        id: "systems",
        title: "Resolver problemas reales en sistemas",
        description: "Observabilidad, planificación y prácticas para construir software que se pueda sostener.",
        cardTitle: "Resolver problemas reales en sistemas",
        cardDescription: "Observabilidad, planificación y prácticas para el trabajo cotidiano.",
        icon: "fas fa-tools"
    },
    {
        id: "thinking",
        title: "Arquitectura, diseño y mejores decisiones",
        description: "Ideas para escribir, documentar y pensar sistemas más mantenibles.",
        cardTitle: "Pensar mejor: arquitectura, diseño y decisiones",
        cardDescription: "Abstracciones, código mantenible y documentación que ayuda.",
        icon: "fas fa-sitemap"
    },
    {
        id: "career",
        title: "Carrera, comunicación y experiencia",
        description: "Reflexiones personales sobre el recorrido profesional y lo que aprendemos al hacerlo.",
        cardTitle: "Crecer profesionalmente",
        cardDescription: "Experiencia, comunicación y aprendizajes de una carrera en tecnología.",
        icon: "fas fa-seedling"
    }
];

export const contentPathsById = Object.fromEntries(contentPaths.map((path) => [path.id, path]));
