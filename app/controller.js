'use strict';

function MainCtrl($scope, $window) {

}

function LineCtrl($scope, $window) {
    var el = document.getElementById('line');
    var line = new reD3.Line(el, {
        width: 800,
        height: 500,
        xValue: 'date',
        yValue: 'close',
        yAxisText: 'Price ($)',
        margin: {
            top: 20
        }
    });

    var parseDate = d3.time.format("%d-%b-%y").parse;

    d3.tsv("dist/data/line.tsv", function(error, data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.close = +d.close;
        });
        line.render(data);
    });

    document.getElementById('update').onclick = function() {
        line.clear();

        d3.tsv("dist/data/lineb.tsv", function(error, data) {
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });
            line.render(data);
        });
    }

}

function PieCtrl($scope, $window) {
    var el = document.getElementById('pie');
    var pie = new reD3.Pie(el, {
        width: 500,
        height: 500,
        text: 'age',
        color: 'age',
        value: 'population',
        onClick: function(d) {
            console.log(d)
        }
    });

    d3.csv("dist/data/pie.csv", function(error, data) {
        data.forEach(function(d) {
            d.population = +d.population;
        });
        pie.render(data);
    });

    document.getElementById('update').onclick = function() {
        pie.clear();
        d3.csv("dist/data/pieb.csv", function(error, data) {
            data.forEach(function(d) {
                d.population = +d.population;
            });
            pie.render(data);
        });
    }

}

function BarCtrl($scope, $window) {
    var el = document.getElementById('bar');
    var options = {
        width: 800,
        height: 600,
        yAxisText: 'Frequency',
        yValue: 'frequency',
        xValue: 'letter',
        onClick: function(d) {
            console.log(d);
        },
        onMouseOver: function(d) {
            console.log(d);
        },
        onMouseOut: function(d) {}
    };

    var bar = new reD3.Bar(el, options);

    d3.tsv("dist/data/bar.tsv", type, function(error, data) {
        bar.clear();
        bar.render(data);
    });

    document.getElementById('update').onclick = function() {
        d3.tsv("dist/data/barb.tsv", type, function(error, data) {
            bar.clear();
            bar.render(data);
        });
    };

    function type(d) {
        d.frequency = +d.frequency;
        return d;
    }
}

function AreaCtrl($scope, $window) {
    var el = document.getElementById('area');
    var area = new reD3.Area(el, {
        width: 800,
        height: 500,
        xValue: 'date',
        yValue: 'close',
        yAxisText: 'Price',
        color: '#ab34aa',
        margin: {
            top: 20
        }
    });

    var parseDate = d3.time.format("%d-%b-%y").parse;

    d3.tsv("dist/data/area.tsv", function(error, data) {
        data.forEach(function(d) {
            d.date = parseDate(d.date);
            d.close = +d.close;
        });
        area.render(data);
    });

    document.getElementById('update').onclick = function() {
        area.clear();

        d3.tsv("dist/data/areab.tsv", function(error, data) {
            data.forEach(function(d) {
                d.date = parseDate(d.date);
                d.close = +d.close;
            });
            area.render(data);
        });
    }

}

function BubbleCtrl($scope, $window) {
    var data = {
        "children": [{
            "name": "cluster",
            "cname": "AgglomerativeCluster",
            "value": 3938
        }, {
            "name": "chart",
            "cname": "CommunityStructure",
            "value": 3812
        }, {
            "name": "dexter",
            "cname": "HierarchicalCluster",
            "value": 6714
        }, {
            "name": "cluster",
            "cname": "MergeEdge",
            "value": 743
        }, {
            "name": "graph",
            "cname": "BetweennessCentrality",
            "value": 3534
        }, {
            "name": "graph",
            "cname": "LinkDistance",
            "value": 5731
        }, {
            "name": "graph",
            "cname": "MaxFlowMinCut",
            "value": 7840
        }, {
            "name": "graph",
            "cname": "ShortestPaths",
            "value": 5914
        }, {
            "name": "graph",
            "cname": "SpanningTree",
            "value": 3416
        }, {
            "name": "optimization",
            "cname": "AspectRatioBanker",
            "value": 7074
        }]
    };

    var dataB = {
        "children": [{
            "name": "clust",
            "cname": "AgglomerativeCluster",
            "value": 393
        }, {
            "name": "charter",
            "cname": "CommunityStructure",
            "value": 3812
        }, {
            "name": "dexter",
            "cname": "HierarchicalCluster",
            "value": 6714
        }, {
            "name": "cluster",
            "cname": "MergeEdge",
            "value": 7433
        }, {
            "name": "graph",
            "cname": "BetweennessCentrality",
            "value": 353
        }, {
            "name": "graph",
            "cname": "LinkDistance",
            "value": 573
        }, {
            "name": "graph",
            "cname": "MaxFlowMinCut",
            "value": 4840
        }, {
            "name": "graph",
            "cname": "ShortestPaths",
            "value": 5914
        }, {
            "name": "graph",
            "cname": "SpanningTree",
            "value": 3416
        }, {
            "name": "optimization",
            "cname": "AspectRatioBanker",
            "value": 7074
        }]
    };

    var el = document.getElementById('bubble');
    var bubble = new reD3.Bubble(el, {
        diameter: 800,
        text: 'cname',
        color: 'name',
        onClick: function(d) {
            console.log(d)
        }
    });

    bubble.render(data);
    document.getElementById('update').onclick = function() {
        bubble.clear();
        bubble.render(dataB);
    }
}

