# DX Lab: Meridian

## Introduction

The State Library of NSW has a unique collection of maps from the 16th and 17th century. The Meridian project seeks to reimagine these maps as interactive 3D globes using  open source web technologies.

View it here: http://dxlab.sl.nsw.gov.au/meridian

This repository contains all code and project files. It is freely available for re-use and reference.

### Maps

- [Miranda's World Map](http://digital.sl.nsw.gov.au/delivery/DeliveryManagerServlet?embedded=true&toolbar=false&dps_pid=IE3538803)
- [Coronelli Terrestrial Globe](http://digital.sl.nsw.gov.au/delivery/DeliveryManagerServlet?embedded=true&toolbar=false&dps_pid=IE3775803)

With more to come...

### Technology

Meridian can be served as a static HTML application. The following Javascript libraries are used:

- [three.js](https://threejs.org)
- [Vue.js](https://vuejs.org)
- [TweenLite](https://greensock.com/tweenlite)

For local development, Node.js is used in conjunction with the following libraries:

- [Express](https://expressjs.com/)
- [Browsersync](https://www.browsersync.io/)

## Getting Started

Make sure Node.js is installed, then clone and run:

```
$ npm install
$ npm run dev
```

Then go to `http://localhost:3001` to see the app in action! `Browsersync` will detect changes in the code and update on the fly.

## Deployment

Just copy the `/public` folder to any server.

Internally, we use `now` for deployments.

## Credits

Many thanks goes to [Bjørn Sandvik](https://github.com/turban) from [mastermaps.com](http://mastermaps.com). His tutorial (http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html) provided the basis for this project.

In addition, [David Rumsey](https://www.davidrumsey.com/) has kindly given us permission to use his unprojected image of the [Coronelli Terrestrial Map](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~288576~90060319:Composite--Unprojected--Geographic-?qvq=w4s:/what%2FGlobe%2Bgores%2F;lc:RUMSEY~8~1&mi=5&trs=42#).
