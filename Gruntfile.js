module.exports = function(grunt) {
// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Project settings
		yeoman: {
			// Configurable paths
			css: 'app/css',
			scss: 'app/scss',
			js: 'app/js',

			dist: 'dist'
		},

		// Task Configurations
		watch: {
			scss: {
				files: ['<%= yeoman.scss %>/**/*.scss'],
				tasks: ['sass:dev', 'autoprefixer:dev']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'app/*.html',
					'app/partials/*.html',
					'<%= yeoman.css %>/*.css',
					'app/images/**/*.{jpg,jpeg,JPG,png,bmp,gif,svg,webp}'
				]
			}
		},

		sass: {                             // Task
			dev: {                            // Target
				options: {                      // Target options
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.scss %>',
					src: ['*.scss'],
					dest: '.tmp',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
					browsers: ['last 2 version', 'ie 8', 'ie 9']
			},
				dev: {
					files: [{
						expand: true,
						cwd: '.tmp',
						src: '{,*/}*.css',
						dest: '<%= yeoman.css %>',
						ext: '.css'
					}]
				}
		}
	});

	// Configure Tasks
	grunt.registerTask('default', ['watch']);

};
