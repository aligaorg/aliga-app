module.exports = function(grunt) {

  "use strict";

  var _ = require("lodash");

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    exec: {
      bower_install: "bower cache clean --config.interactive=false && bower install --config.interactive=false"
    },

    bower_concat: {
      all: {
        dest: "<%= pkg.buildPath %>/js/_bower.js",
        exclude: ["angular-mocks", "angular-i18n", "angular", "angular-pouchdb", "pouchdb", "es5-shim"],
        callback: function(mainFiles) {
          return _.map(mainFiles, function(filepath) {
            // Use minified files if available
            var min = filepath.replace(/\.js$/, ".min.js");
            return grunt.file.exists(min) ? min : filepath;
          });
        },
        bowerOptions: {
          relative: false
        }
      }
    },

    jshint: {
      all: {
        // define the files to lint
        src: ["Gruntfile.js", "<%= pkg.appPath %>/scripts/**/*.js"],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
          jshintrc: true,
          // more options here if you want to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
            angular: false
          }
        }
      },
      test: {
        options: {
          jshintrc: "<%= pkg.appPath %>/test/.jshintrc"
        },
        src: ["<%= pkg.appPath %>/test/spec/**/*.js"]
      }
    },

    copy: {
      ng_locale: {
        src: "<%= pkg.appPath %>/bower_components/angular-i18n/angular-locale_it-it.js",
        dest: "<%= pkg.buildPath %>/js/angular-locale_it-it.js"
      },
      data: {
        expand: true,
        cwd: "<%= pkg.appPath %>",
        src: "data/**",
        dest: "<%= pkg.distPath %>"
      },
      index: {
        src: "<%= pkg.appPath %>/index.html",
        dest: "<%= pkg.distPath %>/index.html"
      },
      ionic: {
        expand: true,
        cwd: "<%= pkg.appPath %>/lib/",
        src: "ionic/**",
        dest: "<%= pkg.distPath %>/"
      },
      es5_shim: {
        expand: true,
        cwd: "<%= pkg.appPath %>/bower_components/es5-shim/",
        src: "es5-shim.min.js",
        dest: "<%= pkg.distPath %>/js/"
      },
      angular_pouchdb: {
        expand: true,
        cwd: "<%= pkg.appPath %>/bower_components/angular-pouchdb/",
        src: "angular-pouchdb.js",
        dest: "<%= pkg.distPath %>/js/"
      },
      pouchdb: {
        expand: true,
        cwd: "<%= pkg.appPath %>/bower_components/pouchdb/dist/",
        src: "pouchdb.min.js",
        dest: "<%= pkg.distPath %>/js/"
      },
      ng_cordova: {
        src: "<%= pkg.appPath %>/lib/ng-cordova.js",
        dest: "<%= pkg.buildPath %>/js/ng-cordova.js"
      },
      ionicFonts: {
        expand: true,
        cwd: "<%= pkg.appPath %>/lib/ionic",
        src: "fonts/**",
        dest: "<%= pkg.distPath %>/"
      }
    },

    ngtemplates: {
      aliga: {
        cwd: "<%= pkg.appPath %>",
        src: "views/**.html",
        dest: "<%= pkg.buildPath %>/js/views.js",
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true          }
        }
      }
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ";"
      },
      build: {
        // the files to concatenate
        src: [
          "<%= jshint.all.src[1] %>",
          "<%= ngtemplates.aliga.dest %>"
        ],
        // the location of the resulting JS file
        dest: "<%= pkg.buildPath %>/js/<%= pkg.name %>.concat.js"
      }
    },

    ngAnnotate: {
      all: {
        // Target-specific file lists and/or options go here.
        files: {
          "<%= pkg.buildPath %>/js/<%= pkg.name %>.annotated.js": ["<%= concat.build.dest %>"]
        }
      },
    },

    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        // the banner is inserted at the top of the output
        banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      dist: {
        files: {
          "<%= pkg.distPath %>/js/<%= pkg.name %>.min.js": [
            "<%= pkg.buildPath %>/js/<%= pkg.name %>.annotated.js",
            "<%= bower_concat.all.dest %>",
            "<%= copy.ng_locale.dest %>",
            "<%= copy.ng_cordova.dest %>"
          ]
        }
      }
    },

    cssmin: {
      all: {
        options: {
          banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
        },
        files: {
          "<%= pkg.distPath %>/css/<%= pkg.name %>.min.css": [
            "<%= pkg.appPath %>/styles/**/*.css"
          ]
        }
      }
    },

    "json-minify": {
      build: {
        files: "<%= pkg.distPath %>/data/**/*.json"
      }
    },

    clean: {
      src: [
        "<%= pkg.buildPath %>/**/*"
      ]
    },

    watch: {
      js: {
        files: ["<%= jshint.all.src[1] %>"],
        tasks: ["jshint:all", "concat", "ngAnnotate", "uglify", "karma"]
      },
      jsTest: {
        files: ["<%= pkg.appPath %>/test/spec/{,*/}*.js"],
        tasks: ["jshint:test", "karma"]
      },
      templates: {
        files: ["<%= pkg.appPath %>/views/**.html"],
        tasks: ["ngtemplates", "concat", "ngAnnotate", "uglify"]
      },
      css: {
        files: ["<%= pkg.appPath %>/styles/**/*.css"],
        tasks: ["cssmin"]
      },
      index: {
        files: ["<%= pkg.appPath %>/index.html"],
        tasks: ["copy:index"]
      },
      data: {
        files: ["<%= pkg.appPath %>/data/**"],
        tasks: ["copy:data", "json-minify"]
      }
    },

    karma: {
      unit: {
        configFile: "<%= pkg.appPath %>/test/karma.conf.js",
        singleRun: true
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: "<%= pkg.distPath %>"
        }
      },
      test: {
        options: {
          port: 9002,
          middleware: function (connect) {
            return [
              //connect.static(".tmp"),
              connect.static("test"),
              connect().use(
                "/bower_components",
                connect.static("./bower_components")
              ),
              connect.static("<%= pkg.appPath %>")
            ];
          }
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-ng-annotate");
  grunt.loadNpmTasks("grunt-bower-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-angular-templates");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-json-minify");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("default", ["exec", "clean", "bower_concat", "copy", "jshint:all", "ngtemplates", "concat", "ngAnnotate", "uglify", "cssmin", "json-minify", "karma"]);

  grunt.registerTask("build", ["clean", "bower_concat", "copy", "jshint:all", "ngtemplates", "concat", "ngAnnotate", "uglify", "cssmin", "json-minify", "karma"]);

  grunt.registerTask("dev", ["exec", "clean", "bower_concat", "copy", "jshint", "ngtemplates", "concat", "ngAnnotate", "uglify", "cssmin", "json-minify", "connect", "karma", "watch"]);

  grunt.registerTask("test", [
    // "clean",
    "jshint:test",
    "connect:test",
    "karma"
  ]);

};
