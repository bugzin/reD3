(function(global) {

    global.reD3 = global.reD3 || {};

    function Pie(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    Pie.prototype = {

        init: function() {
            var options = this.options,
                width = options.width || 960,
                height = options.height || 500,
                radius = Math.min(width, height) / 2;

            var value = options.value || 'value';
            this.text = options.text || 'title';
            this.fieldColor = options.color || 'title';

            this.color = d3.scale.category20();

            this.arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);

            this.pie = d3.layout.pie()
                .sort(null)
                .value(function(d) {
                    return d[value];
                });

            this.svg = d3.select(this.element).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        },

        render: function(data) {
            var svg = this.svg,
            pie = this.pie,
            color = this.color,
            arc = this.arc,
            fColor = this.fieldColor,
            text = this.text,
            onClick = this.options.onClick;

            var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color(d.data[fColor]);
                })
                .on('click', function (d) {
                    onClick(d.data);
                });

            g.append("text")
                .attr("transform", function(d) {
                    return "translate(" + arc.centroid(d) + ")";
                })
                .attr("dy", ".35em")
                .style("text-anchor", "middle")
                .text(function(d) {
                    return d.data[text];
                });
        },

        clear: function() {
            this.svg.selectAll('*').remove();
        }
    };

    reD3.Pie = Pie;

})(this);