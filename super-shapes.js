var SuperShapes = function() {
    this.width = 800;
    this.height = 800;

    // default formulas parameters
    this.m = 14;
    this.n1 = 14;
    this.n2 = 18.5;
    this.n3 = 7;
    this.scale = 100;
};

SuperShapes.prototype = {
    init: function(holderId) {
        var self = this;
        var holder = document.getElementById(holderId);
        holder.style.width = this.width+"px";
        holder.style.height = this.height+"px";
        holder.style.marginTop = (-this.height/2)+"px";
        holder.style.marginLeft = (-this.width/2)+"px";
        Raphael(holderId, this.width, this.height, function() { self.setup(self, this); } );
    },

    setup: function(self, paper) {
        self.paper = paper;

        var shapePath = self.calculatePath(this.m, this.n1, this.n2, this.n3, this.scale);
        self.path = self.paper.path( shapePath ).attr({ fill: "#1e1e1e", "stroke-width": 0});
        self.path.translate(self.width/2, self.height/2);

        self.redraw();
    },

    // -----------------------------------------------------------

    calculatePath: function(m, n1, n2, n3, scale) {
        var path = "";
        var a = 1;
        var b = 1; 

        var k2PI = Math.PI * 2;
        for(var f = 0; f <= k2PI; f += 0.01) {
          // Superformula: http://en.wikipedia.org/wiki/Superformula
          var r = Math.pow((Math.pow(Math.abs(Math.cos(m*f/4)/a),n2) + Math.pow(Math.abs(Math.sin(m*f/4)/b), n3)), -(1/n1)); // Superformula 
          var x = r * Math.cos(f) * scale;
          var y = r * Math.sin(f) * scale;
          if(f == 0) {
            path += "M"+x+","+y;
          } else {
            path += "L"+x+","+y;
          }
        }
        path += "Z";

        return path;
    },

    redraw: function() {
        var shapePath = this.calculatePath(this.m, this.n1, this.n2, this.n3, this.scale);
        this.path.animate({path:shapePath}, 0);
    }

};

var sp = new SuperShapes();
sp.init("holder");

var refresh = function(value) {
	sp.redraw();
};

window.onload = function() {
	var gui = new dat.GUI();
    gui.closed = true;
	gui.add(sp, 'm', 1, 30).step(1).onChange(refresh);
	gui.add(sp, 'n1', 1, 30).onChange(refresh);
	gui.add(sp, 'n2', 1, 30).onChange(refresh);
	gui.add(sp, 'n3', 1, 30).onChange(refresh);
};
