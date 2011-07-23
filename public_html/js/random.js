function getRandomColor() {
    function color() {
	return Math.floor(Math.random()*256).toString(16);
    }
    return "0x"+color()+color()+color();
}
