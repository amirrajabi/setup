module.exports = function (grunt) {

	require('jit-grunt')(grunt)({});

	// Configuration
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		assemble: {
			options: {
				layoutdir: 'source/hbs/layouts/',
				partials: ['source/hbs/partials/**/*.hbs'],
				helpers: ['source/hbs/helpers/*.js'],
				data:'source/hbs/data/*.json'
			},
			site: {
				expand: true,
				cwd: 'source/hbs/pages/',
				src: ['**/*.hbs'],
				dest: 'public/'
			}
		},

		uglify: {
			options: {
				mangle: {
					except: [
						'jQuery',
						'Backbone',
						'Spinner',
						'$',
						'enquire',
						'respond',
						'Bootstrap',
						'R',
						'Raphael'
					]
				}
			},
			build: {
				options: {
					sourceMap: true,
					sourceMapIncludeSources: true,
					mangle: false,
					compress: false
				},
				files: {
					'public/js/project.min.js': [
						'source/js/project.js',
					],
					'public/js/vendor.min.js': [
						'source/bower_components/x.js',
						'source/bower_components/y.js'


					],
					'public/js/ie.min.js': [
						'source/bower_components/console-polyfill/index.js',
						'source/bower_components/html5shiv/dist/html5shiv.js',
						'source/bower_components/respond/src/respond.js',
						'source/bower_components/media-match/media.match.js',
						'source/bower_components/selectivizr/selectivizr.js',
						'source/bower_components/respond/src/matchmedia.addListener.js'
					]
				}
			}
		},

		sass: {
			develop: {
				options: {
					sourceMap: true
				},
				files: {
					'public/css/style.css': 'source/scss/**/*.scss'
				}
			}
		},

		"bower-install-simple": {
			options: {
				color: true,
				directory: "source/bower_components"
			},
			"dev": {
				options: {
					production: true
				}
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'public',
					livereload: true,
					open: 'http://localhost:9001'
				}
			}
		},

		webfont: {
			icons: {
				src: './source/images/icon-font/*.svg',
				dest: './source/fonts/project-icon/'
			},
			options: {
				font: 'project-icon',
				normalize: true,
				syntax: 'bootstrap',
				relativeFontPath: '../fonts/project-icon/',
				htmlDemo: true,
				engine: 'node',
				descent: 0,
				//iconHeight: 20,
				templateOptions: {
					baseClass: 'project-icon',
					classPrefix: 'project-icon-',
					mixinPrefix: 'project-icon-'
				}
			}
		},

		copy: {
			css_to_scss: {
				files: [
					{
						expand: true,
						cwd: 'source/fonts/project-icon/',
						src: ['project-icon.css'],
						dest: 'source/scss/',
						rename: function(dest, src) {
							return dest + src.replace(/\.css$/, ".scss").replace(/^project-icon/, "_icon-font");
						}
					}
				]
			},
			images: {
				files: [
					{
						expand: true,
						cwd: 'source/images',
						src: ['**/*'],
						dest: 'public/images'
					}
				]
			}

		},

		watch: {
			options: {
				livereload: true
			},
			assemble: {
				files: ['source/hbs/**/*.hbs', 'source/hbs/**/*.json'],
				tasks: ['uglify', 'sass'],
				options: {
					spawn: false
				}
			},
			js: {
				files: 'source/js/*.js',
				tasks: ['uglify']
			},

			scss: {
				files: 'source/scss/**/*.scss',
				tasks: ['sass'],
				options: {
					livereload: false
				}
			},
			css: {
				files: 'public/css/**/*.css',
				tasks: []
			}
		}
	});

	// Tasks
	grunt.registerTask('build', ['bower-install-simple','assemble', 'sass', 'uglify','copy:images', 'connect', 'watch']);
	grunt.registerTask('generateIconFont', ['webfont', 'copy:css_to_scss'])
};
