function detectCollision() {
	var objetos = [];
	game.quadTree.getAllObjects(objetos);

	for (var i = 0, len = objetos.length; i < len; i++) {
		game.quadTree.findObjects(obj = [], objetos[i]);

		for (j = 0, length = obj.length; j < length; j++) {

			// ALGORITMO DE DETECCIÓN DE COLISIÓN
			if (objetos[i].collidableWith === obj[j].type &&
				(objetos[i].x < obj[j].x + obj[j].width &&
			     objetos[i].x + objetos[i].width > obj[j].x &&
				 objetos[i].y < obj[j].y + obj[j].height &&
				 objetos[i].y + objetos[i].height > obj[j].y)) {
				objetos[i].isColliding = true;
				obj[j].isColliding = true;
			}
		}
	}
};
