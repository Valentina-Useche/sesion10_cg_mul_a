// create a scene, that will hold all our elements such as objects, cameras and lights. 
var scene = new THREE.Scene();

//Hacer la ventana para que el usuario ingrese la informacion.



function cubo(dim, color, material, alambrado){
    var cubeGeometry=new THREE.BoxGeometry(dim,dim,dim);
    var cubeMaterial;

    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // add the cube to the scene
    scene.add(cube);
    return(cube);
}
function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
    var r=cubo(5,5,5,0xFFDD00,'Basic',false);
    r.translate(1,2,3);

    Cubo = [];   // Definir un array unidimensional

for(var i=0;i<3;i++){
    var c;
    if(i==0){
        c=0xFFDD00;
    }else if(i==1){
       c=0xFF0000; 
    }else if(i==2){
        c=0xE633FF
    }
    Cubo.push(cubo(4, c, 'Physical', false));
    Cubo[i].position.set(0, 0, 0);
}

        var delta=10;
	var matriz_X =new THREE.Matrix4();
	var matriz_Y=new THREE.Matrix4();    //Se crea la matriz para poder hacer transformaciones en cada eje.
	var matriz_Z=new THREE.Matrix4();

	Cubo[0].translateX(delta);
	Cubo[0].position.applyMatrix4(matriz_Z);
	Cubo[1].translateY(delta);
	Cubo[1].position.applyMatrix4(matriz_X);	// Se aplica a cada cubo la transformacion.
	Cubo[2].translateZ(delta);
	Cubo[2].position.applyMatrix4(matriz_Y);

	var angulo=prompt("Ingrese el valor del angulo en grados para rotar un cubo: ");
	var num= Math.round(Math.random() * (2 - 0) + 0);
	var eje= Math.floor(Math.random() * (3 - 1) + 1);
	var rcub=Cubo[num];

	if(eje==1){
		matriz_X.makeRotationX(angulo*(Math.PI/180));
		rcub.position.applyMatrix4(matriz_X);
	}
	else if(eje==2){
		matriz_Y.makeRotationY(angulo*(Math.PI/180));
           	rcub.position.applyMatrix4(matriz_Y);
	}
	else if(eje=3){
	        matriz_Z.makeRotationZ(angulo*(Math.PI/180));
                rcub.position.applyMatrix4(matri_Z);
	}

   //Luz (requerida para el material MeshLambertMaterial)
    light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, 
		                                //  semejante al sol.
    light.position.set( -10, 5, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 

    // position and point the camera to the center of the scene
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}

