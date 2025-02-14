const applyStyles = (element) => (styles) => {
    // console.log(styles);
    Object.keys(styles).forEach(key => {
        element.style[key] = styles[key];
    });
};
function applyStyle(element, style) {
    if (element && style) {
        for (var prop in style) {
            if (style.hasOwnProperty(prop)) {
                element.style[prop] = style[prop];
            }
        }
    }
}
function Box(parent, x, y, height, width, className) {
    this.x = x ? x : 0;
    this.y = y ? y : 0;
    this.width = height ? height : 0;
    this.height = width ? width : 0;
    this.className = className ? className : 'box';
    this.element = document.createElement('div');
    this.element.classList.add(this.className);
    parent.appendChild(this.element);
    this.applyStyles = applyStyles(this.element);

    this.draw = function() {
       const style = {
           left: this.x+'px',
           top: this.y+'px',
           width: this.width ? this.width+'px': 'initial',
           height: this.height? this.height+'px': 'initial'
       }
       this.applyStyles(style);
    }
}
function randomHeight(){
    return Math.round(120+Math.random()*200);
}
function Pole(parent,islowerpole){
    this.x = 290
    this.y=200;
    this.element= document.createElement('div')
    this.height = randomHeight();
    console.log(this.height)
    this.width= 120;
    this.element.classList.add('pole')
    parent.appendChild(this.element)
    this.draw = function(){
        const style={
            height:this.height+"px",
            width:this.width+'px',
            left:this.x+'px',
            top:islowerpole?'none':'0',
            transform:islowerpole?'none':'rotate(180deg)',
            bottom: islowerpole ?this.y+'px':'none'
            
        }
        applyStyle(this.element,style)
    }
    this.move = function(){
        this.x -=2;
        this.draw()
    }
    this.draw()

}
function Bird(app) {
    this.x = 100;
    this.y = 100;
    this.acc = 5; 
    this.width = 37;
    this.height = 57;
    this.className = 'bird';
    Box.call(this, app, this.x, this.y, this.height, this.width, this.className);
    this.draw();

    this.move = function() {
        this.y += 1 * this.acc;
        this.element.style.transform='rotate(60deg)'
        this.draw();
    }

    addEventListener('keydown', (e) => {
        if(e.key === 'ArrowUp') {
            this.y -= 125;
            this.element.style.transform='rotate(-60deg)'
            // this..style.transition='transform 1s ease'

        }
    });
}

Object.setPrototypeOf(Bird.prototype, Box.prototype);

;(function() {
    var poles =[];
    // let noOfPoles=100;
    // for(let i=0;i<noOfPoles;i++){
    //     poles.push(new Pole(app))
    // }
    var count =0;
    var upperpole=[];
    var lowerpole=[];
    var app = document.getElementById('app');
    var bird = new Bird(app);
    var wrapper = document.getElementsByClassName('wrapper')[0];
    let marginLeft = 0;
    var tpole = new Pole(app,false)
    var bpole = new Pole(app,true)
    console.log(tpole)
    let run =setInterval(() => {
        bird.move();
        // console.log(wrapper.clientHeight)
        tpole.move();
        bpole.move()
        count+=15;
        let b= getproperties(bird);
        let topP = getproperties(tpole);
        let bottomP = getproperties(bpole);
        let collidedTop = detectCollision(b,topP)
        let collidedBottom = detectCollision(b,bottomP);
        if(collidedTop || collidedBottom){
            console.log('collided')
            clearInterval(run)
        }
        if(bird.y >= wrapper.clientHeight-240){
            console.log('reached')
            clearInterval(run)
        }
        marginLeft-=5;
        wrapper.style.marginLeft = marginLeft+'px';
    }, 20);
    
    function detectCollision(b1,b2){
        return(b1.x < b2.x+b2.w &&
            b2.x < b1.x+b1.w &&
            b1.y < b2.y+b2.h &&
            b2.y < b1.y+b1.h)
    }
    function getproperties(box){
    return{
        x:box.x,
        y:box.y,
        w:box.width,
        h:box.height
    }
}
})()