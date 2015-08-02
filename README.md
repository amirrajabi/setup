#Getting started

This project requires:

* [node and npm](http://nodejs.org/) `brew install node` or [nvm][https://github.com/creationix/nvm]
* [grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) `npm install -g grunt-cli`

Install node dependencies:

    npm install

To run a grunt build:

    grunt build

To start create a font icon:

    grunt generateIconFont

To run a grunt watch:

    grunt

Automatically page opens on your active browser [http://localhost:1111]

# Building the project

The project uses Grunt to build assemble the html, minify and concatenate the assets into the `public` folder. The main grunt tasks are:

* `grunt build`: runs an entire build from scratch, running all grunt tasks and compiling the flat site into the `public` directory, and watching project too
* `grunt generateIconFont`: create a font icon from your .SVG

## Single grunt tasks explained

* `bower-install-simple`: Grunt Task for Installing Bower Dependencies
* `clean`: Clean HTML all files in `public` directory.
* `grunt assemble`: Compiles the HTML from handlebars into flat HTML, placing the files in the `public` directory
* `grunt jshint`: runs jshint on javascript files before any concat and uglify tasks
* `grunt usemin`: Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views).
Grunt plugins which usemin can use to optimize files:
concat concatenates files (usually JS or CSS).
uglify minifies JS files.
* `grunt autoprefixer`: Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.
* `grunt imagemin`: Minify images
* `grunt copy`: Copy files and folders
* `grunt sass`: Compiles the source SASS files into CSS, placing them in the `public` directory
* `grunt cssmin`: Minifies all the CSS in the `public` directory

# HTML structure

The flat HTML is built from handlebar templates. This makes use of page templates and partials. The `source/hbs` directory can be used as a reference for how the pages are constructed.

* `layouts`: These are the outer page layouts. The master.hbs includes elements that are on every page. The rest are sub-layouts, such as the default layout, or a full width layout. These sub-layouts are compiled into the master template.
* `pages`: Each file represents a flat HTML file that will be copied into the public directory. At the top of this file variables are set for the compiler, such as page template and page title
* `partials`: These are HTML modules that are reused across page templates. Things like the header, footer and sub-navigation live in this directory

# AMIR RAJABI