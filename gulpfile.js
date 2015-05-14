var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );

gulp.task( 'js', function(){
	gulp.src( [
        'src/MoGL.js',
        'src/Vertex.js',
        'src/Matrix.js',
        'src/Geometry.js',
        'src/Material.js',
        'src/Texture.js',
        'src/Mesh.js',
        'src/Group.js',
        'src/Camera.js',
        'src/Scene.js',
        'src/World.js',
        'src/**/*.js'
        ] )
		.pipe( concat( 'mogl.js' ) )
		.pipe( gulp.dest( 'lib' ) )
		.pipe( concat( 'mogl.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( 'lib' ) );
} );

gulp.task( 'watch:js', ['js'], function(){
	gulp.watch( 'src/**/*.js', ['js'] );
} );

gulp.task( 'dev', ['watch:js'] );