function HeatMapCtrl($scope, $window) {
    var el = document.getElementById('heatmap');
    var heatmap = new reD3.DayHourHeatmap(el, {
        width: 800,
        height: 500
    });

    d3.csv("dist/data/heatmap.csv", function(error, data) {
        data.forEach(function(d) {
            d.day = +d.weekday,
            d.hour = +d.hour + 1;
            d.value = +d.counts
        });
        heatmap.render(data);
    });

}

function StackedAreaCtrl($scope, $window) {
    var el = document.getElementById('stackedarea');
    var sa = new reD3.StackedArea(el, {
        width: 800,
        height: 500,
        interpolation: 'linear',
        margin: {
            top: 20
        }
    });

    var format = d3.time.format("%m/%d/%y");;

    d3.csv("dist/data/sa.csv", function(data) {
        data.forEach(function(d) {
            d.date = format.parse(d.date);
            d.value = +d.value;
        });
        sa.render(data);
    });

    document.getElementById('update').onclick = function() {
        sa.clear();
        d3.csv("dist/data/sab.csv", function(data) {
            data.forEach(function(d) {
                d.date = format.parse(d.date);
                d.value = +d.value;
            });
            sa.render(data);
        });

    }
}

function TreeMapCtrl($scope, $window) {
    var data = {
        "children": [{
            "name": "cluster",
            "title": "AgglomerativeCluster",
            "value": 3938
        }, {
            "name": "chart",
            "title": "CommunityStructure",
            "value": 3812
        }, {
            "name": "dexter",
            "title": "HierarchicalCluster",
            "value": 6714
        }, {
            "name": "cluster",
            "title": "MergeEdge",
            "value": 743
        }, {
            "name": "graph",
            "title": "BetweennessCentrality",
            "value": 3534
        }, {
            "name": "graph",
            "title": "LinkDistance",
            "value": 5731
        }, {
            "name": "graph",
            "title": "MaxFlowMinCut",
            "value": 7840
        }, {
            "name": "graph",
            "title": "ShortestPaths",
            "value": 5914
        }, {
            "name": "graph",
            "title": "SpanningTree",
            "value": 3416
        }, {
            "name": "optimization",
            "title": "AspectRatioBanker",
            "value": 7074
        }]
    };

    var dataB = {
        "children": [{
            "name": "clust",
            "title": "AgglomerativeCluster",
            "value": 393
        }, {
            "name": "charter",
            "title": "CommunityStructure",
            "value": 3812
        }, {
            "name": "dexter",
            "title": "HierarchicalCluster",
            "value": 6714
        }, {
            "name": "cluster",
            "title": "MergeEdge",
            "value": 7433
        }, {
            "name": "graph",
            "title": "BetweennessCentrality",
            "value": 353
        }, {
            "name": "graph",
            "title": "LinkDistance",
            "value": 573
        }, {
            "name": "graph",
            "title": "MaxFlowMinCut",
            "value": 4840
        }, {
            "name": "graph",
            "title": "ShortestPaths",
            "value": 5914
        }, {
            "name": "graph",
            "title": "SpanningTree",
            "value": 3416
        }, {
            "name": "optimization",
            "title": "AspectRatioBanker",
            "value": 7074
        }]
    };

    var el = document.getElementById('treemap');
    var treemap = new reD3.Treemap(el, {
        width: 800,
        height: 600,
        text: 'title',
        color: 'title',
        onClick: function(d) {
            console.log(d)
        }
    });

    treemap.render(data);
    document.getElementById('update').onclick = function() {
        treemap.clear();
        treemap.render(dataB);
    }

}
