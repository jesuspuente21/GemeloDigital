import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from "@angular/router";
import * as p5 from 'p5';
import * as tf from '@tensorflow/tfjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  canvas: any;
  sw = 2;
  strokeColor = 0;
  mobileQuery: MediaQueryList;
  dragging = false;
  x_vals = [];
  y_vals = [];
  a: any;
  b: any;
  c: any; 
  d: any;

 learningRate = 0.2;
 optimizer = tf.train.adam(this.learningRate);

  private _mobileQueryListener: () => void;

  constructor(private route: ActivatedRoute, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const sketch = s => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth - 300, s.windowHeight - 100);

        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');
     
        s.background(255);
        s.strokeWeight(this.sw);
     
        this.a = tf.variable(tf.scalar((Math.random()*2)-1));
        this.b = tf.variable(tf.scalar((Math.random()*2)-1));
        this.c = tf.variable(tf.scalar((Math.random()*2)-1));
        this.d = tf.variable(tf.scalar((Math.random()*2)-1));
     
        s.rect(0, 0, s.width, s.height);
     
        s.stroke(0);
      };
     
      s.draw = () => {
        
        if (this.dragging) {
          let x = s.map(s.mouseX, 0, s.width, -1, 1);
          let y = s.map(s.mouseY, 0, s.height, 1, -1);
          this.x_vals.push(x);
          this.y_vals.push(y);  
        } else {
          tf.tidy(() => {
            if (this.x_vals.length > 0) {
              const ys = tf.tensor1d(this.y_vals);
              this.optimizer.minimize(() => loss(predict(this.x_vals), ys));
            }
          });
        }
      
        s.background(150);
      
        s.stroke(0);
        s.strokeWeight(8);
        for (let i = 0; i < this.x_vals.length; i++) {
          let px = s.map(this.x_vals[i], -1, 1, 0, s.width);
          let py = s.map(this.y_vals[i], -1, 1, s.height, 0);
          s.point(px, py);
        }
      
      
        const curveX = [];
        for (let x = -1; x <= 1; x += 0.05) {
          curveX.push(x);
        }
      
        const ys = tf.tidy(() => predict(curveX));
        let curveY = ys.dataSync();
        ys.dispose();
      
        s.beginShape();
        s.noFill();
        s.stroke(0);
        s.strokeWeight(2);
        for (let i = 0; i < curveX.length; i++) {
          let x = s.map(curveX[i], -1, 1, 0, s.width);
          let y = s.map(curveY[i], -1, 1, s.height, 0);
          s.vertex(x, y);
        }
        s.endShape();
      
        // console.log(tf.memory().numTensors);
      };

      const loss = (pred, labels) => {
        return pred.sub(labels).square().mean();
      }
      
      const predict =(x) => {
        const xs = tf.tensor1d(x);
        // y = ax^3 + bx^2 + cx + d
        const ys = xs.pow(tf.scalar(3)).mul(this.a)
          .add(xs.square().mul(this.b))
          .add(xs.mul(this.c))
          .add(this.d);
        return ys;
      };
     
      s.mouseReleased = () => {
        this.dragging=false;
      };

      s.mousePressed = () => {
        this.dragging=true;
      };
     
      s.keyPressed = () => {
        if (s.key === 'c') {
          window.location.reload();
        }
      };
    };
    this.canvas = new p5(sketch);
  }

}
