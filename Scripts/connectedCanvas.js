function setup() {
	createCanvas(innerWidth, innerHeight)
	window.addEventListener('resize', function() {
		resizeCanvas(innerWidth, innerHeight)
	})

	var bubbleAmount = (innerWidth + innerHeight) * 0.02

	for (var i = 0; i < bubbleAmount; i++) {
		bubbles.push(new bubble(random(width), random(height), random(10, 25)))
	}
}

var bubbles = [],
	connectDistance = 100,
	materialColors = [
		'#F44336',
		'#E91E63',
		'#9C27B0',
		'#673AB7',
		'#3F51B5',
		'#2196F3',
		'#03A9F4',
		'#00BCD4',
		'#009688',
		'#4CAF50',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
		'#FFC107',
		'#FF9800',
		'#FF5722',
		'#795548',
		'#9E9E9E',
		'#607D8B'
	],
	bgcolor = '#112552'

function draw() {
	background(bgcolor)
	lines()
	noStroke()
	bubbles.forEach(x => {
		x.update()
		x.show()
	})
}

function bubble(x, y, radius) {
	this.x = x
	this.y = y
	this.radius = radius
	this.xspeed = random(-0.5, 0.5)
	this.yspeed = random(-0.5, 0.5)
	this.color = random(materialColors)

	this.update = () => {
		this.x = this.x + this.xspeed
		this.y = this.y + this.yspeed
		if (this.x < 0 || this.x > width) {
			this.xspeed = this.xspeed * -1
		}
		if (this.y < 0 || this.y > height) {
			this.yspeed = this.yspeed * -1
		}
		if (this.x < 0) {
			this.x = 0
		}
		if (this.x > width) {
			this.x = width
		}
		if (this.y < 0) {
			this.y = 0
		}
		if (this.y > height) {
			this.y = height
		}
	}

	this.show = () => {
		fill(this.color)
		ellipse(this.x, this.y, this.radius)
	}
}

function lines() {
	stroke(color(255, 255, 255, 20))

	bubbles.map(elem => {
		bubbles.map(innerElem => {
			var distance = dist(elem.x, elem.y, innerElem.x, innerElem.y)
			strokeWeight(map(distance, 0, connectDistance, 5, 0))
			if (distance < connectDistance) {
				strokeWeight(map(distance, 0, connectDistance, 3, 0))
				line(elem.x, elem.y, innerElem.x, innerElem.y)
			}
		})
	})
	bubbles.map(elem => {
		var mouseDist = dist(mouseX, mouseY, elem.x, elem.y)
		if (mouseDist < connectDistance * 2) {
			stroke(
				color(
					255,
					255,
					255,
					map(mouseDist, 0, connectDistance * 2, 255, 100)
				)
			)
			strokeWeight(map(mouseDist, 0, connectDistance * 2, 3, 0))
			line(mouseX, mouseY, elem.x, elem.y)
		}
	})
}