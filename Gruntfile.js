/*global module, require */

// Generated on 2014-05-07 using generator-angular 0.8.0

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	'use strict';

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
				tasks: ['bowerInstall']
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
				tasks: ['compass:server', 'autoprefixer']
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

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp/styles/',
						src: '{,*/}*.css',
						dest: '.tmp/styles/'
					}
				]
			}
		},

		// Automatically inject Bower components into the app
		bowerInstall: {
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

				}
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>',
				flow: {
					html: {
						steps: {
							//js : ['concat', 'uglifyjs'],
							//js : ['concat'],
							//css: ['cssmin']
							//css: ['concat']

						},
						post: {}
					}
				}
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
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

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.dist %>',
						src: ['*.html', 'views/{,*/}*.html'],
						dest: '<%= yeoman.dist %>'
					}
				]
			}
		},

		// ngmin tries to make the code safe for minification automatically by
		// using the Angular long form for dependency injection. It doesn't work on
		// things like resolve or inject so those have to be done manually.
		ngmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '.tmp/concat/scripts',
						src: '*.js',
						dest: '.tmp/concat/scripts'
					}
				]
			}
		},

		// Replace Google CDN references
		cdnify: {
			dist: {
				html: ['<%= yeoman.dist %>/*.html']
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
			dist: {
				files: [
					{
						src: [
							'<%= yeoman.app %>/scripts/{,*/}*.js',
							'!<%= yeoman.app %>/scripts/app.js',
							'!<%= yeoman.app %>/scripts/{,*/}main.js'
						],
						dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
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
			'bowerInstall',
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
		'compass',
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
		'bowerInstall',
		//'useminPrepare',
		'compass:dist',
		'imagemin',
		'svgmin',
		'concat',
		//'ngmin',
		'copy:dist',
		//'cdnify',
		'cssmin' //,
		//'uglify'//,
		//'rev',
		//'usemin'//,
		//'htmlmin'
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
