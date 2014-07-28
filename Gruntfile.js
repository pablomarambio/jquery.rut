module.exports = function(grunt){
	grunt.initConfig({
		uglify: {
			dist: {
				options: {
					sourceMap: true,
					preserveComments: 'some'
				},
				files: {
					"jquery.rut.min.js": "jquery.rut.js"
				}
			}
		},
		watch: {
			uglify: {
				files: ['./jquery.rut.js'],
				tasks: ['uglify:dist'],
				options: {
					nospawn: true
				}
			},
		}
	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch']);
};
