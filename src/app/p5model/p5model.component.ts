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
  strokeWeight = 0.5;
  strokeColor = '#9FA8DA';



  constructor() { }

  ngAfterViewInit(): void {
    this.startSketch(this.strokeWeight, this.strokeColor);
  }

  startSketch(sw, sc) {
    const sketch = s => {
      var movers
      var grid
      var bounds = document.getElementById('sketch-holder').getBoundingClientRect();
      var Grid = function (x, y, xscale, yscale) {
        this.realwidth = x
        this.realheight = y
        this.scale = new PVector(xscale, yscale)
      }
      Grid.prototype.update = function (x, y) {
        this.realwidth += x
        this.realheight += y
        if ((this.realheight / this.scale.y) > 20)
          this.scale.y = this.scale.y * 2;
        if ((this.realwidth / this.scale.x) > 20)
          this.scale.x = this.scale.x * 2;
      }

      Grid.prototype.display = function () {
        for (var x = 0; x < this.realwidth; x += this.scale.x) {
          for (var y = 0; y < this.realheight; y += this.scale.y) {
            s.stroke(sc);
            s.strokeWeight(sw);
            s.line(s.map(x, 0, this.realwidth, 0, s.width), 0, s.map(x, 0, this.realwidth, 0, s.width), s.height);
            s.line(0, s.map(y, 0, this.realheight, 0, s.height), s.width, s.map(y, 0, this.realheight, 0, s.height));
          }
        }
      }

      var Mover = function (m, x, y) {
        this.mass = m;
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
      };

      Mover.prototype.applyForce = function (force) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
      };

      Mover.prototype.update = function () {
        this.velocity.add(this.acceleration);
        if (this.position.y < (s.height - s.height / 8))
          this.position.add(this.velocity);
        else grid.update(this.velocity.x, this.velocity.y);
        this.acceleration.mult(0);
      };

      Mover.prototype.display = function () {
        s.stroke(sc);
        s.strokeWeight(sw);
        s.fill(123, 217, 176);
        s.ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
      };

      var reset = function () {
        var bounds = document.getElementById('sketch-holder').getBoundingClientRect();
        movers = new Mover(s.random(0.5, 3), s.width / 2, 0);
        grid = new Grid(bounds.width, bounds.height, bounds.width/15, bounds.height/15)
      }

      s.setup = () => {
        var bounds = document.getElementById('sketch-holder').getBoundingClientRect();
        let canvas = s.createCanvas(bounds.width, bounds.height);
        canvas.parent('sketch-holder');
        s.rect(0, 0, s.width, s.height);
        reset();
      };



      s.draw = () => {

        s.background('#1A237E');
        grid.display()
        var gravity = new PVector(0, 0.1 * movers.mass);
        // Apply gravity
        movers.applyForce(gravity);

        // Update and display
        movers.update();
        movers.display();
        console.log(grid.scale.y)
      };

    };
    this.canvas = new p5(sketch);
  }
}
