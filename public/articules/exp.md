# Mi experiencia profesional

> Este es un recorrido por los trabajos, desafíos y aprendizajes que fueron formando mi camino. No pretende ser un listado de puestos: quiero contar cómo fui encontrando mi lugar en tecnología, qué proyectos me marcaron y qué cosas aprendí de las personas con las que trabajé.

## Hoy: trabajar en Mercado Libre

Actualmente trabajo en **Mercado Libre** como *Software Engineer*. Estoy en la empresa desde noviembre de 2022 y mi trabajo se centra en analizar, diseñar y programar sistemas de soporte al usuario. En el día a día uso tecnologías como MySQL, Git, Java, Golang, New Relic y Kibana.

Llegar a una empresa de esta escala fue un cambio importante para mí. Me encontré con desafíos nuevos, gente con muchísimo conocimiento y proyectos que me hicieron crecer mucho como desarrollador. Entré como un integrante más del equipo, pero rápidamente empecé a participar de forma muy activa: coordinando proyectos, buscando soluciones a problemas complejos y acompañando a las personas nuevas o a quienes rotaban entre equipos. Con el tiempo, eso me permitió colaborar en tres equipos distintos y proponer iniciativas que ayudaron a resolver problemas compartidos por varios de ellos. Estoy muy agradecido por esas oportunidades.

### Customer Experience: conocer el negocio desde los sistemas

Gran parte de mi recorrido en Mercado Libre estuvo ligado a **Customer Experience**, el área que trabaja con los sistemas que permiten dar soporte a los clientes.

Al principio desarrollé el backend de una herramienta para que los *Team Leaders* de los representantes pudieran gestionar estados, tiempos de atención y visualizar información importante para el negocio. Más adelante me involucré en el sistema que permite dar de alta, baja, modificar y personalizar la información de esos representantes.

Trabajar sobre ambos sistemas me dio una visión mucho más amplia del negocio. No solo podía implementar cambios: también podía opinar sobre decisiones, proponer mejoras y cuestionar alternativas cuando entendía que había una forma más conveniente de resolverlas.

### Automatización y un equipo core

Por fuera de mis tareas habituales, decidí automatizar varios procesos rutinarios: migraciones de datos, alertas en aplicaciones y monitores de estado. La intención era sencilla: reducir trabajo administrativo, anticipar fallas y detectar potenciales vulnerabilidades antes de que se convirtieran en un problema mayor.

Ese trabajo me dio reconocimiento dentro de CX IT y me abrió la puerta para colaborar con un equipo core del área, formado por seniors y especialistas en sus tecnologías. El equipo se encarga de la asignación de casos: cuando un usuario de Mercado Libre pide hablar con un representante, el sistema recibe el caso, busca a la persona indicada y habilita la comunicación entre ambas partes. Es un sistema central porque, sin él, ningún canal podría conectar al cliente con un representante.

Mi aporte en ese equipo estuvo relacionado con optimizar tiempos de respuesta, revisar *pull requests*, definir modelos de datos e infraestructura y ayudar con la gestión de proyectos. Fue una experiencia de crecimiento muy fuerte, no solo por la oportunidad sino por la escala del problema: en un sistema con cientos de miles de RPS, incluso una solución aparentemente simple puede no alcanzar para procesar todo de forma coordinada.

También aprendí mucho de mis compañeros: algunos son especialistas en Golang, otros en bases de datos, infraestructura, asincronismo, testing o negocio. Poder aprender de cada perspectiva y llevar ese conocimiento a la práctica es una de las cosas que más valoro de esta etapa.

Al momento de escribir este artículo, en abril de 2025, formo parte del equipo de **CX Phone**. Allí trabajamos en la gestión de llamadas del área de Customer Experience, tanto entrantes como salientes: cada comunicación telefónica entre Mercado Libre y sus clientes pasa por sistemas de este equipo.

## El comienzo: primeros pasos y Softtek

Mi carrera profesional empezó con un año de prácticas para un cliente que me abrió la puerta a mis primeros sistemas reales. Después trabajé nueve años en la consultora **Softtek**. No tengo documentado cada detalle cronológico de ese período, pero sí tengo muy presentes los proyectos y las personas que me hicieron crecer.

