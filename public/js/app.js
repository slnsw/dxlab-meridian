(function() {
	// Get current globe slug from URL
	var globeSlug = getQueryVariable('globe')
		? getQueryVariable('globe')
		: 'miranda';

	// Globe params
	var radius = 0.5;
	var	segments = 32;
	var	rotation = 0;

	var globeConfigs = {
		miranda: {
			name: 'Miranda',
			radius: radius,
			segments: segments,
			map: './images/Miranda_Map_Working_Wraparound_Composite2_4000px.jpg',
			bumpMap:
				'./images/Miranda_Map_Working_Wraparound_Composite2_4000px_bump.gif',
			bumpScale: 0.0008
		},
		coronelli1: {
			name: 'Coronelli Terrestrial',
			radius: radius,
			segments: segments,
			map: './images/10070028-Coronelli-David-Rumsey-3000px.jpg',
			bumpMap: './images/10070028-Coronelli-David-Rumsey-3000px-bump.jpg',
			bumpScale: 0.0005
		}
	};

	var vueApp = new Vue({
	  el: '#app',
	  data: {
	    items: globeConfigs,
			globeSlug: globeSlug
	  },
	  methods: {
	    changeGlobe: function (newGlobeSlug) {
				scene.remove(spheres[this.$data.globeSlug]);
				scene.add(spheres[newGlobeSlug]);
				this.$data.globeSlug = newGlobeSlug;
				globeSlug = newGlobeSlug;
	    }
	  }
	})

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width = window.innerWidth;
	var height = window.innerHeight;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 0.7);
	light.position.set(5, 3, 5);
	scene.add(light);

	var spheres = createSpheres(globeConfigs);

	spheres[globeSlug].rotation.y = rotation;
	scene.add(spheres[globeSlug]);

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		spheres[globeSlug].rotation.y += 0.0005;

		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(args) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(args.radius, args.segments, args.segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture(args.map),
				bumpMap: THREE.ImageUtils.loadTexture(args.bumpMap),
				bumpScale: args.bumpScale,
				// specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular: new THREE.Color('grey')
			})
		);
	}

	function createSpheres(globeConfigs) {
		const result = {};

		Object.keys(globeConfigs).forEach(function(slug) {
			result[slug] = createSphere(globeConfigs[slug]);
		});

		return result;
	}

	function createStars(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture('./images/galaxy_starfield.png'),
				side: THREE.BackSide
			})
		);
	}

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return false;
	}
})();
