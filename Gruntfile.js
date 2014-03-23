module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ["dist"],

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },

        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'examples/',
                        src: ['data/*'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/css/<%= pkg.name %>.css': [
                        'examples/css/area.css',
                        'examples/css/bar.css',
                        'examples/css/bubble.css',
                        'examples/css/heatmap.css',
                        'examples/css/line.css',
                        'examples/css/stackedarea.css',
                        'examples/css/treemap.css'
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'uglify', 'copy', 'cssmin']);

};
