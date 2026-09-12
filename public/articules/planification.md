# Planificación en software

Muchos desarrolladores de software hoy en día se saltean este paso crucial en el la vida del software, sin embargo ¿Qué pensarías si te digo que es el paso MAS importante de todos? Que si, que si, pensar una funcionalidad nueva, un cambio en un botón, implementar esa caché que mejora la performance de todo, cambiar a una nueva tecnología para producir el efecto "WoW" puede sonar tentador e incluso más rápido que planificarlo antes ¿Realmente sabemos si esos cambios nos llevará a buen puerto?

Todos podemos planificar cosas y nunca va a ser una igual a la otra. No es lo mismo planificar una escapa de fin de semana que unas vacaciones de noventa días recorriendo Europa de mochilero. Con esa premisa, tampoco es lo mismo planificar un MVP para evaluar como reacciona un nicho en particular, que planificar un cambio arquitectonico de un sistema bancario legacy que solo Dios y el binario compilado saben como funcionan.

Es por eso que la planinficación en estapas tempranas, lo más detallado posible, nos puede ahorrar un montón de dolores de cabeza a futuro. Además, nos ayuda a evitar que demos pasos erroneos o incluso pedir la opinión de expertos que ya transitaron lo que estamos por realizar (y, a veces, ni siquiera hace falta que haya expertos: gente sin experiencia, en su ignorancia, hace preguntas correctas en el momento correcto).

## Etapas de una planificación

Al planificar nuevos sistemas, mejoras en los existentes o incluso deprecados de código siempre tenemos que tener en cuenta algunos pasos que nos adelanta lo que puede pasar con el proyecto. Es importante contestar, aunque sea brevemente, cada uno de los puntos y sobre todo dejarlo DOCUMENTADO en alguna carpeta en común a quienes tomen las decisiones importantes relacionado a estos proyectos. No debería ser un archivo creado para ese momento, ya que luego nos servirá de registro en toma de decisiones futura.

_Este documento que menciono, el registro de toma de decisiones, no es un documento oficial de ninguna multinacional en la que he trabajado. Sin embargo, yo considero muy buena practica crear y tener uno, más hoy en día con la Inteligencia Artificial dando vuelta, ya que deja un registro de las experiencias buenas y malas que una persona u organización ha tenido en el pasado._

### Definición de alcance y objetivos

Tener en claro qué es lo que se busca con un nuevo software nos va a dar el tamaño del lienzo de aquello que querramos desarrollar. Además, esto es la base fundamental para saber hasta donde es sano pensar.

Hay respuestas básicas a preguntas que tenemos que hacernos, por que son sanas y por que nos permiten limitar las solicitudes de los cambios sin llegar a replanificar todo, incumplir fechas y por sobretodo *alinear expectativas* entre todos los involucrados:

- *¿Qué problema real resuelve este desarrollo y a qué usuario o cliente beneficia directamente?*

- *¿Cuál es el indicador clave de rendimiento (KPI) o métrica de negocio que dictará si el proyecto fue exitoso?*

- *¿Por qué se prioriza este desarrollo en este momento frente a otras iniciativas?*

Estas tres preguntas nos permiten establecer objetivos de negocio y un proposito para hacer el desarrollo. Hacer un proyecto por que suena lindo puede ser algo aceptable, sin embargo, hacer un proyecto porque resuelve una problematica real y medible por sobre otros problemas suena aún mejor que aceptable.

Sin embargo, algo que suele suceder MUCHO en el desarrollo de nuevas funcionalidades, cambios en modulos o proyectos nuevos es que la gente tiende a tener una lluvia de ideas no solo en la etapa de planificación sino también en la etapa de desarrollo y pruebas. 

Esto lo que provoca es que el alcance inicial se estire más de lo deseado, con el riesgo de que lo planteado en un principio no se cumpla, e incluso introducir errores en los sistemas simplemente por el apuro de meter la novedad que dijo alguien en una reunión.

Para evitar esto nos tenemos que preguntar:

- *¿Qué funcionalidades mínimas e indispensables conforman la versión inicial (MVP)?*

- *¿Qué características o módulos quedan explícitamente fuera de esta entrega (lista de exclusiones o no-goals) para evitar falsas expectativas?*

- *¿Qué supuestos clave estamos dando por ciertos que, de cambiar, alterarían drásticamente el alcance?*

