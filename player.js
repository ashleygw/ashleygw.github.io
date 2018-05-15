class Player
{
    constructor(binsize, brain, hn = 8){
        this.xloc = (width/2);
        this.yloc = height - 50;
        this.vel = 0;
        this.maxvel = 10;
        this.size = 40;
        this.bins = binsize;
        this.alive = true;
        this.score = 0;
        this.fitness = 0;
        this.color = "black";
        this.hiddenNodes = hn;

        if (brain instanceof NeuralNetwork) {
            this.brain = brain.copy();
            this.brain.mutate(mutate);  
        } else {
            // Inputs, hidden, output
            this.brain = new NeuralNetwork(6, this.hiddenNodes, 2);
        }
        this.display = function(){
            stroke(this.color);
            rect(round20(this.xloc),this.yloc,this.size,this.size);
            // stroke('blue');
            // line((this.xloc+this.size/2),(this.yloc+this.size/2), this.xloc+this.size/2 + this.vel*10, this.yloc+this.size/2);
            // stroke('green');
            // point(this.xloc+this.size/2 + this.vel*10, this.yloc+this.size/2);
        };

        this.think=function() {
            let closest = null;
            let closest2 = null;
            let max = -Infinity;
            let max2 = -Infinity;
            for (let i = 0; i < oArray.length; i++) {
              let y = oArray[i].yloc;
              if (y > 0 && y > max) {
                max = y;
                closest2 = closest;
                closest = oArray[i];
              }
              else if(y > 0 && y > max2) {
                  max2 = y;
                  closest2 = oArray[i];
              }
            }
            if (closest != null && closest2 != null) {
              let inputs = [];
              // opening location of closest pipe
              inputs[0] = map(closest.xloc, 0, width, 0, 1);
              // distance from player
              inputs[1] = map(closest.yloc, 0, height-50, 0, 1);
              // opening location of 2nd closest pipe
              inputs[2] = map(closest2.xloc, 0, width, 0, 1);
              // distance from player
              inputs[3] = map(closest2.yloc, 0, height-50, 0, 1);
              // player x vel
              inputs[4] = map(this.vel, -this.maxvel, this.maxvel, 0, 1);
              // Player location :\
              inputs[5] = map(this.xloc,0,width,0,1);
              // Get the outputs from the network
              let action = this.brain.predict(inputs);
              let indexOfMaxValue = action.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
              // Left right/no input
              switch(indexOfMaxValue){
                    case 0:
                        this.input(0.1);
                        this.color = "orange";
                        break;
                    case 1:
                        this.input(-0.1);
                        this.color = "purple";
                        break;
                    // case 2:
                    //     this.input(0);
                    //     break;
              }
            }
        }

        this.copy = function() {
            return new Player(this.bins, this.brain, this.hiddenNodes);
        }
        
        function round20(x)
        {
            return Math.ceil((x-10)/20)*20;
        }

        this.collision = function(){
            var hit = false;
            for(var i = 0; i < oArray.length;++i)
            {
                if (oArray[i].collision(round20(this.xloc),this.yloc,this.size))
                {
                    hit = true;
                }
            }
            return hit;
        }

        this.input = function(direction){
            this.vel += direction;
            if (abs(this.vel) > this.maxvel){
                this.vel -= direction;
            }
        }

        this.update=function(){
            this.score++;
            this.xloc += this.vel;
            if (this.xloc > width- this.size){
                this.xloc = width- this.size - 1;
                this.vel *= -0.8;
            }
            else if (round20(this.xloc) < 0){
                this.xloc = 1;
                this.vel *= -0.8;
            }
            if (this.collision())
            {
                this.alive = false;
            }
        }
    }
}
