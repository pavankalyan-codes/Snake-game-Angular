import { DOCUMENT } from '@angular/common';
import { HostListener, Inject } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'snake';
  fake = new Array(10000);

  currentDirection = 'forward';
  previousDirection = 'forward';

  foodPosition = 0;

  timeout;
  mytimer;
  snakeDivs = [];
  snakeLength = 3;

  constructor(@Inject(DOCUMENT) document) {
    this.snakeDivs.push(3450);
    this.snakeDivs.push(3451);
    this.snakeDivs.push(3452);
    this.snakeDivs.push(3453);
    this.snakeDivs.push(3454);
    this.snakeDivs.push(3455);
    this.snakeDivs.push(3456);
    this.mytimer = setInterval(() => {
      this.snakeDivs.shift();
      let newPos = this.snakeDivs[this.snakeDivs.length - 1];
      if (newPos % 100 == 99) {
        newPos = newPos - 99;
        this.snakeDivs.push(newPos);
      } else {
        this.snakeDivs.push(newPos + 1);
      }
      //console.log(this.snakeDivs);
    }, 80);
    this.foodPosition = this.placeRandomFood();
    console.log(this.foodPosition);
  }

  isSelected(i) {
    if (this.snakeDivs.includes(i)) {
      return true;
    }
    return false;
  }

  forward() {
    this.mytimer = setInterval(() => {
      this.snakeDivs.shift();
      let newPos = this.snakeDivs[this.snakeDivs.length - 1];
      if (newPos % 100 == 99) {
        newPos = newPos - 99;
        if (this.checkForSelfBite(newPos)) {
          console.log(this.snakeDivs);
          console.log(newPos);

          clearInterval(this.mytimer);
        }
        this.snakeDivs.push(newPos);
      } else {
        if (this.checkForSelfBite(newPos + 1)) {
          console.log(this.snakeDivs);
          console.log(newPos);
          clearInterval(this.mytimer);
        }
        this.snakeDivs.push(newPos + 1);
      }
      if (this.ateFood()) {
        this.increaseLength();
      }

      //console.log(this.snakeDivs);
    }, 80);
  }
  backward() {
    this.mytimer = setInterval(() => {
      if (this.previousDirection === 'down') {
        this.snakeDivs.shift();
        let newPos = this.snakeDivs[this.snakeDivs.length - 1];
        newPos = newPos - 1;
        if (newPos % 100 === 99) {
          newPos = newPos + 100;
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        } else {
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        }
      } else if (this.previousDirection === 'up') {
        this.snakeDivs.shift();
        let newPos = this.snakeDivs[this.snakeDivs.length - 1];
        newPos = newPos - 1;
        if (newPos % 100 == 99) {
          newPos = newPos + 100;
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        } else {
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        }
      } else {
        this.snakeDivs.pop();
        let newPos = this.snakeDivs[0];
        if (newPos % 100 == 0) {
          newPos = newPos + 99;
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs = [newPos, ...this.snakeDivs];
          //this.snakeDivs.push(newPos);
        } else {
          if (this.checkForSelfBite(newPos - 1)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs = [newPos - 1, ...this.snakeDivs];
          //this.snakeDivs.push(newPos - 1);
        }
      }
      if (this.ateFood()) {
        this.increaseLength();
      }
      console.log(this.snakeDivs);
    }, 80);
  }

  up() {
    this.mytimer = setInterval(() => {
      if (this.previousDirection === 'forward') {
        this.snakeDivs.shift();
        let newPos = this.snakeDivs[this.snakeDivs.length - 1];
        if (newPos <= 99) {
          newPos = newPos + 9900;
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
          //this.snakeDivs.push(newPos);
        } else {
          if (this.checkForSelfBite(newPos - 100)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos - 100);
          //this.snakeDivs.push(newPos - 1);
        }
        //console.log(this.snakeDivs);
      }
      if (this.previousDirection === 'backward') {
        console.log('--------------------------');

        this.snakeDivs.shift();
        let newPos = this.snakeDivs[this.snakeDivs.length - 1];
        newPos = newPos - 100;
        if (newPos < 0) {
          newPos = 100 - Math.abs(newPos) + 9900;
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
          //this.snakeDivs.push(newPos);
        } else {
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
          //this.snakeDivs.push(newPos - 1);
        }
        //console.log(this.snakeDivs);
      }
      if (this.ateFood()) {
        this.increaseLength();
      }
    }, 80);
  }

  down() {
    this.mytimer = setInterval(() => {
      if (this.previousDirection === 'forward') {
        this.snakeDivs.shift();
        let newPos = this.snakeDivs[this.snakeDivs.length - 1];
        newPos = newPos + 100;
        if (newPos >= 10000) {
          newPos = newPos - 100;
          newPos = newPos - 9900;
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        } else {
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        }
      }
      if (this.previousDirection === 'backward') {
        this.snakeDivs.shift();
        let newPos = this.snakeDivs[this.snakeDivs.length - 1];
        newPos = newPos + 100;
        if (newPos > 10000) {
          newPos = newPos - 100 - 9900;
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        } else {
          if (this.checkForSelfBite(newPos)) {
            console.log(this.snakeDivs);
            console.log(newPos);

            clearInterval(this.mytimer);
          }
          this.snakeDivs.push(newPos);
        }
      }
      if (this.ateFood()) {
        this.increaseLength();
      }
      console.log(this.snakeDivs);
    }, 80);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (
      event.code !== 'ArrowLeft' &&
      event.code !== 'ArrowRight' &&
      event.code !== 'ArrowUp' &&
      event.code !== 'ArrowDown'
    ) {
      return;
    }

    if (
      (this.currentDirection === 'forward' &&
        (event.code === 'ArrowLeft' || event.code === 'ArrowRight')) ||
      (this.currentDirection === 'backward' &&
        (event.code === 'ArrowRight' || event.code === 'ArrowLeft')) ||
      (this.currentDirection === 'up' &&
        (event.code === 'ArrowDown' || event.code === 'ArrowUp')) ||
      (this.currentDirection === 'down' &&
        (event.code === 'ArrowUp' || event.code === 'ArrowDown'))
    ) {
      return;
    }
    clearInterval(this.mytimer);

    this.previousDirection = this.currentDirection;

    if (event.code === 'ArrowRight') {
      this.currentDirection = 'forward';
      this.forward();
    }
    if (event.code === 'ArrowLeft') {
      this.currentDirection = 'backward';
      this.backward();
    }
    if (event.code === 'ArrowUp') {
      this.currentDirection = 'up';
      this.up();
    }
    if (event.code === 'ArrowDown') {
      this.currentDirection = 'down';
      this.down();
    }

    //if (event.keyCode == KEY_CODE.DOWN_ARROW) {
    // Your row selection code
    //  console.log(event);
    //}

    console.log(this.previousDirection);

    console.log(this.currentDirection);
  }

  placeRandomFood() {
    // min and max included
    let randomNum = Math.floor(Math.random() * (9999 - 0 + 1) + 0);
    if (!this.snakeDivs.includes(randomNum)) {
      return randomNum;
    }
    this.placeRandomFood();
  }

  ateFood() {
    if (this.snakeDivs.includes(this.foodPosition)) {
      this.foodPosition = this.placeRandomFood();
      return true;
    }
    return false;
  }

  increaseLength() {
    let maxBlock = Math.max(...this.snakeDivs);
    let minBlock = Math.min(...this.snakeDivs);
    if (this.currentDirection === 'forward') this.snakeDivs.push(maxBlock + 1);
    if (this.currentDirection === 'backward') this.snakeDivs.push(minBlock - 1);
  }

  checkForSelfBite(pos) {
    if (this.snakeDivs.includes(pos)) {
      return true;
    }
    return false;
  }

  stop() {
    console.log('clicked');

    clearInterval(this.mytimer);
  }
  start() {
    console.log('started');

    this.forward();
  }
}
