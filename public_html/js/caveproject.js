var container;
var camera, scene, renderer;
var torus_mesh, cube_mesh, sun_mesh;

var pos = -1;

/**
 * The initialisation stuff. 
 */

function init() {
    // Create a div to initialize in. 
    container = document.createElement('div');
    document.body.appendChild(container);

    // The scene in which everything is rendered
    scene = new THREE.Scene();

    // Setup the camera; near = 1, far = 10000
    camera = new THREE.RollCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.movementSpeed = 150;
    camera.lookSpeed = 0;
    camera.autoForward = false;
    scene.addChild(camera);

    camera.position.z = 450;

    // Initialize the walls. 
    initWalls();

	// Lighting - Create a "sun"
    var sun_material = new THREE.MeshPhongMaterial({
	color: 0xFFFF00
    });
    // yellow sun
    light = new THREE.DirectionalLight(0xFFFEEE);
    light.castShadow = true;
    // Set the light up high
    light.position.y = 100;
    scene.addChild(light);

    var sphere = new THREE.SphereGeometry(5);
    sun_mesh = new THREE.Mesh(sphere, sun_material);
    // Sun is partly translucent
    sun_mesh.materials[0].opacity = 0.5;
    scene.addChild(sun_mesh);
    
    // A sinus, and the inverse, a cosinus for the circular motion of the light source
    light.position.x = Math.sin(pos);
    light.position.z = Math.cos(pos);
    // The light is actually very close...
    light.position.y = 1.5;

    // The "sun" is on the same place as the sphere
    sun_mesh.position.copy(light.position);
    // ... So make sure the 'visual' location of the sun is further away from O(0,0,0)
    sun_mesh.position.multiplyScalar(100);    

    // WebGL Renderer - The OpenGL Window
    renderer = new THREE.WebGLRenderer({
	antialias: true
    });

    // Set the background
    renderer.setClearColorHex(0x7AA7FF, 0.8);
    renderer.setSize(window.innerWidth*0.95, window.innerHeight*0.95);
    container.appendChild(renderer.domElement);
}

/**
 * The animation loop. 
 */
function animate() {
    // "Flip the buffers"
    requestAnimationFrame(animate);

    prepareFrame();
    // And finally, render the frame
    renderer.render(scene, camera);
}
var cl = getRandomColor();

var material = new THREE.MeshLambertMaterial({
	color: cl
}); 
    
function initWalls() {
	
    var material = new THREE.MeshLambertMaterial({
		color: cl
    }); 
    
    
    // no trap
	scene.addChild(createWall(0, 0, 0));
	scene.addChild(createWall(1, 0, 0));
	scene.addChild(createFloor(0, 0, 0));
	scene.addChild(createFloor(0, 1, 0));
	
	// trap
	scene.addChild(createFloor(0, 0, 1));
	scene.addChild(createFloor(0, 1, 1));
	createTrap(scene, -1, 0, 1);
	scene.addChild(createFloor(-2, 1, 1));
	createTrap(scene, 0, 0, 1, false);
	scene.addChild(createFloor(2, 1, 1));	

    // no trap
	scene.addChild(createWall(0, 0, 2));
	scene.addChild(createWall(1, 0, 2));
	scene.addChild(createFloor(0, 0, 2));
	scene.addChild(createFloor(0, 1, 2));
	
    // no trap
	scene.addChild(createWall(0, 0, 3));
	scene.addChild(createWall(1, 0, 3));
	scene.addChild(createFloor(0, 0, 3));
	scene.addChild(createFloor(0, 1, 3));
	
	// trap
	scene.addChild(createFloor(0, 0, 4));
	scene.addChild(createFloor(0, 1, 4));	
}

/**
 * Initialize the elements that are flying around. 
 */



/**
 * Function to render an actual frame. 
 */

function prepareFrame() {

}

function createTrap(scene, x, y, z, left)
{
	// Woei :D
	
	if (y == null)
	{
		y = 0;
	}
	
	if (x == null)
	{
		x = 0;
	}
	
	if (z == null)
	{
		z = 0;
	}
	
	x = x * 300;

	z = z * -300;
	
	y = y * 300 - 150;
	
	if (left == null)
	{
		left = true;
	}		
	
	var floor_prim = new THREE.CubeGeometry(20, 300, 10);

	for (i = 0; i < 300 / 10; i++)
	{
		var fl = new THREE.Mesh(floor_prim, material);
		
		if (left)
		{
			fl.position.y = y + 300 - (10 * i);
			fl.position.z = z;
			fl.position.x = x - 140 + 10 * i;
		}
		else
		{
			fl.position.y = y + 300 - (10 * i);
			fl.position.z = z;
			fl.position.x = x + 440 - 10 * i;		
		}
		// Also rotate this 90 degrees, but on the other axel because it is a floor. 
		fl.rotation.x = degToRad(90);

		new THREE.ShadowVolume(fl);
		scene.addChild(fl);
	}
	
}

function createFloor(x, y, z)
{
	if (y == null)
	{
		y = 0;
	}
	
	if (x == null)
	{
		x = 0;
	}
	
	if (z == null)
	{
		z = 0;
	}
	
	x = x * 300;

	z = z * -300;
	
	y = y * 300 - 150;

	// Floor
	var floor_prim = new THREE.CubeGeometry(300, 300, 10);

	var fl = new THREE.Mesh(floor_prim, material);
	fl.position.y = y;
	fl.position.z = z;
	fl.position.x = x;
	// Also rotate this 90 degrees, but on the other axel because it is a floor. 
	fl.rotation.x = degToRad(90);

	new THREE.ShadowVolume(fl)

	return fl;
}

function createWall(x, y, z)
{
	var wall_prim = new THREE.CubeGeometry(300, 300, 10);

	if (y == null)
	{
		y = 0;
	}
	
	if (x == null)
	{
		x = 0;
	}
	
	if (z == null)
	{
		z = 0;
	}
	var tmp = (x % 2) ? 155 : 145;
	x = x * 300 - tmp;

	z = z * -300;
	
	y = y * 200;	

	var wall = new THREE.Mesh(wall_prim, material);
	wall.position.x = x;  
	
	wall.position.y = y;
	wall.position.z = z;
	// Rotate 90 degrees; this amount of radians
	wall.rotation.y = degToRad(90);

	new THREE.ShadowVolume(wall);

	return wall;
}


/**
 * Convert degrees to radians. 
 */

function degToRad(degree) {
    return degree * Math.PI / 180;
}
