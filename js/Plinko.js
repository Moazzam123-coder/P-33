class Plinko{
    constructor(x,y,radius){
        var options = {
            isStatic: true
        }
        this.body = Bodies.circle(x,y,radius, options);
        this.radius = radius;
        this.color = "white"

        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        push();
        fill(this.color);
        ellipse(pos.x, pos.y, this.radius);
        pop();
    }
}