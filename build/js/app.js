(function() {
	// Get current globe slug from URL
	var globeKey = getQueryVariable('globe')
		? getQueryVariable('globe')
		: 'miranda';

	// Params
	var radius = 0.5;
	var	segments = 32;
	var	rotation = 15;
	var width = window.innerWidth;
	var height = window.innerHeight;

	// Globe configurations
	var globeConfigs = {
		miranda: {
			name: 'Miranda\'s World Map',
			radius: radius,
			segments: segments,
			map: '/images/Miranda_Map_Working_Wraparound_Composite2_4000px.jpg',
			bumpMap:
				'/images/Miranda_Map_Working_Wraparound_Composite2_4000px_bump.gif',
			bumpScale: 0.0008,
			content: '<p>This manuscript map was produced in Lisbon in 1706, using a cylindrial projection. The coastines of the Australian continent are duplicated on either side of the map so that when the map is wrapped around a globe, the edges overlap in line with the east coast of Australia.</p>',
			artist: 'Joseph Da Costa E Miranda',
			year: '1706',
			language: 'Portuguese',
			url: 'http://digital.sl.nsw.gov.au/delivery/DeliveryManagerServlet?embedded=true&toolbar=false&dps_pid=IE3538803'
		},
		coronelli1: {
			name: 'Coronelli Terrestrial Globe',
			radius: radius,
			segments: segments,
			map: '/images/10070028-Coronelli-David-Rumsey-4000px.jpg',
			bumpMap: '/images/10070028-Coronelli-David-Rumsey-4000px_bump.gif',
			bumpScale: 0.0005,
			content: '<p>This set of 24 gores and 2 polar calottes were printed from copper engravings in 1693. Italian cartographer Vincenzo Maria Coronelli began the engravings for the 110 cm globes in 1688 following the success of the  two large 4 metre globes produced for King Louis XIV in the early 1680s.</p>',
			imageUrl: '/images/Coronelli_Map_Terrestrial_Original.jpg',
			artist: 'Vincenzo Maria Coronelli',
			year: '1693',
			language: 'Italian',
			url: 'http://digital.sl.nsw.gov.au/delivery/DeliveryManagerServlet?embedded=true&toolbar=false&dps_pid=IE3775803',
			credit: 'David Rumsey'
		}
	};

	// Set up Vue instance
	var vueApp = new Vue({
	  el: '#app',
	  data: {
	    items: globeConfigs,
			globeKey: globeKey,
			title: null,
			content: null,
			year: null,
			language: null,
			isMoreModalOpen: false,
			isAboutModalOpen: false,
			isGlobeMenuOpen: false,
	  },
	  methods: {
			changeGlobe: function (newGlobeKey) {
				var oldGlobeKey = this.$data.globeKey
				var oldGlobe = spheres[oldGlobeKey];
				var newGlobe = spheres[newGlobeKey];

				if (oldGlobeKey !== newGlobeKey) {
					newGlobe.material.opacity = 1;
					oldGlobe.material.transparent = true;
					newGlobe.material.transparent = true;

					scene.add(spheres[newGlobeKey]);

					// Animate globes
					TweenLite.to(oldGlobe.material, 0.2, { opacity: 0, onComplete: function() {
						scene.remove(oldGlobe);
					}});
					TweenLite.from(newGlobe.material, 0.2, { opacity: 0, delay: 0.2 });

					this.$data.globeKey = newGlobeKey;
					globeKey = newGlobeKey;

		      if (history.pushState) {
	          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?globe=' + newGlobeKey;
	          window.history.pushState({path:newurl},'',newurl);
		      }
				}

				this.$data.isGlobeMenuOpen = false;
	    },
			toggleMoreModal: function() {
				this.$data.isMoreModalOpen = !this.$data.isMoreModalOpen;
				this.$data.isAboutModalOpen = false;
				this.$data.isGlobeMenuOpen = false;
			},
			toggleAboutModal: function() {
				this.$data.isAboutModalOpen = !this.$data.isAboutModalOpen;
				this.$data.isMoreModalOpen = false;
				this.$data.isGlobeMenuOpen = false;
			},
			toggleGlobeMenu: function() {
				this.$data.isGlobeMenuOpen = !this.$data.isGlobeMenuOpen;
			},
			closeModals: function() {
				this.$data.isAboutModalOpen = false;
				this.$data.isMoreModalOpen = false;
				this.$data.isGlobeMenuOpen = false;
			}
	  }
	})

	// Set up Three JS scene and objects
	var webglEl = document.getElementById('webgl');

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage(webglEl);
		return;
	}

	var scene = new THREE.Scene();
	scene.add(new THREE.AmbientLight(0x333333));

	// Make camera position responsive to browser width
	var cameraDepth = (1/width * 10000) + 40;

	var camera = new THREE.PerspectiveCamera(cameraDepth, width / height, 0.01, 1000);
	camera.position.z = 1.5;
	camera.position.y = 0.2;

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);

	var light = new THREE.DirectionalLight(0xffffff, 0.7);
	light.position.set(5, 3, 5);
	scene.add(light);

	var spheres = createSpheres(globeConfigs);
	spheres[globeKey].rotation.y = rotation;
	scene.add(spheres[globeKey]);

	var stars = createStars(90, 64);
	scene.add(stars);

	var controls = new THREE.TrackballControls(camera);

	webglEl.appendChild(renderer.domElement);

	// console.log(spheres[globeKey].material.opacity);
	// spheres[globeKey].material.opacity = 0.5;
	spheres[globeKey].material.transparent = true;


	render();

	// Functions
	function render() {

		controls.update();
		spheres[globeKey].rotation.y += 0.0005;

		// spheres[globeKey].material.opacity = Math.sin(new Date().getTime() * .0025);

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
				map: THREE.ImageUtils.loadTexture('/images/galaxy_starfield.png'),
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

	/* Track original opacities */
	function trackOriginalOpacities(mesh) {

	    var opacities = [],
	        materials = mesh.material.materials ? mesh.material.materials : [mesh.material];
	    for (var i = 0; i < materials.length; i++) {
	         materials[i].transparent = true;
	         opacities.push(materials[i].opacity);
	    }
	    mesh.userData.originalOpacities = opacities;
	}

	/* Fade mesh */
	function fadeMesh(mesh, direction, options) {
    options = options || {};
    // set and check
    var current = { percentage : direction == "in" ? 1 : 0 },
    // this check is used to work with normal and multi materials.
    mats = mesh.material.materials ?
             mesh.material.materials : [mesh.material],

     originals = mesh.userData.originalOpacities,
     easing = options.easing || TWEEN.Easing.Linear.None,
     duration = options.duration || 2000;
    // check to make sure originals exist
    if( !originals ) {
         console.error("Fade error: originalOpacities not defined, use trackOriginalOpacities");
          return;
    }
    // tween opacity back to originals
    var tweenOpacity = new TWEEN.Tween(current)
      .to({ percentage: direction == "in" ? 0 : 1 }, duration)
      .easing(easing)
      .onUpdate(function() {
           for (var i = 0; i < mats.length; i++) {
              mats[i].opacity = originals[i] * current.percentage;
           }
       })
       .onComplete(function(){
            if(options.callback){
                 options.callback();
            }
       });
    tweenOpacity.start();
    return tweenOpacity;
	}

})();
