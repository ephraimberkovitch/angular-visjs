angular.module('ngVis', [])

    .factory('VisDataSet', function () {
        'use strict';
        return function (data, options) {
            // Create the new dataSets
            return new vis.DataSet(data, options);
        };
    })

    /**
     * TimeLine directive
     */
    .directive('visTimeline', function () {
        'use strict';
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {
                var timelineEvents = [
                    'rangechange',
                    'rangechanged',
                    'timechange',
                    'timechanged',
                    'select',
                    'doubleClick',
                    'click',
                    'contextmenu'
                ];

                // Declare the timeline
                var timeline = null;

                var watchData, watchOptions;

                watchData = scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    if (timeline != null) {
                        timeline.destroy();
                    }

                    // Create the timeline object
                    timeline = new vis.Timeline(element[0], scope.data.items, scope.data.groups, scope.options);

                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (timelineEvents.indexOf(String(event)) >= 0) {
                            timeline.on(event, callback);
                        }
                    });

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(timeline);
                    }
                });

                watchOptions = scope.$watchCollection('options', function (options) {
                    if (timeline == null) {
                        return;
                    }
                    timeline.setOptions(options);
                });

                scope.$on('$destroy', function () {
                    // clear angular $watchers
                    watchData();
                    watchOptions();
                    if (timeline != null) {
                        timeline.destroy();
                    }
                });
            }
        };
    })

    /**
     * Directive for network chart.
     */
    .directive('visNetwork', function () {
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {
                var networkEvents = [
                    'click',
                    'doubleClick',
                    'oncontext',
                    'hold',
                    'release',
                    'selectNode',
                    'selectEdge',
                    'deselectNode',
                    'deselectEdge',
                    'dragStart',
                    'dragging',
                    'dragEnd',
                    'hoverNode',
                    'hoverEdge',
                    'blurNode',
                    'blurEdge',
                    'zoom',
                    'showPopup',
                    'hidePopup',
                    'startStabilizing',
                    'stabilizationProgress',
                    'stabilizationIterationsDone',
                    'stabilized',
                    'resize',
                    'initRedraw',
                    'beforeDrawing',
                    'afterDrawing',
                    'animationFinished'

                ];

                var network = null;

                var watchData, watchOptions;

                watchData = scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    if (network != null) {
                        network.destroy();
                    }

                    // Create the graph2d object
                    network = new vis.Network(element[0], scope.data, scope.options);

                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (networkEvents.indexOf(String(event)) >= 0) {
                            network.on(event, callback);
                        }
                    });

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(network);
                    }
                });

                watchOptions = scope.$watchCollection('options', function (options) {
                    if (network == null) {
                        return;
                    }
                    network.setOptions(options);
                });

                scope.$on('$destroy', function () {
                    // clear angular $watchers
                    watchData();
                    watchOptions();
                    if (network != null) {
                        network.destroy();
                    }
                });
            }
        };
    })

    /**
     * Directive for graph2d.
     */
    .directive('visGraph2d', function () {
        'use strict';
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {
                var graphEvents = [
                    'rangechange',
                    'rangechanged',
                    'timechange',
                    'timechanged',
                    'finishedRedraw'
                ];

                // Create the chart
                var graph = null;

                var watchData, watchOptions;

                watchData = scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    if (graph != null) {
                        graph.destroy();
                    }

                    // Create the graph2d object
                    graph = new vis.Graph2d(element[0], scope.data.items, scope.data.groups, scope.options);

                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (graphEvents.indexOf(String(event)) >= 0) {
                            graph.on(event, callback);
                        }
                    });

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(graph);
                    }
                });

                watchOptions = scope.$watchCollection('options', function (options) {
                    if (graph == null) {
                        return;
                    }
                    graph.setOptions(options);
                });

                scope.$on('$destroy', function () {
                    // clear angular $watchers
                    watchData();
                    watchOptions();
                    if (graph != null) {
                        graph.destroy();
                    }
                });
            }
        };
    })

    /**
     * Directive for graph3d.
     */
    .directive('visGraph3d', function () {
        'use strict';
        return {
            restrict: 'EA',
            transclude: false,
            scope: {
                data: '=',
                options: '=',
                events: '='
            },
            link: function (scope, element, attr) {
                var graphEvents = [
                    'cameraPositionChange'
                ];

                // Create the chart
                var graph = null;

                var watchData, watchOptions;

                watchData = scope.$watch('data', function () {
                    // Sanity check
                    if (scope.data == null) {
                        return;
                    }

                    // If we've actually changed the data set, then recreate the graph
                    // We can always update the data by adding more data to the existing data set
                    // NOTE: graph3d does NOT have a "destroy" function.
                    //if (graph != null) {
                    //graph.destroy();
                    //}

                    // Create the graph3d object
                    if (graph === null) {
                        graph = new vis.Graph3d(element[0], scope.data, scope.options);
                        // ...but if the graph already exists, just add the data,
                        // rather than a complete re-draw.
                    } else {
                        graph.setData(scope.data);
                    }

                    // Attach an event handler if defined
                    angular.forEach(scope.events, function (callback, event) {
                        if (graphEvents.indexOf(String(event)) >= 0) {
                            graph.on(event, callback);
                        }
                    });

                    // onLoad callback
                    if (scope.events != null && scope.events.onload != null &&
                        angular.isFunction(scope.events.onload)) {
                        scope.events.onload(graph);
                    }
                });

                watchOptions = scope.$watchCollection('options', function (options) {
                    if (graph == null) {
                        return;
                    }
                    graph.setOptions(options);
                });

                scope.$on('$destroy', function () {
                    // clear angular $watchers
                    watchData();
                    watchOptions();
                    // NOTE: graph3d does NOT have a "destroy" function.
                    //if (graph != null) {
                    //  graph.destroy();
                    //}
                });
            }
        };
    })
;