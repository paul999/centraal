/**
 * The keylistener for the arrows. 
 */

function keylistener(event) {
    var step = 0.05;
    var code = event.keyCode;
    if(code == 0) {
	code = event.charCode;
    }

    switch(code) {
    case 52:
	// Links
	camera.rotateHorizontally(-step);
	return;
    case 56:
	// Up
	camera.rotateVertically(-step);
	return;
    case 54:
	// Right
	camera.rotateHorizontally(step);
	return;
    case 53:
	// Down
	camera.rotateVertically(step);
	return;
    default:
	return;
    }
}
