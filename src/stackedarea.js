(function(global) {
	'use strict';

	global.reD3 = global.reD3 || {};

	function StackedArea(element, options) {
		this.options = options;
		this.element = element;
		this.init();
	}

	StackedArea.prototype = {

		init: function() {
			var options = this.options,
			interpolation = options.interpolation || 'cardinal',
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

			var x = this.x = d3.time.scale().range([0, width]);

			var y = this.y = d3.scale.linear().range([height, 0]);

			this.color = d3.scale.category20c();

			this.xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(d3.time.days);

			this.yAxis = d3.svg.axis().scale(y).orient("left");

			this.stack = d3.layout.stack().offset("zero").values(function(d) {
				return d.values;
			}).x(function(d) {
				return d.date;
			}).y(function(d) {
				return d.value;
			});

			this.nest = d3.nest().key(function(d) {
				return d.key;
			});

			this.area = d3.svg.area().interpolate(interpolation).x(function(d) {
				return x(d.date);
			}).y0(function(d) {
				return y(d.y0);
			}).y1(function(d) {
				return y(d.y0 + d.y);
			});

			this.svg = d3.select(this.element).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		},

		render: function(data) {

			var svg = this.svg,
			x = this.x,
			y = this.y,
			color = this.color,
			xAxis = this.xAxis,
			yAxis = this.yAxis,
			stack = this.stack,
			nest = this.nest,
			area = this.area,
			height = this.height;

			var layers = stack(nest.entries(data));

			x.domain(d3.extent(data, function(d) {
				return d.date;
			}));
			y.domain([0, d3.max(data, function(d) {
				return d.y0 + d.y;
			})]);

			svg.selectAll(".layer").data(layers).enter().append("path").attr("class", "layer").attr("d", function(d) {
				return area(d.values);
			}).style("fill", function(d, i) {
				return color(i);
			});

			svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

			svg.append("g").attr("class", "y axis").call(yAxis);
		},

		clear: function() {
			this.svg.selectAll('*').remove();
		}
	}

	reD3.StackedArea = StackedArea;

})(this);