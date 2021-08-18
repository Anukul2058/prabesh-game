// Java script

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var height = window.innerHeight - 100


function keyup(event) {

	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop + 32);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		var element = document.elementFromPoint(player.offsetLeft, newTop);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		var element = document.elementFromPoint(newLeft + 32, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}


function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);



// players name 

document.querySelector('.start').addEventListener('click', () => {
    var lives = 4;
	gsap.to('#player',{opacity:1,duration:1.5,ease:'Power3easeIn'})
    
	var player_name = document.getElementById('player_name').value
	var name = document.querySelector('.name')
	name.innerHTML = player_name
	document.querySelector('.input-area').style.display = 'none'
	gsap.to('.start', { duration: 2, opacity: 0, display: 'none' })
	// var not_pause = true
	document.querySelector('.game-over').style.display = 'none'

    

	

	// creating of bombs

	var creating_bombs = setInterval(() => {
		
			var bomb = document.createElement('div')
			bomb.classList.add('bombs')
			// bomb.innerHTML = '<i class="fas fa-bomb"></i>'
	
			bomb_left = parseInt(window.getComputedStyle(bomb).getPropertyValue('left'));
			bomb.style.left = Math.floor(Math.random() * 1200) + 'px'
	
			document.body.appendChild(bomb)

	



	}, 3000)


	// dropping of bombs
	
		var dropbombs = setInterval(() => {
			var bombs = document.getElementsByClassName('bombs')
	
	
			if (bombs != undefined) {
				for (var i = 0; i < bombs.length; i++) {
					var bomb = bombs[i];
					var bomb_top = parseInt(window.getComputedStyle(bomb).getPropertyValue('top'));
					var bomb_left = parseInt(window.getComputedStyle(bomb).getPropertyValue('left'));
					// var bomb_bottom = parseInt(window.getComputedStyle(bomb).getPropertyValue('bottom'));
	
	
	
	
					bomb.style.top = bomb_top + 20 + 'px'
					// bomb.style.bottom = bomb_bottom + 'px'
					// console.log(bomb_top)
	
	
	
	
				}
	
	
			}
	
	
			if (bomb_top >= height) {
				// console.log(bomb_left,bomb_top)
				document.body.removeChild(bomb)
				var audio = new Audio('explosion.wav');
				audio.play()
				
	
	
	
	
				var explode = document.createElement('div')
				explode.classList.add('explosion');
				explode.style.top = bomb_top + 'px'
				explode.style.left = bomb_left + 'px'
				document.body.appendChild(explode)
				var bombX = explode.offsetLeft
				var bombY = explode.offsetTop
				// console.log(bombX,bombY)
	
	
				var playerY = document.getElementById('player').offsetTop
				var playerX = document.getElementById('player').offsetLeft
				console.log(playerX,playerY)
				
				var a = playerX - bombX
				var b = playerY - bombY
				var distance = Math.sqrt( a*a + b*b );
				
				if(distance <= 69){
					lives = lives - 1 
					var l1 = document.getElementById('h1')
					var l2 = document.getElementById('h2')
					var l3 = document.getElementById('h3')
	
	
					if (lives == 3){
						gsap.from('#player',{opacity:0,duration:2,ease:'bounce'})
						l1.style.display = 'none'
						console.log('3')
	
						
	
					}
					if (lives == 2){
						gsap.from('#player',{opacity:0,duration:2.5,ease:'Power3easeIn'})
	
						l2.style.display = 'none'
						
						console.log('2')
	
					}
					if (lives == 1){
						document.querySelector('.game-over').style.display = 'block'
						gsap.to('#player',{opacity:0,duration:2.5,ease:'Power3easeIn'})

						gsap.to('.start',{opacity:1,duration:2,display:'block'})
						
					


						clearInterval(dropbombs)
						clearInterval(creating_bombs)
						const b = document.querySelectorAll('.bombs')
						b.forEach(function remove(bom){
							bom.remove();

						})
					   
						

						
	
						
						console.log('1')
						pause = true
						l1.style.display = 'block'
						l2.style.display = 'block'
	
	
	
					}
				
					
				}
	
				gsap.to('.explosion', { opacity: 0, duration: 1.5, ease: 'Power2easeOut', display: 'none' })
	
	
	
	
	
	
	
	
			}
	
	
		}, 40)
	

	

	



})













