(function(global) {

    global.reD3 = global.reD3 || {};

    function Bar(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    Bar.prototype = {
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
            };

            margin = reD3.util.mixin(margin, oMargin);

            width = this.width = width - margin.left - margin.right,
            height = this.height = height - margin.top - margin.bottom;

            formatPercent = this.formatPercent = d3.format(".0%");

            this.x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            this.y = d3.scale.linear()
                .range([height, 0]);

            this.xAxis = d3.svg.axis()
                .scale(this.x)
                .orient("bottom");

            this.yAxis = d3.svg.axis()
                .scale(this.y)
                .orient("left")
                .tickFormat(formatPercent);

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
                svg = this.svg,
                width = this.width,
                height = this.height,
                yAxisText = options.yAxisText || '',
                yValue = options.yValue || 'frequency',
                xValue = options.xValue || 'letter';

            x.domain(data.map(function(d) {
                return d[xValue];
            }));
            y.domain([0, d3.max(data, function(d) {
                return d[yValue];
            })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(yAxisText);

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {
                    return x(d[xValue]);
                })
                .attr("width", x.rangeBand())
                .attr("y", function(d) {
                    return y(d[yValue]);
                })
                .attr("height", function(d) {
                    return height - y(d[yValue]);
                }).on('mousedown', function(d) {
                    if (options.onClick)
                        options.onClick(d);
                }).on('mouseover', function(d) {
                    if (options.onMouseOver)
                        options.onMouseOver(d);
                }).on('mouseout', function(d) {
                    if (options.onMouseOut)
                        options.onMouseOut(d);
                });
        },

        clear: function() {
            this.svg.selectAll('*').remove();
        }
    }

    reD3.Bar = Bar;

})(this);
