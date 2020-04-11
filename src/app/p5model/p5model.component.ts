import { Component, AfterViewInit, Input } from '@angular/core';
import * as p5 from 'p5';

var PVector = require('PVector');

@Component({
  selector: 'app-p5model',
  templateUrl: './p5model.component.html',
  styleUrls: ['./p5model.component.css']
})
export class P5modelComponent implements AfterViewInit {

  canvas: any;
  modelVariables: any
  modelAcceleration: any;
  modelTravel: any = 0;
  modelDistance: any = 0;
  secondsElapsed: number = 12;
  resetSimulation: () => void;
  playPauseSimulation: () => void;
  simulationPaused: () => boolean;
  @Input() giro
  @Input() sol
  @Input() viento
  @Input() direccionViento
  @Input() tiempo
  @Input() distancia

  constructor() {
  }

  ngAfterViewInit(): void {
    this.startSketch(this.giro, this.sol, this.viento, this.direccionViento, this.tiempo, this.distancia);
  }

  startSketch(angleRateOfChange, sunlight, windMagnitude, windDir, time, distance) {

    const sketch = s => {

      //StrokeElements
      var sw = 0.3;
      var sc = '#9FA8DA';
      var paused: boolean = false;
      var interval
      var secondsElapsed: number = 0;

      //Environment elements
      var mover
      var grid
      var wind
      var drag
      var bounds = document.getElementById('sketch-holder').getBoundingClientRect();

      //Environment variables
      var fluidDragConstant
      var fluidVelocityRelation
      var modelMass
      var modelInitialVelocity
      var modelTurnAngle
      var modelThrustPower
      var modelSize
      var modelColor
      var canvasLimit
      var canvasColor
      var lineColor
      var windVector

      var Drag = function (c) {
        this.c = c;
      };

      Drag.prototype.calculateDrag = function (m) {
        // Magnitude is coefficient * speed ^(turbulence)
        var speed = m.velocity.mag();
        var dragMagnitude = this.c * s.pow(speed, 2);

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

      var Mover = function (m, x, y, angle, thrust) {
        this.mass = m;
        this.position = new PVector(x, y);
        this.velocity = new PVector(0, 0);
        this.acceleration = new PVector(0, 0);
        this.xvals = []
        this.yvals = []
        this.angle = angle;
        this.force = new PVector(0.00 * this.mass, -thrust * this.mass);
      };

      Mover.prototype.applyForce = function (force) {
        var f = PVector.div(force, this.mass);
        this.acceleration.add(f);
      };

      Mover.prototype.thrust = function () {
        var f = PVector.div(this.force, this.mass);
        f.rotate(this.angle)
        this.acceleration.add(f);
        this.force = new PVector(f.x * this.mass, f.y * this.mass)
      }



      Mover.prototype.update = function () {
        this.velocity.add(this.acceleration);
        if (this.position.y + this.velocity.y >= ((grid.realheight) - (grid.realheight - grid.yorigin) / 10) || this.position.y + this.velocity.y < (grid.yorigin + (grid.realheight - grid.yorigin) / 10)) grid.update(0, this.velocity.y);
        this.position.y += this.velocity.y
        if (this.position.x + this.velocity.x >= ((grid.realwidth) - (grid.realwidth - grid.xorigin) / 10) || this.position.x + this.velocity.x < (grid.xorigin + (grid.realwidth - grid.xorigin) / 10)) grid.update(this.velocity.x, 0);
        this.position.x += this.velocity.x
        this.acceleration.mult(0);

        this.xvals.push((this.position.x))
        this.yvals.push((this.position.y))
      };

      Mover.prototype.display = function () {
        s.stroke(sc);
        s.strokeWeight(sw);
        s.fill(123, 217, 176);
        var boatx = s.map(this.position.x, grid.xorigin, grid.realwidth, 0, bounds.width)
        var boaty = s.map(this.position.y, grid.yorigin, grid.realheight, 0, bounds.height)
        s.push();
        s.translate(boatx, boaty);
        s.rotate(this.force.heading() + s.HALF_PI);
        s.triangle(- this.mass * 2000 / (grid.realwidth - grid.xorigin), 0, this.mass * 2000 / (grid.realwidth - grid.xorigin), 0, 0, -2 * this.mass * 3000 / (grid.realheight - grid.yorigin));
        s.pop();
        let px
        let py
        for (let i = 0; i < this.xvals.length; i++) {
          px = s.map(this.xvals[i], grid.xorigin, grid.realwidth, 0, bounds.width)
          py = s.map(this.yvals[i], grid.yorigin, grid.realheight, 0, bounds.height)
          s.strokeWeight(2)
          s.stroke('#FFE082')
          s.point(px, py);
          
        }
        s.stroke('#81D4FA');
        s.line(s.map(this.xvals[0], grid.xorigin, grid.realwidth, 0, bounds.width), s.map(this.yvals[0], grid.yorigin, grid.realheight, 0, bounds.height), px, py);
      };

      var reset = function (): void {
        mover = new Mover(2, s.width / 2, s.height - s.height / 8, -0.00, 0.23);
        grid = new Grid(bounds.width, bounds.height, bounds.width / 15, bounds.height / 15)
        wind = new PVector(0.009 * mover.mass, 0.007 * mover.mass);
        drag = new Drag(0.09);
        secondsElapsed = 0
      }

      var playPause = function(): void {
        paused = paused? false: true;
        if(paused)clearInterval(interval)
        else if(!paused)setInterval(counter, 1000)
      }

      var isPaused = function(): boolean {
        return paused
      }

      var counter = function(): void {
        secondsElapsed++;
      }

      s.setup = () => {
        let canvas = s.createCanvas(bounds.width, bounds.height);
        canvas.parent('sketch-holder');
        s.rect(0, 0, s.width, s.height);
        this.resetSimulation = reset;
        this.playPauseSimulation = playPause;
        this.simulationPaused = isPaused;
       
        reset();
         interval = setInterval(counter, 1000);


     }

      s.draw = () => {
        s.background('#1A237E');

        if(!isPaused()){

        var dragForce = drag.calculateDrag(mover);
        mover.applyForce(dragForce);
        mover.thrust();
        mover.applyForce(wind);

        // Update and display
        this.modelVariables = mover
        this.modelAcceleration = mover.acceleration.clone()
        var previousPosition = mover.position.clone()
        this.secondsElapsed = secondsElapsed;
        mover.update();
        this.modelTravel += PVector.sub(previousPosition,mover.position).mag();
        this.modelDistance = PVector.sub(mover.position,PVector( s.width / 2, s.height - s.height / 8)).mag();
        }

        grid.display(mover.velocity.x < 0, mover.velocity.y < 0)
        //s.line(mover.position.x, mover.position.y, mover.xvals[0], mover.yvals[0])
        mover.display();
      };

    };
    this.canvas = new p5(sketch);
  }
}
