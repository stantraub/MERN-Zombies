import MovingObject from "./moving_object";
import Player from "./player";
import Bullet from "./bullet";


const DEFAULTS = {
  COLOR: "green",
  HEIGHT: 40,
  WIDTH: 15,
  XVEL: 1,
  YVEL: 3
};
class AlienChaser extends MovingObject {
  constructor(options = {}){
    options.color = DEFAULTS.COLOR;
    options.height = DEFAULTS.HEIGHT;
    options.width = DEFAULTS.WIDTH;
    options.x = options.x || options.game.randomX();
    options.y = options.y || options.game.randomY();
    options.canJump = options.canJump || true;
    options.xVel = DEFAULTS.XVEL;
    options.yVel = DEFAULTS.YVEL;
    options.game = options.game;
    super(options)
    this.speed = [0.1, 0.15, 0.2, 0.5][Math.floor(Math.random() * 4)];
    
  }
  collideWith(otherObject) {
    if (otherObject instanceof Player ) {
      otherObject.remove();
      return true;
    } else if (otherObject instanceof Bullet) {
      if (otherObject.x > this.x && this.x + 15 < otherObject.x  && this.y < 460 && this.y < 500 ) {
        this.remove();
        otherObject.remove();

        return true;
      }
    }

    return false;
  }

  move(){
    if (this.game.players[0].x < this.x && this.game.players[0].x - this.x < 500) {
      this.xVel -= 0.2;
    } else if (this.game.players[0].x > this.x) {
      this.xVel += 0.2;
    }

    this.yVel += 1.5; //increase after testing
    this.x += this.xVel;
    this.y += this.yVel;
    this.xVel *= .9; //readjust to .9 after testing
    this.yVel *= .9;

    if (this.y > 600 - 100 - this.height) {
      this.canJump = false;
      this.y = 600 - 100 - this.height;
      this.yVel = 0;
    }

    if (this.x < 5 + this.width) {
      this.xVel = 0;
      //change for tesing since map wont always be the same shape
    } else if (this.x > 995 - this.width) {
      this.xVel = 0;
    }

  }


 
}



export default AlienChaser;