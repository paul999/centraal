var container;
var camera, scene, renderer;
var torus_mesh, cube_mesh, sun_mesh;

var pos = -1;
var stats;

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
    
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );    
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
    stats.update();
}
var cl = getRandomColor();

var material = new THREE.MeshLambertMaterial({
	color: cl
}); 
    
function initWalls() {
	
    var material = new THREE.MeshLambertMaterial({
		color: cl
    }); 

	sectionTrap(0);
	sectionPerron(1);
	sectionSpoor(2); //spoor 1
	sectionSpoor(3); //spoor 2
	sectionPerron(4);
	sectionTrap(5);
	sectionPerron(6);
	sectionSpoor(7); //spoor 3
	sectionSpoor(8); //spoor 4
	sectionSpoor(9); //spoor 5
	sectionPerron(10);
	sectionTrap(11);
	sectionPerron(12);	
}

function sectionHal(z)
{
	createWall(0, 0, z);
	createWall(0, 0, z, true);
	createFloor(0, 0, z);
	createFloor(0, 1, z);
	
	createWall(8, 0, z);
	createFloor(8, 0, z);
	createFloor(8, 1, z);
	
	createFloor(9, 0, z);
	createFloor(9, 1, z);
	
	createWall(10, 0, z, true);
	createFloor(10, 0, z);
	createFloor(10, 1, z);			
}

function sectionTrap(z)
{
	// trap
	createFloor(0, 0, z);
	createFloor(0, 1, z);
	createCompleteTrap(1, 0, z, false);
	createCompleteTrap(-1, 0, z, true);
	createFloor(0, 1, z, true);	
	
	createFloor(8, 0, z);
	createFloor(9, 0, z);
	createFloor(10, 0, z);

	createFloor(8, 1, z);
	createFloor(9, 1, z);
	createFloor(10, 1, z);
	
	createFloor(8, 1, z, true);
	createFloor(9, 1, z, true);
	createFloor(10, 1, z, true);	
	
	createCompleteTrap(11, 0, z, false);
	createCompleteTrap(7, 0, z, true);
//	createFloor(0, 1, z, true);		
	
	for (i = 0 ; i < 5; i++)
	{
		createFloor(2 + i, 1, z, true);	
		
		if (z == 0)
		{
			createWall(2 + i, 0, z, null, false);
			createWall(2 + i, 1, z, null, false, true);
		}
	}
}
function sectionPerron(z)
{
	// Perron	
	sectionHal(z);
	
	for (i = -2; i < 13; i++)
	{
		createFloor(i, 1, z, true);
		createWall(i, 1, z + 1, null, false, true);
		createWall(i, 1, z + 1, null, false, true);
		createWall(i, 1, z + 1, null, false, true);

		createWall(i, 1, z, null, false, true);
		createWall(i, 1, z, null, false, true);
		createWall(i, 1, z, null, false, true);			
		
	}	
}
function sectionSpoor(z)
{
	for (i = -2; i < 13; i++)
	{
		createFloor(i, 1, z);
		createFloor(i, 1, z);
	}		
	sectionHal(z);
}


/**
 * Function to render an actual frame. 
 */

function prepareFrame() {

}

function createCompleteTrap(x, y, z, left)
{
	if (left == null)
	{
		left = true;
	}
	
	if (left)
	{
		createTrap(x , y, z, left);
		
		createWall(x -1, y, z, null, false); 
		createWall(x, y, z, null, false); 
		createWall(x -1 , y, z + 1, null, false); 
		createWall(x, y, z + 1, null, false); 
		createWall(x - 1, y, z);		
		
		
		createWall(x -1, y + 1, z, null, false, true); 
		createWall(x, y + 1, z, null, false, false); 
		createWall(x -1 , y + 1, z + 1, null, false, true); 
		createWall(x, y + 1, z + 1, null, false, false); 
		createWall(x - 1, y + 1, z, null, true, true); // left
		createWall(x, y + 1, z, true, true, false);	 // right
		

	}
	else
	{
		createTrap(x - 1, y, z, left);
		
		createWall(x, y, z, null, false); 
		createWall(x + 1, y, z, null, false); 
		createWall(x, y, z + 1, null, false); 
		createWall(x + 1, y, z + 1, null, false); 
		createWall(x + 1, y, z, true);
		
		createWall(x, y + 1, z, null, false, false); 
		createWall(x +1, y + 1, z, null, false, true); 
		createWall(x , y + 1, z + 1, null, false, false); 
		createWall(x + 1 , y + 1, z + 1, null, false, true); 
		createWall(x, y + 1, z, null, true, false);
		createWall(x +1, y + 1, z, true, true, true);			

	}
}

function createTrap(x, y, z, left)
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
	var floor_rest = new THREE.CubeGeometry(150, 300, 10);

	for (i = 0; i < 45; i++)
	{
		var fl = new THREE.Mesh(floor_prim, material);
		
		if (left)
		{
			fl.position.y = y + 450 - 10 * i;
			
			fl.position.z = z;
			fl.position.x = x - 300 +  10 * i;
		}
		else
		{
			fl.position.y = y + 450 - (10 * i);
			fl.position.z = z;
			fl.position.x = x + 600 - 10 * i;		

		}
		// Also rotate this 90 degrees, but on the other axel because it is a floor. 
		fl.rotation.x = degToRad(90);

		new THREE.ShadowVolume(fl);
		scene.addChild(fl);
	}
		
	var fl = new THREE.Mesh(floor_rest, material);
	if (left)
	{
		fl.position.y = y + 450;
		fl.position.z = z;
		fl.position.x = x - 365;
	}
	else
	{
		fl.position.y = y + 450;
		fl.position.z = z;
		fl.position.x = x + 665;		
	}	
	fl.rotation.x = degToRad(90);
	scene.addChild(fl);
	
}

function createFloor(x, y, z, half)
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
		
	if (half)
	{
		y = y + 150;
	}		

	// Floor
	var floor_prim = new THREE.CubeGeometry(300, 300, 10);

	var fl = new THREE.Mesh(floor_prim, material);
	fl.position.y = y;
	fl.position.z = z;
	fl.position.x = x;
	// Also rotate this 90 degrees, but on the other axel because it is a floor. 
	fl.rotation.x = degToRad(90);

	new THREE.ShadowVolume(fl)

	scene.addChild(fl);
}

function createWall(x, y, z, right, normal, half)
{
	if (!half)
		var wall_prim = new THREE.CubeGeometry(300, 300, 10);
	else
		var wall_prim = new THREE.CubeGeometry(300, 150, 10);
		
	if (normal == null) normal = true;	

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
	var tmp = 0;
	
	if (right)
		tmp = -145;
	else
		tmp = 145;
	
	if (!normal)
		tmp = 0;
	
	x = x * 300 - tmp;

	z = z * -300;
	
	if (!normal)
	{
		z = z + 150;
//		x = x - 5;
	}
	
	y = y * 300 + 5;	
	
	if (half)
		y = y - 75;

	var wall = new THREE.Mesh(wall_prim, material);
	wall.position.x = x;  
	
	wall.position.y = y;
	wall.position.z = z;
	// Rotate 90 degrees; this amount of radians
	
	if (normal)
	wall.rotation.y = degToRad(90);

	new THREE.ShadowVolume(wall);

	scene.addChild(wall);
}


/**
 * Convert degrees to radians. 
 */

function degToRad(degree) {
    return degree * Math.PI / 180;
}
