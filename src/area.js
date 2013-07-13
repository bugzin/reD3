(function(global) {

    global.reD3 = global.reD3 || {};

    function Area(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    Area.prototype = {

        init: function() {
            var options = this.options,
            width = options.width || 960,
            height = options.height || 500,
            oMargin = options.margin;

            var margin = {
                top: 20,
                right: 30,
                bottom: 30,
                left: 40
            },

            margin = reD3.util.mixin(margin, oMargin);

            width = this.width = width - margin.left - margin.right;
            height = this.height = height - margin.top - margin.bottom;
            var xValue = this.xValue = options.xValue || 'date';
            var yValue = this.yValue = options.yValue || 'value';

            var x, y;

            x = this.x = d3.time.scale()
                .range([0, width]);

            y = this.y = d3.scale.linear()
                .range([height, 0]);

            this.xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            this.yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            this.area = d3.svg.area()
                .x(function(d) {
                    return x(d[xValue]);
                })
                .y0(height)
                .y1(function(d) {
                    return y(d[yValue]);
                });

            this.svg = d3.select(this.element).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        },

        render: function(data) {
            var options = this.options,
            x = this.x,
            y = this.y,
            xAxis = this.xAxis,
            yAxis = this.yAxis,
            xValue = this.xValue,
            yValue = this.yValue,
            yAxisText = options.yAxisText || '',
            color = options.color || 'steelblue',
            width = this.width,
            height = this.height,
            area = this.area,
            svg = this.svg;
            
            x.domain(d3.extent(data, function(d) {
                return d[xValue];
            }));
            y.domain([0, d3.max(data, function(d) {
                return d[yValue];
            })]);

            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area)
                .attr("fill", color);

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
        },
        
        clear: function() {
            this.svg.selectAll('*').remove();
        }
    }

    reD3.Area = Area;

})(this);