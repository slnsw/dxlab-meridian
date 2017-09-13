// Created by Bjorn Sandvik - thematicmapping.org
(function() {
	var globeSlug = getQueryVariable('globe')
		? getQueryVariable('globe')
		: 'miranda';

	var globeConfigs = {
		coronelli: {
			map: './images/10070028-Coronelli-David-Rumsey-3000px.jpg',
			bumpMap: './images/10070028-Coronelli-David-Rumsey-3000px-bump.jpg',
			bumpScale: 0.0005
		},
		miranda: {
			// 'map': './images/a127057u_crop.jpg',
			map: './images/Miranda_Map_Working_Wraparound_Composite_4000px.jpg',
			bumpMap: './images/Miranda_Map_Working_Wraparound_Composite_4000px_bump.gif',
			bumpScale: 0.001
		}
	};

	var globeConfig = globeConfigs[globeSlug];

	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var width = window.innerWidth,
		height = window.innerHeight;

	// Earth params
	var radius = 0.5,
		segments = 32,
		rotation = 6;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
	camera.position.z = 1.5;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	scene.add(new THREE.AmbientLight(0x333333));

	var light = new THREE.DirectionalLight(0xffffff, 0.8);
	light.position.set(5, 3, 5);
	scene.add(light);

	var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation;
	scene.add(sphere);

	// var clouds = createClouds(radius, segments);
	// clouds.rotation.y = rotation;
	// scene.add(clouds)

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	render();

	function render() {
		controls.update();
		sphere.rotation.y += 0.0005;
		// clouds.rotation.y += 0.0005;
		requestAnimationFrame(render);
		renderer.render(scene, camera);
	}

	function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map: THREE.ImageUtils.loadTexture(globeConfig.map),
				// map:         THREE.ImageUtils.loadTexture('../images/6900023-Pardies-David-Rumsey.jpg'),
				// bumpMap:     THREE.ImageUtils.loadTexture('../images/a127057u_bump.jpg'),
				bumpMap: THREE.ImageUtils.loadTexture(globeConfig.bumpMap),
				// bumpScale:   0.002,
				bumpScale: globeConfig.bumpScale,
				// specularMap: THREE.ImageUtils.loadTexture('images/water_4k.png'),
				specular: new THREE.Color('grey')
			})
		);
	}

	// function createClouds(radius, segments) {
	// 	return new THREE.Mesh(
	// 		new THREE.SphereGeometry(radius + 0.003, segments, segments),
	// 		new THREE.MeshPhongMaterial({
	// 			map: THREE.ImageUtils.loadTexture('./images/fair_clouds_4k.png'),
	// 			transparent: true
	// 		})
	// 	);
	// }

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