Al tener la respuestas a estas preguntas sabremos que tenemos establecidos firmemente los requerimientos funcionales y no funcionales, el propósito principal del software, los límites del proyecto y los entregables esperados para alinear las expectativas entre el cliente y el equipo técnico.

Por último, como "broche de oro" hay dos preguntas más que esta SUPER bien tener documentadas y clarificadas para que los equipos de producto, desarrollo e interesados tengan en claro el fin del proyecto:

- *¿Cómo se definirá, de forma objetiva y binaria, que una funcionalidad está terminada y cumple con lo esperado?*

- *¿Quiénes son los actores responsables de validar y dar el visto bueno final al alcance acordado?*

De esta forma, quien diseñe sabe cual es el objetivo a alcanzar, quien programe sabe qué debe ser el resultado del sistema, quien lo use sabe qué debería esperar.

Todo lo que esté por fuera de esta planificación puede ser renegociado en cualquier de sus formas: tiempos, recursos, alcances. 

> **NOTA:** Aunque suene muy serio todo, tener documentación minima que aborde estos puntos puede activar o desactivar un proyecto como así también una subtarea de una historia de usuario que nadie le está prestando realmente atención.

### Análisis de viabilidad y costos

Saber qué se quiere hacer, cómo medirlo y qué impacto puede tener con el uso diario en clientes, personas o empresas no siempre es suficiente para poder determinar que una planificación está hecha.

Te voy a llevar un ejemplo fuera de IT. Imaginate que estás por conocer a una persona nueva, una potencial pareja: planificas donde van a ir por primera vez, de qué van a charlar, qué ropas te vas a poner, para donde van a ir al terminar el día. Luego de toda la cita va a pasar una de dos cosas: se siguen viendo o no se ven nunca más pero... ¿El resultado de qué es esa decisión? Basicamente, de que esa persona te haya demostrado que va a darte algo que amerite el esfuerzo de vos cuidar esa relación todos los días.

En software pasa algo similar. Los programas que usamos, que planteamos, que diseñamos requieren cierto esfuerzo en su mantenimiento y es algo que va más allá que el costo que tiene diseñar, codificar y probar cada funcionalidad. Por eso cuando planificamos es necesario, además de armar todo lo que tenemos que hacer, pensar en el post-producción para que el proyecto no se muera antes de dar dos pasos. El impacto financiero es real y es un riesgo muy grande.

Tenemos que poder tener una idea de la viabilidad técnica de nuestros proyectos, no solo por nosotros sino también por el equipo y las herramientas disponibles:

- *¿Tenemos el stack tecnológico, las herramientas y el conocimiento necesario en el equipo, o vamos a pasar la mitad del tiempo aprendiendo a los ponchazos?*

Esto no solo nos puede estirar los tiempos de desarrollo, pruebas y puestas en producción. Lo que puede provocar, si no lo tenemos en cuenta, son lios mucho más profundos: vulnerabilidades críticas, exposición de información sensible, problemas legales con clientes que usen nuestros sistemas. No todo es un "ENCIENDO Y ANDA!"

- *¿Dependemos de servicios de terceros (APIs, pasarelas de pago, nubes) cuyas políticas, costos o estabilidad puedan cambiar de la noche a la mañana?*

Con la constante evolución de los servicios que ofrecen los proveedores, tenemos que añadir esta variable a la planificación. Un ejemplo: Los modelos LLM para chatbots. Muchos de estos son pagos, y también muchos de estos cambian todo el tiempo el costo por tokens o el uso que se le puede dar. ¿Es necesario ese servicio de IA o se puede realizar un bot de flujo guiado que cumpla con el mismo objetivo?

- *¿La arquitectura propuesta puede escalar si el negocio crece de golpe, o se va a romper al primer pico de tráfico?*

Y con esta última pregunta se aborda el tema de infraestructura. A veces en la planificación incluimos tecnología que simplemente no aguanta o es tan básica que cuando se consigue un _HIT_ con mucha gente, el sistema colapsa. 

Está muy bien imaginar los caminos que podría llegar a recorrer nuestro sistema aunque eso no signifique elegir una u otra arquitectura, una u otra tecnología, uno u otro proveedor.

> **Es como siempre les digo a mis amigos**: Si hoy vengo y te digo "Me tenes que contestar ahora o no se te da la oportunidad nunca más: Tengo un millon de dolares para que hagas tu proyecto como vos quieras, pero me tenes que asegurar que funciona, ¿tenes el plan y sus posibles problematicas?" 

