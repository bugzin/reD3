(function(global) {

    global.reD3 = global.reD3 || {};

    function DayHourHeatmap(element, options) {
        this.element = element;
        this.options = options;
        this.init();
    }

    DayHourHeatmap.prototype = {

        init: function() {
            var options = this.options,
            width = options.width || 960,
            height = options.height || 500,
            colors = options.colors || ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],
            days = options.days || ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            times = options.times || ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"],
            oMargin = options.margin;

            this.days = days;
            this.times = times;
            this.colors = colors;
            
            var margin = {
                top: 20,
                right: 30,
                bottom: 30,
                left: 40
            },

            var gridSize = Math.floor(width / 24),
                legendElementWidth = gridSize*2,
                buckets = 9;

            margin = reD3.util.mixin(margin, oMargin);

            width = this.width = width - margin.left - margin.right;
            height = this.height = height - margin.top - margin.bottom;

            var colorScale = d3.scale.quantile()
                .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                .range(this.colors);

            var svg = d3.select(this.element).append("svg")
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
