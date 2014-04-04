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
                colors = options.colors || ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
                days = options.days || ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                time_format = this.options.time_format || '',
                oMargin = options.margin;

			//24 Hours format option	
			if(time_format === '24'){
				times = options.times || ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
			} else {
				times = options.times || ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];
			}
            
            this.days = days;
            this.times = times;
            this.colors = colors;

            var margin = {
                top: 20,
                right: 30,
                bottom: 30,
                left: 40
            };

            var gridSize = Math.floor(width / 24),
                legendElementWidth = gridSize * 2,
                buckets = 9;

            this.gridSize = gridSize;
            this.legendElementWidth = legendElementWidth;
            this.buckets = buckets;

            this.margin = margin = reD3.util.mixin(margin, oMargin);

            this.width = width - this.margin.left - this.margin.right;
            this.height = height - this.margin.top - this.margin.bottom;

            var svg = this.svg = d3.select(this.element).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

            var dayLabels = svg.selectAll(".dayLabel")
                .data(this.days)
                .enter().append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", 0)
                .attr("y", function(d, i) {
                    return i * gridSize;
                })
                .style("text-anchor", "end")
                .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                .attr("class", function(d, i) {
                    return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis");
                });

            var timeLabels = svg.selectAll(".timeLabel")
                .data(times)
                .enter().append("text")
                .text(function(d) {
                    return d;
                })
                .attr("x", function(d, i) {
                    return i * gridSize;
                })
                .attr("y", 0)
                .style("text-anchor", "middle")
                .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                .attr("class", function(d, i) {
                    return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis");
                });
        },

        render: function(data) {
            var colorScale = d3.scale.quantile()
                .domain([0, this.buckets - 1, d3.max(data, function(d) {
                    return d.value;
                })])
                .range(this.colors);

            var gridSize = this.gridSize,
                legendElementWidth = this.legendElementWidth,
                buckets = this.buckets;


            var gridSize = this.gridSize,
                colors = this.colors,
                legendElementWidth = this.legendElementWidth,
                svg = this.svg,
                margin = this.margin;

            var heatMap = svg.selectAll(".hour")
                .data(data)
                .enter().append("rect")
                .attr("x", function(d) {
                    return (d.hour - 1) * gridSize;
                })
                .attr("y", function(d) {
                    return (d.day - 1) * gridSize;
                })
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("class", "hour bordered")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("fill", colors[0])
                .on('click',this.options.onClick);

            heatMap.transition().duration(1000)
                .style("fill", function(d) {
                    return colorScale(d.value);
                });

            heatMap.append("title").text(function(d) {
                return d.value;
            });

            var legend = svg.selectAll(".legend")
                .data([0].concat(colorScale.quantiles()), function(d) {
                    return d;
                })
                .enter().append("g")
                .attr("class", "legend");

            legend.append("rect")
                .attr("x", function(d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", this.height - margin.bottom)
                .attr("width", legendElementWidth)
                .attr("height", gridSize / 2)
                .style("fill", function(d, i) {
                    return colors[i];
                });

            legend.append("text")
                .attr("class", "mono")
                .text(function(d) {
                    return "≥ " + Math.round(d);
                })
                .attr("x", function(d, i) {
                    return legendElementWidth * i;
                })
                .attr("y", this.height + gridSize - margin.bottom);

        },

        clear: function() {
            this.svg.selectAll('*').remove();
        }
    }

    reD3.DayHourHeatmap = DayHourHeatmap;

})(this);