Dentro de la consultora, mi primer destino fue el equipo de compras de **OSDE**. Fue mi primer contacto con una empresa grande y mis tareas estaban vinculadas al testing: preparar ambientes, realizar pruebas y documentar lo que encontraba. Fue una buena base, aunque en ese momento sentía que necesitaba acercarme más al desarrollo y a las tecnologías.

Por eso consulté la posibilidad de cambiar de cliente. Tras un proceso de selección interno llegué a **Ternium Siderar**, un lugar en el que sentí un crecimiento profesional muy importante.

## Ternium: de las bases de datos al desarrollo de productos

En Ternium entré como DBA. Mis tareas incluían optimizar consultas, depurar bases de datos, diseñar modelos de datos nuevos, realizar procesos de ETL desde distintas fuentes y generar reportes o persistir información para que otros sistemas pudieran usarla.

Con el tiempo, al ver mi desempeño, un líder del cliente me preguntó si podía ayudar a desarrollar un sistema llamado **SIASSO** (*Sistema Integrado de Ambiente, Seguridad y Salud Ocupacional*). Ahí empecé a dar mis primeros pasos más profundos con C#, SQL, JavaScript, HTML y CSS, además de trabajar en propuestas de UI/UX para dispositivos móviles.

Durante ocho años estuve vinculado a SIASSO. No solo incorporé tecnologías nuevas: también desarrollé habilidades que hoy considero fundamentales. Aprendí a analizar requerimientos, comunicarme con gerentes, directores y operarios, diseñar soluciones innovadoras y proponer mejoras que tuvieran sentido para quienes realmente usaban el sistema.

El análisis de requerimientos, en particular, me enseñó a escuchar a roles muy distintos, entender los problemas de una planta y traducir necesidades operativas a propuestas técnicas. Eso me obligó a documentar mejor, a sostener ideas con fundamentos y no solo con intuiciones, y a presentar soluciones de calidad a las personas responsables de tomar decisiones.

## Proyectos que me marcaron en Ternium

Hay algunos trabajos de esa etapa que recuerdo especialmente por el impacto que tuvieron y por todo lo que me enseñaron.

- **Depuración automatizada de bases de datos.** Preparé scripts para detectar objetos sin uso, marcarlos y generar los scripts necesarios para eliminarlos. Una tarea que podía llevar más de seis meses se resolvió en poco más de dos semanas gracias a la automatización.

- **Migración de la estructura organizacional.** Diseñé una migración que permitía cambiar la estructura organizacional sin romper las consultas existentes. Se ajustaron consultas y se generaron vistas y funciones que devolvían siempre la misma información, sin importar qué tabla fuera el origen. Eso evitó grandes refactorizaciones en el primer cambio y permitió atravesar una segunda reestructuración sin impacto.

- **Hora Segura Dirigida.** Este fue mi proyecto más grande dentro de la empresa. Participé en el análisis de la necesidad, el diseño, el desarrollo y la puesta en producción de un módulo con el que los operarios podían programar auditorías en planta para prevenir accidentes. Además, tuve a cargo la capacitación de operarios, supervisores, doctores, gerentes y directores de Ternium Brasil para usarlo. Fue especialmente significativo ver cómo una herramienta podía fortalecer la prevención: en ese período se pasó de registrar cuatro muertes anuales a no registrar nuevas muertes, aunque el trabajo para reducir lesiones continuó.

- **SIASSO Mobile.** Realicé el boceto inicial, presenté una primera demo y conseguí impulsar el proyecto, que luego desarrollé para tablets iOS. Esto facilitó que las auditorías se realizaran con mejor información, menos papel y una capacidad de respuesta más rápida para los equipos de Seguridad e Higiene.

## Lo que me llevo de este camino

Mirando hacia atrás, veo un recorrido que fue desde testing y bases de datos hasta el desarrollo de sistemas, el diseño de soluciones y la colaboración con equipos de negocio y tecnología. Cada etapa me ayudó a entender que construir software no es solo escribir código: también es escuchar, hacer buenas preguntas, cuidar la operación y trabajar con otras personas para resolver problemas reales.

Esas experiencias son las que hoy intento llevar a cada proyecto: curiosidad técnica, atención a los detalles, ganas de automatizar lo repetitivo y la convicción de que las mejores soluciones aparecen cuando se entiende tanto el sistema como a las personas que lo usan.
