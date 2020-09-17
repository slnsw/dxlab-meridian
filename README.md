# DX Lab: Meridian

## Introduction

The State Library of NSW owns a stunning collection of maps from the 17th and 18th centuries. Normally under lock and key in our underground stacks, Meridian brings these artefacts to life as interactive 3D globes.

- View it here: http://dxlab.sl.nsw.gov.au/meridian
- Read the blog post: http://dxlab.sl.nsw.gov.au/making-meridian/

![Meridian website](http://dxlab.sl.nsw.gov.au/meridian/images/screenshot.jpg)

This repository contains all code and project files.

### Maps

- [Miranda's World Map](https://collection.sl.nsw.gov.au/record/74VvkA2dEL83)
- [Coronelli Terrestrial Globe](https://collection.sl.nsw.gov.au/record/74VvAy5EdPgg)
- [Coronelli Celestial Globe](https://collection.sl.nsw.gov.au/record/74VvABRw02K3)

With more to come...

### Technology

Meridian can be served as a static HTML application. The following Javascript libraries are used:

- [three.js](https://threejs.org)
- [Vue.js](https://vuejs.org)
- [TweenLite](https://greensock.com/tweenlite)

For local development, Node.js is used in conjunction with the following libraries:

- [Express](https://expressjs.com/)
- [Webpack](https://webpack.js.org)
- [Browsersync](https://www.browsersync.io/)

## Getting Started

Make sure Node.js is installed, then clone and run:

```
$ npm install
$ npm run dev
```

Then go to `http://localhost:3001` to see the app in action! `Browsersync` will detect changes in the code and update on the fly.

## Deployment

Just copy the `/build` folder to any server.

Internally, we use `vercel` for deployments. Environments variables are on Vercel's dashboard.

```
$ npm run deploy
```

## Credits

Many thanks goes to [Bjørn Sandvik](https://github.com/turban) from [mastermaps.com](http://mastermaps.com). His tutorial (http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html) provided the basis for this project.

In addition, [David Rumsey](https://www.davidrumsey.com/) has kindly given us permission to use his unprojected image of the [Coronelli Terrestrial Map](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~288576~90060319:Composite--Unprojected--Geographic-?qvq=w4s:/what%2FGlobe%2Bgores%2F;lc:RUMSEY~8~1&mi=5&trs=42#) and [Coronelli Celestial Map](https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~327948~90096567:Composite--Unprojected--Geographic-?sort=pub_list_no_initialsort%2Cpub_list_no_initialsort%2Cpub_date%2Cpub_date&qvq=q:10570.000;sort:pub_list_no_initialsort%2Cpub_list_no_initialsort%2Cpub_date%2Cpub_date;lc:RUMSEY~8~1&mi=1&trs=42).

## License

This project is licensed under the Creative Commons Attribution 4.0 International license. See [LICENSE](LICENSE) for more detail.
