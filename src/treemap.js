(function(global) {

    global.reD3 = global.reD3 || {};

    function Treemap(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    Treemap.prototype = {

        init: function() {
            var options = this.options,
                width = options.width || 960,
                height = options.height || 500,
                count = options.count || 'count',
                format = d3.format(",d"),
                element = this.element,
                color = d3.scale.category20c(),
                treemap = d3.layout.treemap().size([width, height]);

            var margin = {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            };

            margin = options.margin || margin;
            width = width - margin.left - margin.right, height = height - margin.top - margin.bottom;

            this.svg = d3.select(element).append('svg').attr("width", width).attr("height", height)
            .append('g').attr('class', 'mnode').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            this.format = format;
            this.color = color;
            this.treemap = treemap;
        },

        render: function(data) {
            var svg = this.svg,
                options = this.options,
                treemap = this.treemap,
                color = this.color,
                self = this;

            this.data = data;

            treemap.sticky(true);

            var node = svg.selectAll(".node").data(treemap.nodes(data).filter(function(d) {
                return !d.children;
            }));

            node.enter().append("g").attr("class", "node").attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            node.append("rect").attr("width", function(d) {
                return Math.max(0, d.dx - 1);
            }).attr("height", function(d) {
                return Math.max(0, d.dy - 1);
            }).style("fill", function(d) {
                return color(d[options.color]);
            });

            node.append("svg:text").attr("x", 0).attr("dx", "0.35em").attr("dy", "1.9em").text(function(d) {
                return d[options.text];
            })
            .each(reD3.fontSize)
            .each(reD3.wordWrap)

            node.on('mousedown', function(d) {
                options.onClick(d);
            });

            node.exit().remove();
        },

        clear: function() {
            this.svg.selectAll('.node').remove();
        }
    };

    reD3.Treemap = Treemap;
})(this);
