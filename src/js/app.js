(function () {
	// Get current version from URL
	var displayType = false;
	if (window.location.pathname.includes("/coronelli-t.html")) {
		displayType = "coronelli-t";
	}
	if (window.location.pathname.includes("/coronelli-c.html")) {
		displayType = "coronelli-c";
	}
	if (window.location.pathname.includes("/mapsroom.html")) {
		displayType = "mapsroom";
	}

	// Get current globe slug from URL
	var globeKey = getQueryVariable("globe")
		? getQueryVariable("globe")
		: "miranda";

	// also get idle timeout override value - eg set to 5 for 5 sec timeout
	var timeout = getQueryVariable("timeout")
		? getQueryVariable("timeout") * 1000
		: 30000;

	// Params
	var radius = 0.5;
	var segments = 32;
	var rotation = 15;
	var rotationSpeed = 0.0005;
	// var rotationSpeed = 0.014;
	var width = window.innerWidth;
	var height = window.innerHeight;
	var disableControls = false;

	// Globe configurations
	var globeConfigs = {
		miranda: {
			name: "Miranda's World Map",
			radius: radius,
			segments: segments,
			// map: "./images/miranda-map-unprojected-4000px.jpg",
			map: "./images/miranda-8000px.jpg",
			// bumpMap: "./images/miranda-map-unprojected-4000px-bump.gif",
			bumpMap: "./images/miranda-8000px-bump.gif",
			bumpScale: 0.0008,
			content:
				"<p>This manuscript map was produced in Lisbon in 1706, using a cylindrical projection. The coastlines of the Australian continent are duplicated on either side of the map so that when the map is wrapped around a globe, the edges overlap in line with the east coast of Australia.</p>",
			imageUrl: "./images/miranda-map-original.jpg",
			artist: "Joseph Da Costa e Miranda",
			year: "1706",
			language: "Portuguese",
			url: "https://collection.sl.nsw.gov.au/record/74VvkA2dEL83",
		},
		coronelli1: {
			name: "Coronelli Terrestrial Globe",
			radius: radius,
			segments: segments,
			// map: "./images/coronelli-terrestrial-map-unprojected-4000px.jpg",
			map: "./images/coronelli-t-8192px.jpg",
			// bumpMap: "./images/coronelli-terrestrial-map-unprojected-4000px-bump.gif",
			bumpMap: "./images/coronelli-t-8192px-bump.gif",
			bumpScale: 0.001,
			content:
				"<p>This set of 24 gores and 2 polar calottes were printed from copper engravings in 1693. Italian cartographer Vincenzo Maria Coronelli began the engravings for the 110 cm globes in 1688 following the success of the  two large 4 metre globes produced for King Louis XIV in the early 1680s.</p>",
			imageUrl: "./images/coronelli-terrestrial-map-original.jpg",
			artist: "Vincenzo Maria Coronelli",
			year: "1693",
			language: "Italian",
			url: "https://collection.sl.nsw.gov.au/record/74VvAy5EdPgg",
			credit: "David Rumsey",
		},
		coronelli2: {
			name: "Coronelli Celestial Globe",
			radius: radius,
			segments: segments,
			// map: "./images/coronelli-celestial-map-unprojected-4000px.jpg",
			map: "./images/coronelli-c-8192px.jpg",
			// bumpMap: "./images/coronelli-celestial-map-unprojected-4000px-bump.jpg",
			bumpMap: "./images/coronelli-c-8192px-bump.jpg",
			bumpScale: 0.001,
			content:
				"<p>Vincenzo Coronelli published the gores for this celestial globe in 1693. They were printed in Paris by Jean Baptiste Nolin, the engraver to the King of France.</p><p>Coronelli designed this globe to make the observer feel as though they were looking into the sky from the earth. The engraving is incredibly detailed with the names of the constellations written in Latin, Italian, French, Greek, Arabic.</p><p>Comets are included with little circles of stars and the dates when they appeared. Despite the elegant and accomplished production, Coronelli’s lack of attention to scientific details places it as both a high point and low point of globe production in the late seventeenth century.</p>",
			imageUrl: "./images/coronelli-celestial-map-original.jpg",
			artist: "Vincenzo Maria Coronelli",
			year: "1693",
			language: "Italian",
			url: "https://collection.sl.nsw.gov.au/record/74VvABRw02K3",
			credit: "David Rumsey",
		},
	};

	if (displayType === "coronelli-t") {
		globeKey = "coronelli1";
		globeConfigs = {
			coronelli1: {
				name: "Coronelli Terrestrial Globe",
				radius: radius,
				segments: segments,
				// map: "./images/coronelli-terrestrial-map-unprojected-4000px.jpg",
				map: "./images/coronelli-t-8192px.jpg",
				// bumpMap: "./images/coronelli-terrestrial-map-unprojected-4000px-bump.gif",
				bumpMap: "./images/coronelli-t-8192px-bump.gif",
				bumpScale: 0.001,
				content:
					"<p>This set of 24 gores and 2 polar calottes were printed from copper engravings in 1693. Italian cartographer Vincenzo Maria Coronelli began the engravings for the 110 cm globes in 1688 following the success of the  two large 4 metre globes produced for King Louis XIV in the early 1680s.</p>",
				imageUrl: "./images/coronelli-terrestrial-map-original.jpg",
				artist: "Vincenzo Maria Coronelli",
				year: "1693",
				language: "Italian",
				url: "https://collection.sl.nsw.gov.au/record/74VvAy5EdPgg",
				credit: "David Rumsey",
			},
		};
	}

	if (displayType === "coronelli-c") {
		globeKey = "coronelli2";
		globeConfigs = {
			coronelli2: {
				name: "Coronelli Celestial Globe",
				radius: radius,
				segments: segments,
				// map: "./images/coronelli-celestial-map-unprojected-4000px.jpg",
				map: "./images/coronelli-c-8192px.jpg",
				// bumpMap: "./images/coronelli-celestial-map-unprojected-4000px-bump.jpg",
				bumpMap: "./images/coronelli-c-8192px-bump.jpg",
				bumpScale: 0.001,
				content:
					"<p>Vincenzo Coronelli published the gores for this celestial globe in 1693. They were printed in Paris by Jean Baptiste Nolin, the engraver to the King of France.</p><p>Coronelli designed this globe to make the observer feel as though they were looking into the sky from the earth. The engraving is incredibly detailed with the names of the constellations written in Latin, Italian, French, Greek, Arabic.</p><p>Comets are included with little circles of stars and the dates when they appeared. Despite the elegant and accomplished production, Coronelli’s lack of attention to scientific details places it as both a high point and low point of globe production in the late seventeenth century.</p>",
				imageUrl: "./images/coronelli-celestial-map-original.jpg",
				artist: "Vincenzo Maria Coronelli",
				year: "1693",
				language: "Italian",
				url: "https://collection.sl.nsw.gov.au/record/74VvABRw02K3",
				credit: "David Rumsey",
			},
		};
	}

	// Set up Vue instance
	var vueApp = new Vue({
		el: "#app",
		data: {
			items: globeConfigs,
			globeKey: globeKey,
			title: null,
			content: null,
			year: null,
			language: null,
			isLoading: true,
			isMoreModalOpen: false,
			isAboutModalOpen: false,
			isGlobeMenuOpen: false,
			t: null,
			userHasInteracted: false,
		},
		methods: {
			changeGlobe: function (newGlobeKey) {
				var oldGlobeKey = this.$data.globeKey;
				var oldGlobe = spheres[oldGlobeKey];
				var newGlobe = spheres[newGlobeKey];

				if (oldGlobeKey !== newGlobeKey) {
					newGlobe.material.opacity = 1;
					oldGlobe.material.transparent = true;
					newGlobe.material.transparent = true;

					scene.add(spheres[newGlobeKey]);

					// Animate globes
					TweenLite.to(oldGlobe.material, 0.2, {
						opacity: 0,
						onComplete: function () {
							scene.remove(oldGlobe);
						},
					});
					TweenLite.from(newGlobe.material, 0.2, { opacity: 0, delay: 0.2 });

					this.$data.globeKey = newGlobeKey;
					globeKey = newGlobeKey;

					if (history.pushState) {
						var newurl =
							window.location.protocol +
							"//" +
							window.location.host +
							window.location.pathname +
							"?globe=" +
							newGlobeKey +
							(timeout !== 30000 ? "&timeout=" + timeout / 1000 : '');
							
						window.history.pushState({ path: newurl }, "", newurl);
					}
				}

				this.$data.isGlobeMenuOpen = false;
			},
			toggleMoreModal: function () {
				this.$data.isMoreModalOpen = !this.$data.isMoreModalOpen;
				this.$data.isAboutModalOpen = false;
				this.$data.isGlobeMenuOpen = false;
				disableControls = this.$data.isMoreModalOpen;
			},
			toggleAboutModal: function () {
				this.$data.isAboutModalOpen = !this.$data.isAboutModalOpen;
				this.$data.isMoreModalOpen = false;
				this.$data.isGlobeMenuOpen = false;
				disableControls = this.$data.isAboutModalOpen;
			},
			toggleGlobeMenu: function () {
				this.$data.isGlobeMenuOpen = !this.$data.isGlobeMenuOpen;
			},
			closeModals: function () {
				this.$data.isAboutModalOpen = false;
				this.$data.isMoreModalOpen = false;
				this.$data.isGlobeMenuOpen = false;
				disableControls = false;
			},
			hideLoading: function () {
				this.$data.isLoading = false;
			},
			resetOnIdle: function () {
				window.onload = function () {
					this.resetTimerOnly();
				}.bind(this);
				window.addEventListener(
					"mousemove",
					function () {
						this.resetTimer();
					}.bind(this),
					true
				);
				// catches touchscreen presses as well
				window.addEventListener(
					"mousedown",
					function () {
						this.resetTimer();
					}.bind(this),
					true
				);
				// catches touchscreen swipes as well
				window.addEventListener(
					"touchstart",
					function () {
						this.resetTimer();
					}.bind(this),
					true
				);
				// catches touchpad clicks as well
				window.addEventListener(
					"click",
					function () {
						this.resetTimer();
					}.bind(this),
					true
				);
				window.addEventListener(
					"keydown",
					function () {
						this.resetTimer();
					}.bind(this),
					true
				);
				window.addEventListener(
					"scroll",
					function () {
						this.resetTimer();
					}.bind(this),
					true
				);
			},
			resetPage: function () {
				// reset globe to starting position
				if (this.$data.userHasInteracted && camera) {
					this.closeModals();
					TweenLite.to(camera.rotation, 2, {
						x: -0.152,
						y: 0,
						z: 0,
					});
					TweenLite.to(camera.position, 2, { x: 1.3, y: 0.2, z: 0 });
					TweenLite.to(camera.up, 2, { x: 0, y: 1, z: 0 });
				}
			},
			resetTimerOnly: function () {
				clearTimeout(this.$data.t);
				this.$data.t = setTimeout(
					function () {
						this.resetPage();
					}.bind(this),
					timeout
				); // time is in milliseconds
			},
			resetTimer: function () {
				this.$data.userHasInteracted = true;
				clearTimeout(this.$data.t);
				this.$data.t = setTimeout(
					function () {
						this.resetPage();
					}.bind(this),
					timeout
				); // time is in milliseconds
			},
		},
		mounted: function () {
			if (displayType !== false) {
				setTimeout(this.resetOnIdle(), 300);
			}
		},
	});

	// Set up Three JS scene and objects
	var webglEl = document.getElementById("webgl");

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var scene = new THREE.Scene();
	scene.add(new THREE.AmbientLight(0x333333));

	// Make camera position responsive to browser width
	var cameraDepth = (1 / width) * 10000 + 40;

	var camera = new THREE.PerspectiveCamera(
		cameraDepth,
		width / height,
		0.01,
		1000
	);
	camera.position.z = 1.3; // start with bigger globe, was 1.5
	camera.position.y = 0.2;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	webglEl.appendChild(renderer.domElement);

	var light = new THREE.DirectionalLight(0xffffff, 0.7);
	light.position.set(5, 3, 5);
	scene.add(light);

	var spheres = createSpheres(globeConfigs);
	spheres[globeKey].rotation.y = rotation;
	spheres[globeKey].material.transparent = true;
	// scene.add(spheres[globeKey]);

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	window.addEventListener("resize", onWindowResize, false);

	render();
	// console.log(camera);
	// ThreeJS Functions
	function render() {
		if (!disableControls) {
			controls.update();
		}

		// slowly rotate the globe
		spheres[globeKey].rotation.y += rotationSpeed;

		// keep light source near camera
		var p = camera.position;
		var q = new THREE.Vector3();
		q.x = p.x;
		q.y = p.y;
		q.z = p.z;
		var yaxis = new THREE.Vector3(0, 1, 0);
		var angle = Math.PI / 4;
		q.applyAxisAngle(yaxis, angle);
		var zaxis = new THREE.Vector3(0, 0, 1);
		var angle2 = Math.PI / 6;
		q.applyAxisAngle(zaxis, angle2);
		light.position.copy(q);

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	// instantiate a loader
	var loader = new THREE.ImageLoader();

	// load a image resource
	loader.load(
		// resource URL
		"./images/miranda-map-unprojected-4000px.jpg",
		// Function when resource is loaded
		function (image) {
			// do something with it
			scene.add(spheres[globeKey]);
			vueApp.hideLoading();

			// like drawing a part of it on a canvas
			// var canvas = document.createElement( 'canvas' );
			// var context = canvas.getContext( '2d' );
			// context.drawImage( image, 100, 100 );
		},
		// Function called when download progresses
		function (xhr) {
			console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
		},
		// Function called when download errors
		function (xhr) {
			console.log("An error happened");
		}
	);

	function createSphere(args) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(args.radius, args.segments, args.segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture(args.map),
				bumpMap: THREE.ImageUtils.loadTexture(args.bumpMap),
				bumpScale: args.bumpScale,
				specular: new THREE.Color("grey"),
			})
		);
	}

	function createSpheres(globeConfigs) {
		const result = {};

		Object.keys(globeConfigs).forEach(function (slug) {
			result[slug] = createSphere(globeConfigs[slug]);
		});

		return result;
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture("./images/galaxy-starfield.png"),
				side: THREE.BackSide,
			})
		);
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	// Get query variable from URL
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return false;
	}

	// Animation Functions
	function trackOriginalOpacities(mesh) {
		var opacities = [],
			materials = mesh.material.materials
				? mesh.material.materials
				: [mesh.material];
		for (var i = 0; i < materials.length; i++) {
			materials[i].transparent = true;
			opacities.push(materials[i].opacity);
		}
		mesh.userData.originalOpacities = opacities;
	}

	function fadeMesh(mesh, direction, options) {
		options = options || {};
		// set and check
		var current = { percentage: direction == "in" ? 1 : 0 },
			// this check is used to work with normal and multi materials.
			mats = mesh.material.materials
				? mesh.material.materials
				: [mesh.material],
			originals = mesh.userData.originalOpacities,
			easing = options.easing || TWEEN.Easing.Linear.None,
			duration = options.duration || 2000;
		// check to make sure originals exist
		if (!originals) {
			console.error(
				"Fade error: originalOpacities not defined, use trackOriginalOpacities"
			);
			return;
		}
		// tween opacity back to originals
		var tweenOpacity = new TWEEN.Tween(current)
			.to({ percentage: direction == "in" ? 0 : 1 }, duration)
			.easing(easing)
			.onUpdate(function () {
				for (var i = 0; i < mats.length; i++) {
					mats[i].opacity = originals[i] * current.percentage;
				}
			})
			.onComplete(function () {
				if (options.callback) {
					options.callback();
				}
			});
		tweenOpacity.start();
		return tweenOpacity;
	}
})();
