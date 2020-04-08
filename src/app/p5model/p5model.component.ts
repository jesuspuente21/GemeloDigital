import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as p5 from 'p5';

var PVector = require('PVector');

@Component({
  selector: 'app-p5model',
  templateUrl: './p5model.component.html',
  styleUrls: ['./p5model.component.css']
})
export class P5modelComponent implements AfterViewInit {

  canvas: any;
  strokeWeight = 0.3;
  strokeColor = '#9FA8DA';

  constructor() { }

  ngAfterViewInit(): void {
    this.startSketch(this.strokeWeight, this.strokeColor);
  }

  startSketch(sw, sc) {

    const sketch = s => {

      var movers
      var grid
      var force
      var wind
      var bounds = document.getElementById('sketch-holder').getBoundingClientRect();
      var Drag = function(c, turbulence) {
        this.c = c;
        this.turbulence = turbulence;
    };

    Drag.prototype.calculateDrag = function(m) {
      // Magnitude is coefficient * speed squared
      var speed = m.velocity.mag();
      var dragMagnitude = this.c * s.pow(speed, this.turbulence);
      
      // Direction is inverse of velocity
      var dragForce = m.velocity.clone();
      dragForce.mult(-1);
      
      // Scale according to magnitude
      dragForce.normalize();
      dragForce.mult(dragMagnitude);
      return dragForce;
  }

      var Grid = function (x, y, xscale, yscale) {
        this.xorigin = 0;
        this.yorigin = 0
        this.realwidth = x
        this.realheight = y
        this.scale = new PVector(xscale, yscale)
      }
      Grid.prototype.update = function (x, y) {
        if (x > 0) this.realwidth += x
        else this.xorigin += x
        if (y > 0) this.realheight += y
        else this.yorigin += y
        if (((this.realheight - this.yorigin) / this.scale.y) > 20)
          this.scale.y = this.scale.y * 2;
        if (((this.realwidth - this.xorigin) / this.scale.x) > 20)
          this.scale.x = this.scale.x * 2;
      }
      Grid.prototype.printLines = function (x, y) {
        s.stroke(sc);
        s.strokeWeight(sw);
        s.line(s.map(x, this.xorigin, this.realwidth, 0, s.width), 0, s.map(x, this.xorigin, this.realwidth, 0, s.width), s.height);
        s.line(0, s.map(y, this.yorigin, this.realheight, 0, s.height), s.width, s.map(y, this.yorigin, this.realheight, 0, s.height));
      }

      Grid.prototype.display = function (dirx, diry) {
        if (dirx && diry) {
          for (var x = this.realwidth; x > this.xorigin; x -= this.scale.x) {
            for (var y = this.realheight; y > this.yorigin; y -= this.scale.y) {
              this.printLines(x, y)
            }
          }
        } else if (dirx && !diry) {
          for (var x = this.realwidth; x > this.xorigin; x -= this.scale.x) {
            for (var y = this.yorigin; y < this.realheight; y += this.scale.y) {
              this.printLines(x, y)
            }
          }
        } else if (!dirx && diry) {

          for (var x = this.xorigin; x < this.realwidth; x += this.scale.x) {
            for (var y = this.realheight; y > this.yorigin; y -= this.scale.y) {
              this.printLines(x, y)
            }
          }
        } else {
          for (var x = this.xorigin; x < this.realwidth; x += this.scale.x) {
            for (var y = this.yorigin; y < this.realheight; y += this.scale.y) {
              this.printLines(x, y)
            }
          }
        }
      }

      var Mover = function (m, x, y) {
        this.mass = m;
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.xvals = []
        this.yvals = []
      };

      Mover.prototype.applyForce = function (force) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
      };

      Mover.prototype.update = function () {
        this.velocity.add(this.acceleration);
        if (this.position.y + this.velocity.y >= (s.height - s.height / 10) || this.position.y + this.velocity.y< (s.height / 10)) grid.update(0, this.velocity.y);
        this.position.y += this.velocity.y
        if (this.position.x + this.velocity.x >= (s.width - s.width / 10) || this.position.x + this.velocity.x < (s.width / 10)) grid.update(this.velocity.x, 0);
        this.position.x += this.velocity.x
        this.acceleration.mult(0);
        this.xvals.push((this.position.x))
        this.yvals.push((this.position.y))
      };

      Mover.prototype.display = function () {
        s.stroke(sc);
        s.strokeWeight(sw);
        s.fill(123, 217, 176);
        var boatx = s.map(this.position.x, grid.xorigin, grid.realwidth, 0 , bounds.width)
        var boaty = s.map(this.position.y, grid.yorigin, grid.realheight, 0 , bounds.height)
        s.triangle(boatx - this.mass *2000/  (grid.realwidth - grid.xorigin), boaty, boatx + this.mass  *2000/  (grid.realwidth - grid.xorigin), boaty, boatx, boaty - 2 * this.mass  *3000/  (grid.realheight - grid.yorigin));
        for (let i = 0; i < this.xvals.length; i++) {
          let px = s.map(this.xvals[i],  grid.xorigin  , grid.realwidth, 0, bounds.width) 
          let py = s.map(this.yvals[i], grid.yorigin, grid.realheight , 0, bounds.height) 
          s.strokeWeight(2)
          s.stroke('#FFE082')
          s.point(px, py);
        }
      };

      var reset = function () {
        
        movers = new Mover(2, s.width / 2, s.height - s.height / 8);
        grid = new Grid(bounds.width, bounds.height, bounds.width / 15, bounds.height / 15)
        force = new PVector(0.00 * movers.mass, -0.03 * movers.mass);
        wind = new PVector(0.0008 * movers.mass, 0 * movers.mass);
      }

      s.setup = () => {
        let canvas = s.createCanvas(bounds.width, bounds.height);
        canvas.parent('sketch-holder');
        s.rect(0, 0, s.width, s.height);
        reset();
      };

      var drag = new Drag(0.02, 1.5);

      s.draw = () => {

        s.background('#1A237E');
       /* counter++;
        if (counter === 500) {
          console.log(force.y + "-----------------------")
          force.y = force.y * -1
        }*/
        var dragForce = drag.calculateDrag(movers);
        movers.applyForce(dragForce);
        // Apply gravity
        movers.applyForce(force);
        movers.applyForce(wind);

        // Update and display
        movers.update();
        grid.display(movers.velocity.x < 0, movers.velocity.y < 0)
        movers.display();
        console.log(movers.velocity.y)
      };

    };
    this.canvas = new p5(sketch);
  }
}
