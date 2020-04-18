# Twinbo Gemelo Digital

## Descripción del proyecto

Twinbo es el frontend utlizado para el desarrollo de un gemelo digital de una embarción propulsada por energia solar. Se trata de una aplicación nativa para las plataformas basadas en Unix y para Windows. Se ha desarrollado utilizando el framework para aplicaciones web *Angular* y el framework *Electron* para el desarrollo de aplicaciones gráficas de escritorio empleando componentes originalmente desarrollados para aplicaciones web.

Consta de tres pantanllas principales:

* **Portada**. Muestra el logo y el acceso a las otras 2 pantallas.
* **Simulación**. Muestra el desplazamiento del barco solar en el agua dados unos parametros ambientales fijos.
* **Estadísticas**. Mediante una serie de gráficas bidimensionales muestra la correlacion entre distintas variables de entrada y de salida.

Tanto las gráficas como la simulación han sido desarrolladas basandose en un modelo de fisica basica del movimiento de un objeto en un fluido cuando se le aplicacan distintas fuerzas. La idea para aplicar a un gemelo digital completo sería obtener (mediante ensayos reales) los distintos parámetros de salida que se valorán en la pantalla *Estadísticas* (velocidad terminal, tiempo en alcanzar la velocidas terminal y potencia generada por la placa fotovoltaica) y ajustar el modelo físico comentado anteriormente para que se ajuste con la realidad del barco.

Por la falta de pruebas reales es posible que ciertos fenómenos físicos no sean contemplados por el modelo virtual.

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) version 9.0.4.

## Requisisitos

* Nodejs
* Angular-cli `npm install -g @angular/cli`
* Electron `npm install electron --save-dev`
* Install node dependencies `npm install`

## Servidor para desarrollo

Ejecuta  `ng serve` para un servidor para desrrollo. Navega hacia `http://localhost:4200/`. La aplicacion se recargará de foram automática si se cambia cualquiera de sus ficheros fuente.

## Construir

Ejecuta `ng build` para construir el proyecto. Los elementos generados seran guardados en el directorio `dist/`. Usa la bandera  `--prod` para la construcción para produccion.

## Ejecutar test unitarios

Ejecuta `ng test` pora correr test unitarios via [Karma](https://karma-runner.github.io).

## Ejecutar test fin a fin

Ejecuta `ng e2e` para currer test fin a fin via [Protractor](http://www.protractortest.org/).

## Construir y ejecutar aplicacion nativa

Ejecuta `npm run build-electron` para construir el proyecto y abrir la aplicación.

## Ejecutar aplicacion nativa

Ejecuta `npm run electron` para ejecutar la aplicación ya compilada.