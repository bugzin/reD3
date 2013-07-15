(function(global) {

    global.reD3 = global.reD3 || {};

    function Line(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    Line.prototype = {

        init: function() {
            var options = this.options,
            width = options.width || 960,
            height = options.height || 500,
            xValue = options.xValue || 'date',
            yValue = options.yValue || 'value',
            oMargin = options.margin;

            this.xValue = xValue;
            this.yValue = yValue;
            this.yAxisText = options.yAxisText || '';
            
            var margin = {
                top: 20,
                right: 30,
                bottom: 30,
                left: 40
            },

            margin = reD3.util.mixin(margin, oMargin);

            width = this.width = width - margin.left - margin.right;
            height = this.height = height - margin.top - margin.bottom;

            var x = this.x = d3.time.scale()
                .range([0, width]);

            var y = this.y = d3.scale.linear()
                .range([height, 0]);

            this.xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            this.yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            this.line = d3.svg.line()
                .x(function(d) {
                    return x(d[xValue]);
                })
                .y(function(d) {
                    return y(d[yValue]);
                });

            this.svg = d3.select(this.element).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        },

        render: function(data) {
            var svg = this.svg,
            x = this.x,
            y = this.y,
            xAxis = this.xAxis,
            yAxis = this.yAxis,
            height = this.height,
            xValue = this.xValue,
            yValue = this.yValue,
            yAxisText = this.yAxisText,
            line = this.line;

            x.domain(d3.extent(data, function(d) {
                return d[xValue];
            }));
            y.domain(d3.extent(data, function(d) {
                return d[yValue];
            }));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(yAxisText);

            svg.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        },

        clear: function() {
            this.svg.selectAll('*').remove();
        }
    }

    reD3.Line = Line;

})(this);