La respuestas de estas preguntas nos introducen, casi obligatoriamente, a otro tipo de preguntas que a un desarrollador capaz no le interesa tanto en su día a día pero te puedo asegurar que a quien saca plata de su bolsillo para poder desarrollar un sistema eficiente SI le interesa.

Estas preguntas un poco más profundas puede ser:

- *¿Cuánto cuesta realmente este proyecto, no solo en horas de desarrollo, sino en infraestructura mensual fija (servidores, bases de datos, licencias)?*

Y te voy a hacer sincero, uno no piensa mucho en estas cosas en proyectos chicos, sin embargo es importante tenerlas en cuenta. 

Te voy a poner un ejemplo: imaginate que haces un sistema que se encarga de mandar un mail por día con una imagen de 500kb a un cliente, este mail queda almacenado en tu google drive. 30GB al mes de Google drive vale 0.80$, cada 60.000 mails llenas el almacenamiento, si solo tuvieras 2000 clientes esto se llena en 1 mes. Solamente mandando un mail.

Este ejemplo es demasiado básico, en el día a día hay muchísimas mas variables: costos de mantener la aplicación levantada, el tamaño de la base de datos, el tráfico que se tiene, costos de mantenimiento de servidores, dominios y un largo etcetera.

Y algo que muchas empresas hacen, aunque nunca se lo vea publicado, es reducir estos costos. Transformación de datos, limpieza de datasets, TTL en observabilidad, controles de cardinalidad, apagado automatico de instancias, balanceadores de carga entre proveedores. A veces el ahorro en miles de dolares es abismal solo por hacer este mantenimiento de infraestructura, datos y transformaciones.

- *¿El retorno de inversión (ROI) o el valor de negocio que aporta justifica la plata y el tiempo invertido frente a otras alternativas más sencillas?*

No te confundas, aunque lo parezca, no todo es plata. El valor de negocio también puede ser otro tipo de "activo". Por ejemplo, un área de soporte al usuario no genera dinero normalmente, sin embargo genera algo más poderoso para las empresas: la confianza de sus clientes.

Cuando uno planifica un proyecto de software puede justificar plata, esfuerzo, tiempo poniendo algo de valor en frente.

Un patrón que cuida a sus empleados invertirá en un buen sistema de seguridad e higiene ambienteal, un CEO que quiere más plata invertirá en un buen sistema de ventas, un buen banquero que quiera más clientela invertirá en un buen sistema de prestamos y cobros. **¿Cómo vas a justificar que lo que haces aporta realmente algo positivo a la causa?**

Por último, un costo que es extremadamente raro que se mencione en cualquier ambito, es el costo del soporte y mantenimiento del sistema pero también está ahí y se puede planificar y documentar: ¿quién responde cuando algo no funciona correctamente? ¿el sistema será huerfano y autogestionado? ¿va a requerir que alguien sepa como funciona, cómo lo capacito? ¿Hay resistencia cultural en su adopción? 

> Todas estas cosas, que son aditivas a la planificación de alcances y objetivas, lo que provocan es que pasemos de pensar "hagámoslo porque está genial" a un "es viable, sabemos cuanto cuesta y entendemos que riesgos estamos asumiendo". Nadie quiere gastar tiempo, esfuerzo y estresarse para un proyecto que no caminará.

### Estimación de tiempos y esfuerzo

Esta parte de la planificación suele ser subestimada por que cuando alguien da luz verde en un proyecto lo siguiente es decir "¿Cuanto se demora?" y la realidad es que la papa caliente suele estar en este paso, ni hablar de que quien tiene el poder de responder puede estresar a todo el mundo con las palabras que elija al responder.

Como consejo personal, para contestar esto, es valido Y SANO decir "dame un rato, lo entiendo, lo evaluamos y te armo una estimación". En esta parte de la planificación debe involucrarse los equipos tecnicos, aunque sean algunos pocos referentes que conozcan a sus equipos, y no debe ser tarea de una única persona con idea de lo que se quiere hacer la que de el resultado final.

Olvidemonos por un rato del software para poder entender la complejidad que tiene esta etapa de la planificación. Te diría que cierres los ojos e imagines, pero prestá atención a lo que lees e imagina esta situación:

_El mes que viene te mudas de casa, en un fin de semana lo liquidas todo. Fuiste, viniste, tenes que dejar todo impecable._

