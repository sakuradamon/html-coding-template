module.exports = function(grunt) {
    // Gruntの設定
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // 各タスクの設定
    grunt.initConfig({
        // Webサーバの設定
        connect: {
            pc: {
                options: {
                    port: 9001,
                    base: 'www'
                }
            }
        },
        // clean
        clean: {
            options: {
                force: true
            },
            publish: {
                src: [
                    'www/**/*'
                ]
            }
        },
        // copy
        copy: {
            source: {
                expand: true,
                cwd: 'assets',
                src: ['**/*','!**/*.map'],
                dest: 'www'
            }
        },
        // pug
        pug: {
            options: {
                pretty: true,
                data: grunt.file.readJSON('package.json'),
                data: function(dest, src) {
                    var depth = src[0].split('/').length;
                    var root_dir = '';
                    var filedepth = depth-3;
                    for(var i = 0;i < filedepth;i++){
                        root_dir += '../';
                    }
                    return {
                        from: src,
                        to: dest,
                        root_dir:root_dir
                    };
                }
            },
            source: {
                expand: true,
                cwd: 'pug',
                src: '**/!(_)*.pug',
                dest: 'www',
                ext: '.html'
            }
        },
        sass: {
            pc : {
                src : 'scss/pc/style.scss',
                dest : 'assets/css/style.css'
            }
            /*
            sp : {
                src : 'scss/sp/style.scss',
                dest : 'assets/css/style_sp.css'
            }
            */
        },
        cssmin : {
            pc : {
                src : 'assets/css/style.css',
                dest : 'assets/css/style.min.css'
            }
            /*
            sp : {
                src : 'assets/css/style_sp.css',
                dest : 'assets/css/style_sp.min.css'
            }
            */
        },
        babel : {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: [
                    {
                        "expand": true,
                        "cwd": "javascript",
                        "src": ["*.js", "**/*.js"],
                        "dest": "assets/js",
                        "ext": ".js"
                    }
                ]
            }
        },
        // Watch
        watch: {
            // options
            options: {
                livereload: true,
                nospawn: true
            },
            // pug
            pug: {
                files: 'pug/**/*.pug',
                tasks: ['pug']
            },
            // scss
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass', 'cssmin']
            },
            // js
            js: {
                files: ["javascript/**/*.js"],
                tasks: ["babel", 'copy']
            },
            // copy
            assets: {
                files: 'assets/**/*',
                tasks: ['copy']
            }
        },
        open: {
            pc: {
                path: 'http://localhost:<%= connect.pc.options.port %>/'
            }
        }
    });

    // プラグインの読み込み
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');

    // defaultタスクの設定
    grunt.registerTask('default', ['clean', 'pug', 'sass', 'cssmin', 'babel', 'copy', 'connect', 'open', 'watch']);
};
