(function(global) {

    global.reD3 = global.reD3 || {};

    function Bubble(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    Bubble.prototype = {

        init: function() {
            var options = this.options,
                diameter = options.diameter || 640,
                format = d3.format(",d"),
                element = this.element,
                color = d3.scale.category20c(),
                bubble = d3.layout.pack().sort(null).size([diameter, diameter]).padding(1.5);

            this.svg = d3.select(element).append("svg").attr("width", diameter).attr("height", diameter).attr("class", "bubble");
            this.bubble = bubble;
            this.format = format;
            this.color = color;
        },

        render: function(data) {
            var svg = this.svg,
                options = this.options,
                self = this;

            this.data = data;

            var node = svg.selectAll(".node").data(self.bubble.nodes(data).filter(function(d) {
                return !d.children;
            })).enter().append("g").attr("class", "node").attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            node.append("title").text(function(d) {
                return d[options.text] + ": " + self.format(d.value);
            });

            node.append("circle").attr("r", function(d) {
                return d.r;
            }).style("fill", function(d) {
                return self.color(d[options.color]);
            });

            node.append("text").attr("dy", ".3em").style("text-anchor", "middle").text(function(d) {
                return d[options.text].substring(0, d.r / 3);
            });

            node.on('mousedown', function(d) {
                if (options.onClick) options.onClick(d);
            });
        },

        clear: function() {
            this.svg.selectAll('.node').remove();
        }
    };

    reD3.Bubble = Bubble;

})(this);