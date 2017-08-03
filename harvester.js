//TODO: Adopt predator syntax and style. Implement KD trees.

function Harvester(posX, posY){
  this.weight = .5;
  this.speed = 10;
  this.health = this.weight * 10; //50
  this.maxHealth = this.health;
  this.inventory = [];
  this.target = null;
  this.width = this.weight * 50;
  this.height = this.weight * 50;
  this.timeAlive = Math.floor(random(0,100));
  this.alive = true;
  this.treesCut = 0;
  this.walkSpeed= .1 + getRandomArbitrary(-0.06,0.06);
  this.sprintSpeed = .20 + getRandomArbitrary(-0.1,0.1);
  this.pos = createVector(posX, posY);
  this.dir = createVector(0,0);
  this.rundir = createVector(0,0);
  this.alertness = 0.6;
  this.range = 8000;
  this.dangerConsideration = 1; 
  this.runTarget = null;
  this.findingNewTarget = true;
  this.id = makeid();

  this.findingMate = false;
  this.fertilePoint = 200; // This.growthrate
  this.canReproduce = 5;
  this.mate = null;

  this.die = function()
  {
    this.alive = false;
    dead[dead.length] = new Corpse(this.pos.x,this.pos.y,this.width,"Harvester");
  }

  this.findTargetLinear = function()
  {
      var closestDistance = 10000000000;
      var closestTree = null;
      var dist = 0;
      for(var i = 0;i<treePopulation.length;++i)
      {
        dist = this.distSqrd(treePopulation[i]);
        if(dist < closestDistance)
        {
          closestTree = treePopulation[i];
          closestDistance = dist;
        }
      }
      return closestTree;
  }

  this.findClosestPredators = function()
  {
    //Make 1 variable-- come up with name
    this.runTarget = this.findTargetKD(predatorKDTree); // add parameter to report number of closest dot to eval path
  }

  this.traverse = function(target, speedModifier)
  {
    //Check if there is no current direction
    // if(this.runTarget)
    // {
    //   this.visualizeTarget(this.runTarget);
    //   //Check if there is no current direction
    //   this.rundir.set(this.runTarget.pos.x - this.pos.x, this.runTarget.pos.y - this.pos.y);
    //   this.rundir.normalize();
    //   this.rundir.mult(this.speed * speedModifier);
    //   this.pos.sub(this.dir);
    // }
    //if(this.dir.x == 0 && this.dir.y == 0){
      this.dir.set(target.pos.x - this.pos.x, target.pos.y - this.pos.y);
      this.dir.normalize();
      this.dir.mult(this.speed * speedModifier);
    //}
    //else
      this.pos.add(this.dir);
  }
  
  this.harvest = function(tree)
  {
    //Check if not at tree
    if (this.distSqrd(tree) > this.width*this.width)
    {
      //Move to tree
      this.traverse(tree, this.walkSpeed);
    }
    //If at tree, cut it
    else{
      if(this.timeAlive % 50 == 0)
        this.health++;
      if(this.timeAlive % 10 == 0)
      {
        tree.health--; 
        if(tree.health <=0)
        {
          this.treesCut++;
          this.health = this.maxHealth;
          this.target = null;
        }
      }
    }
  }
  
  this.update = function()
  {
    //cycle based on alertness
    this.timeAlive++;
    if(this.timeAlive % 1000 == 0)
      this.health--; 
    if(this.health <= 0)
    {
       this.die();
    }
    else{
      //Check for danger
      //if(this.timeAlive % 60 > 58)
      this.findClosestPredators();
      if(this.runTarget)
      {
        this.traverse(this.runTarget, -this.sprintSpeed);
        this.findingNewTarget = true;
      }
      else  
      {
        if(this.canReproduce && (this.fertilePoint < this.timeAlive))
        {
          if(this.mate && this.mate.alive)
          {
            this.reproduce();
          }
          else
            this.mate = this.findMate();
        }
        else 
        {
          if(!this.target || !this.target.alive || this.findingNewTarget){
            //Stop the directional movement
            this.dir.set(0,0);
            //this.target = this.findTargetLinear();
            this.target = this.findTargetKD(treeKDTree,1, Math.pow(this.range,3));
          }
          if(this.target){
            this.findingNewTarget = false;
            this.harvest(this.target);
          }
        }
      }
    }  
  }

  //NO MATE FREEZES IT
  this.reproduce = function()
  {
    //Check if not at mate
    if (this.distSqrd(this.mate) > this.width*this.width)
    {
      //Move to mate
      this.traverse(this.mate, this.walkSpeed);
    }
    //If at mate, mate it
    else{
      //instant birth?
      //Permanent mate?
      this.mate = null;
      this.fertilePoint += this.timeAlive + 1000;
      this.canReproduce--;
      harvesterPopulation[harvesterPopulation.length] =  new Harvester(this.pos.x, this.pos.y);
    }
  }
  

  this.display = function()
  {
    fill("blue");
    ellipse(this.pos.x,this.pos.y,this.width,this.height);
  }
  this.visualizeTarget = function(target)
  {
    stroke(255);
    line(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    noStroke();
  }

  this.distSqrd = function(obj)
  {
    return abs((obj.pos.x - this.pos.x)*(obj.pos.x - this.pos.x)) + abs((obj.pos.y - this.pos.y)*(obj.pos.y - this.pos.y)); 
  }

  this.distance = function(a, b){
    return Math.pow(a.x - b.x, 2) +  Math.pow(a.y - b.y, 2);
  }

  this.findTargetKD = function(tree, n = 1, range = this.range)
  {
    var temp = tree.nearest({x: this.pos.x, y: this.pos.y},n,range);
    if (temp.length != 0){
      return temp[0][0].itself;
    }
    else
      return null;
  }
  this.findMate = function()
  {
    var temp = harvesterKDTree.nearest({x: this.pos.x, y: this.pos.y},2, this.range*this.range);
    if (temp.length > 1){
      return temp[1][0].itself;
    }
    else
      return null;
  }
}