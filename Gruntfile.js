module.exports = function (grunt) {

    require('jit-grunt')(grunt)({});
    require('time-grunt')(grunt);

    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),

            "bower-install-simple": {
                options: {
                    color: true
                },
                "dev": {
                    options: {
                        production: false
                    }
                },
                "build": {
                    options: {
                        production: true
                    }
                }
            },

            clean: {
                html: ['public/**/*.html']
            },

            assemble: {
                options: {
                    layoutdir: '<%= pkg.hbsSource %>/layouts/',
                    partials: ['<%= pkg.hbsSource %>/components/**/*.hbs'],
                    helpers: ['<%= pkg.hbsSource %>/helpers/*.js'],
                    data: '<%= pkg.hbsSource %>/data/*.json'
                },
                site: {
                    expand: true,
                    cwd: '<%= pkg.hbsSource %>/pages/',
                    src: ['**/*.hbs'],
                    dest: 'public/'
                }
            },

            sass: {
                develop: {
                    options: {
                        sourceMap: true
                    },
                    files: {
                        '<%= pkg.cssDestination %>/style.css': '<%= pkg.styleSource %>/style.scss'
                    }
                }
            },

            autoprefixer: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                dist: {
                    files: {
                        '<%= pkg.cssDestination %>/style-prefix.css': '<%= pkg.cssDestination %>/style.css'
                    }
                }
            },

            cssmin: {
                compress:{
                    files:{
                        '<%= pkg.cssDestination %>/style.min.css':'<%= pkg.cssDestination %>/style-prefix.css'
                    }
                }
            },

            jshint: {
                all: ['<%= pkg.scriptSource %>/kernel/**/*.js']
            },

            concat: {
                dist: {
                    files: {
                        '<%= pkg.scriptDestination %>/jquery.min.map': ['<%= pkg.vendorScripts %>/jquery/dist/jquery.min.map'],

                        '<%= pkg.scriptSource %>/main.js': [
                            '<%= pkg.vendorScripts %>/jquery/dist/jquery.js',
                            '<%= pkg.vendorScripts %>/jquery-placeholder/jquery.placeholder.js',
                            '<%= pkg.vendorScripts %>/parsleyjs/dist/parsleyjs.js',
                            '<%= pkg.scriptSource %>/kernel/modules/*.js',
                            '<%= pkg.scriptSource %>/kernel/app.js'
                        ]

                    }
                },
                ie: {
                    files: {
                        '<%= pkg.scriptSource %>/ie-support.js': [
                            '<%= pkg.vendorScripts %>/respond/dest/respond.js',
                            '<%= pkg.vendorScripts %>/html5shiv/dist/html5shiv.js',
                            '<%= pkg.vendorScripts %>/modernizr/modernizr.js'
                        ]
                    }
                }
            },

            uglify: {
                dist: {
                    files: {
                        '<%= pkg.scriptDestination %>/main.min.js': ['<%= pkg.scriptSource %>/main.js']
                    }
                },

                ie: {
                    files: {
                        '<%= pkg.scriptDestination %>/ie-support.min.js': ['<%= pkg.scriptSource %>/ie-support.js']
                    }
                }
            },

            webfont: {
                icons: {
                    src: '<%= pkg.assetSource %>/images/font-icon/*.svg',
                    dest: '<%= pkg.assetSource %>/fonts/font-icon/'
                },
                options: {
                    font: 'font-icon',
                    normalize: true,
                    syntax: 'bootstrap',
                    relativeFontPath: '../assets/fonts/font-icon/',
                    htmlDemo: true,
                    engine: 'node',
                    descent: 0,
                    templateOptions: {
                        baseClass: 'font-icon',
                        classPrefix: 'font-icon-',
                        mixinPrefix: 'font-icon-'
                    }
                }
            },

            copy: {
                html: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= pkg.htmlSource %>',
                            src: ['**/*'],
                            dest: 'public/'

                        }
                    ]
                },
                csstoscss: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= pkg.assetSource %>/fonts/font-icon/',
                            src: ['font-icon.css'],
                            dest: '<%= pkg.styleSource %>/modules/',
                            rename: function (dest, src) {
                                return dest + src.replace(/\.css$/, ".scss").replace(/^font-icon/, "font-icon");
                            }
                        }
                    ]
                },
                assets: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= pkg.assetSource %>',
                            src: ['**/*'],
                            dest: '<%= pkg.assetDestination %>'

                        }
                    ]
                }
            },

            connect: {
                server: {
                    options: {
                        port: 1111,
                        base: 'public',
                        livereload: true
                    }
                }
            },

            watch: {
                options: {
                    livereload: true
                },
                html: {
                    files: ['<%= pkg.htmlSource %>/**/*.html'],
                    tasks: ['copy:html']
                },
                hbs: {
                    files: ['<%= pkg.hbsSource %>/**/*.hbs'],
                    tasks: ['newer:assemble']
                },
                scss: {
                    files: ['<%= pkg.styleSource %>/**/*.scss'],
                    tasks: ['sass', 'autoprefixer', 'cssmin']
                },
                script:{
                    files: ['<%= pkg.scriptSource %>/**/*.js'],
                    tasks: ['concat:dist', 'uglify:dist']
                }
            }

        });

    grunt.registerTask('build', [
        'bower-install-simple',
        'clean',
        'assemble',
        'sass',
        'autoprefixer',
        'cssmin',
        'jshint',
        'concat',
        'uglify',
        'copy:assets',
        'connect',
        'watch'
    ]);

    grunt.registerTask('html', [
        'bower-install-simple',
        'clean',
        'sass',
        'autoprefixer',
        'cssmin',
        'jshint',
        'concat',
        'uglify',
        'copy:html',
        'copy:assets',
        'connect',
        'watch'
    ]);

    grunt.registerTask('default', [
        'connect',
        'watch'
    ]);

    grunt.registerTask('generateIconFont', [
        'webfont',
        'copy:csstoscss'
    ]);

};
