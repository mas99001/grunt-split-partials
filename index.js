/*
 * grunt-split-partials
 * https://github.com/mas99001/grunt-split-partials.git
 *
 * Copyright (c) 2017 Aditya Kumar (mas99001)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('splitpartial', 'Split specified files into multiple partials.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({ });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var suffix = options.suffix;
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        if (! suffix) {
          suffix = filepath.replace(/^.*(\.[^.]+)$/, "$1");
        }
        // Read file source.
        return grunt.file.read(filepath);
      }).join("");
      // Write the destination file.
      var fragments = src.split(options.separator);
      for (var index in fragments) {
        var destname = f.dest + "/" + (options.prefix.length > index ? options.prefix[index] : options.prefix[options.prefix.length - 1] + "_" + (1 + index - options.prefix.length)) + suffix;
        grunt.file.write(destname, fragments[index]);
        // Print a success message.
        grunt.log.writeln('File "' + destname + '" created.');
      }

    });
  });

};