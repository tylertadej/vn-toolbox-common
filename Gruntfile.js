'use strict';

// Generated on 2014-05-07 using generator-angular 0.8.0

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist'
		},

		ngdocs: {
			options: {
				dest: 'docs',
				html5Mode: true,
				startPage: '/api/Volusion.toolboxCommon',
				title: 'Volusion Toolbox Common Reference',
				titleLink: '/api/Volusion.toolboxCommon',
				bestMatch: true
			},
			api: {
				src: ['app/scripts/**/*.js'],
				title: 'Volusion Toolbox Common Reference'
			}
		},

		protractor: {
			options: {
				keepAlive: false,
				configFile: './protractor.conf.js'
			},
			singlerun: {},
			auto: {
				keepAlive: true,
				options: {
					args: {
						seleniumPort: 4444
					}
				}
			}
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			bower: {
				files: ['bower.json'],
				tasks: ['wiredep']
			},
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js', 'test/spec/{,*/}*.js'],
				tasks: ['newer:jshint:all', 'test_no_coverage'],
				options: {
					livereload: true
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['newer:jshint:test']
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%= yeoman.app %>'
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						'.tmp',
						'test',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js'
			],
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: [
							'.tmp',
							'<%= yeoman.dist %>/*',
							'!<%= yeoman.dist %>/.git*',
							'coverage/*'
						]
					}
				]
			},
			server: {
				files: [
					{
						dot: true,
						src: [
							'.tmp',
							'coverage/*'
						]
					}
				]
			}
		},

		// Automatically inject Bower components into the app
		wiredep: {
			app: {
				src: ['<%= yeoman.app %>/index.html'],
				ignorePath: '<%= yeoman.app %>/'
			},
			sass: {
				src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				ignorePath: '<%= yeoman.app %>/bower_components/'
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: '<%= yeoman.app %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n',
				outputStyle: 'compact'
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated',
					environment: 'production'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		cssmin: {
			options: {
				root: '<%= yeoman.app %>'
			}
		},

		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.{png,jpg,jpeg,gif}',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},

		svgmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.svg',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},

		html2js: {
			options: {
				singleModule: true,
				module: 'Volusion.toolboxCommon',
				rename: function(moduleName) {
					return moduleName.replace('../app/views/partials/', '');
				},
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeComments: true,
					removeEmptyAttributes: true,
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				}
			},
			partials: {
				src: ['<%= yeoman.app %>/views/partials/{,*/}*.html'],
				dest: '.tmp/partial-views.js'
			}
		},

		// ngmin tries to make the code safe for minification automatically by
		// using the Angular long form for dependency injection. It doesn't work on
		// things like resolve or inject so those have to be done manually.
		ngmin: {
			scripts: {
				src: ['.tmp/concat/scripts.js'],
				dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.app %>',
						dest: '<%= yeoman.dist %>',
						src: [
							'!*.{ico,png,txt}',
							'!.htaccess',
							'!*.html',
							'views/widgets/*.html',
							'images/{,*/}*.{webp}',
							'fonts/*'
						]
					},
					{
						expand: true,
						cwd: '.tmp/images',
						dest: '<%= yeoman.dist %>/images',
						src: ['generated/*']
					}
				]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		coverage: {
			options: {
				thresholds: {
					'statements': 0,
					'branches': 0,
					'lines': 0,
					'functions': 40
				},
				dir: 'coverage'
			}
		},

		concat: {
			options: {
				stripBanners: {
					block: true,
					line: false
				},
				banner: '\n/*! <%= pkg.name %> - ver.<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n\n'
			},
			main: {
				files: [
					{
						src: [
							'<%= yeoman.app %>/scripts/{,*/}*.js',
							'!<%= yeoman.app %>/scripts/app.js',
							'!<%= yeoman.app %>/scripts/{,*/}main.js',
							'.tmp/partial-views.js'
						],
						dest: '.tmp/concat/scripts.js'
					},
					{
						src: [
							'.tmp/styles/{,*/}*.css',
							'!.tmp/styles/{,*/}main.css'
						],
						dest: '<%= yeoman.dist %>/<%= pkg.name %>-styles.css'
					}
				]
			}
		},

		uglify: {
			options: {
				mangle: true,
				compress: true,
				wrap: true
			},
			scripts: {
				files: {
					'<%= yeoman.dist %>/<%= pkg.name %>.min.js': [
						'<%= yeoman.dist %>/<%= pkg.name %>.js'
					]
				}
			}
		},

		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		}
	});

	grunt.registerTask('serve', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'wiredep',
			'compass:server',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('test_no_coverage', [
		'clean:server',
		'wiredep',
		'compass:server',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('test', [
		'test_no_coverage',
		'coverage'
	]);

	grunt.registerTask('test:e2e', [
		'protractor:singlerun'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'wiredep',
		'compass:dist',
		'imagemin',
		'svgmin',
		'html2js',
		'concat',
		'ngmin',
		'copy:dist',
		'cssmin',
		'uglify'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);

	grunt.registerTask('docs', [
		'ngdocs'
	]);
};