La frase es maravillosa, tenes un fin de semana entero para mudarte. Suena facil, sabes lo que hay que mover (todo lo que está adentro de tu casa), y es posible que cuentes con ayuda de algún familiar o algún amigo. Tiene que salir, son dos días completos para eso.

Sin embargo, cuando llega el sábado a las 8 de la mañana y estás por empezar te das cuenta de las cosas que obviaste: no compraste cajas, la ropa del placar está toda sin doblar, el colchón ni siquiera entra en el ascensor, el flete que pediste no puede esperar más de dos horas y encima te dice que se atraso y va a llegar a cualquier hora de la tarde.

Algo que pasa con esta situación es que definimos una macro tarea demasiado grande, transformandola en una únidad de medida inutil. La realidad, es que en esas macro tareas se esconden una infinidad de micro tareas, y a veces son invisibles o tan obvias que se pasan por alto, en conjunto suman un montón de trabajo y posibles riesgos para terminar con el proyecto.

Es por eso que cuando planificamos y queremos estimar tiempos y esfuerzos hay que dividir el problema en pedazos tan chicos que se puedan dimensionar sin miedo: comprar 30 cajas el martes, armar la cocina el miercoles, desarmar la cama el viernes a la noche o en lugar de "crear el sistema de usuarios" tener tareas como armar la tabla en la base de datos, crear formulario de registro, validar el email de bienvenida.

Hacer esto no solo nos va a dar la posibilidad de decir cuanto tiempo podemos tardar o cuantos recursos vamos a usar, también vamos a empezar a ver cosas que en un diseño inicial posiblemente no tuvimos en cuenta y el plan se debe reajustar a estas realidades. Es parte normal de la planificación darnos cuenta de cosas que vamos a romper, de cosas que vamos a construir, e incluso también nos podemos dar cuenta cuando estamos estimando algo a ciegas con requerimientos oscuros. 

Por este motivo, es importante que la estimación de tiempos y esfuerzo no lo haga una única persona y se involucren los equipos tecnicos. A veces son ellos quienes tienen verdades absolutas o conocimientos que un gerente, director o simplemente alguien con la idea no tiene. Ellos te pueden frenar y decir, vas a necesitar cinta de embalar acá o exponerte riesgos como si fuera que el flete nunca va a llegar a esa mudanza por que no le pagaste lo suficiente.

Esas charlas nos pueden llevar a realidades que uno tiene que considerar seriamente para el cumplimiento de los objetivos que se quisieran hacer. Por ejemplo, desglosamos todo y nos damos cuenta que en lugar de tener el sistema para la semana que viene lo vamos a tener en mes y medio ¿Sirve para ese entonces o hay una fecha importante que se debe cumplir? ¿Se pueden asignar mas recursos? ¿Hay tareas que se pueden hacer paralelamente? ¿Una sola persona es suficiente o necesito más?

Por último, y no por eso menos importante, hay una realidad inamovible en la etapa de planificación que suele afectar mucho a la estimación de tiempos y esfuerzo: las contingencias, los imprevistos, la ley de murphy o cómo quieras llamarlo. Toda planificación debe considerar un tiempo donde se va a desviar todo a lugares que uno no conoce.

Van a salir bugs, van a salir reuniones, van a caerse servicios, recursos se van a tener que reasignar, cualquier cosa puede pasar. Y una buena planificación siempre debe tener un cierto porcentaje de tolerancia a esas cosas sin que falle todo el plan y logre su objetivo de igual manera.

A cada tarea, macro y mini, hay que asignarle recursos, roles y definir el trabajo necesario para poder asignar responsabilidades, tiempos y disponibilidad según habilidades. Esto nos permite ver con claridad qué tan grave es esa tarea si por alguna razón se atrasa o no se hace de acuerdo al plan, nos permite tener un plan B en caso de necesitarlo y saber qué otro paso del plan va a ser afectado en consecuencia.

```En construcción... ```

### Gestión de riesgos



Identificar posibles obstáculos técnicos, bloqueos de seguridad, dependencias externas o rotación de personal, estableciendo planes de mitigación y contingencia.

### Establecimiento de hitos y cronograma
Mapear la hoja de ruta (roadmap) del proyecto definiendo fechas de entrega parciales (sprints o versiones Alfa/Beta) y el lanzamiento final en producción.

### Definición del plan de pruebas y calidad
Planificar cómo se validará el software en cada etapa mediante pruebas unitarias, de integración, de rendimiento y de aceptación del usuario (UAT).