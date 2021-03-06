# toolbox-common

> A toolbox of components for developing Volusion e-commerce themes

[![Build Status][]](https://travis-ci.org/volusion-angular/vn-toolbox-common)
[![Dependency Status][]](https://gemnasium.com/volusion-angular/vn-toolbox-common)
[![Views][]](https://sourcegraph.com/github.com/volusion-angular/vn-toolbox-common)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


Installation
==============

To install toolbox-common run:

<strong>bower install git@github.com:volusion-angular/vn-toolbox-common.git  --save</strong>

Setup Protractor debugging:

https://www.youtube.com/watch?v=VLMyI7QKcwg

Common widgets:

    * Carousel
    * Image
    * Link
    * Rating
    * ... to be updated

Usage:

<strong>Carousel</strong>

    <div vn-carousel image-list="imageList"></div>

    -OR-

    <vn-carousel image-list="imageList"></vn-carousel>

<strong>Image</strong>

    <div vn-image image="image"></div>

    -OR-

    <vn-image image="image"></vn-image>

<strong>Link</strong>

    <a vn-link href="http://www.yahoo.com" target="_self">Go to Yahoo</a>

    -OR-

    <vn-link href="http://www.google.com" target="_self">Go to Goolge</vn-link>

<strong>Rating</strong>

    <div vn-rating rating-value="rating"></div>

    -OR-

    <vn-rating rating-value="rating"></vn-rating>


# Data
There are several services that provide access to the apps data. The vnDataSrc factory service is used to get information and its public methods always return an object with a list of items (and other things you likely will not care about).

# Documentation
You can generate documentation for this code base and serve it locally if you wish.

Generate Docs with

* $ grunt docs.

See the vnConfig factory as an example. It was the first one implemented.
You can serve the docs locally if you so choose. I use nginx, here is my server config:

    server {
        listen 2929;
        set $host_path "/Users/matt_hippely/git/vn-toolbox-common/docs";
        root $host_path;
        index index.html;

        # SEO
        #if ($args ~ "_escaped_fragment_=/?(.+)") {
            #set $path $1;
            #rewrite ^ /snapshots/$path last;
        #}

        # Re-route nested routes through index
        location / {
            try_files $uri $uri/ /index.html =404;
        }
    }

# Local Development Workflow

If you're part of the core team working on vn-toolbox-common, here's how you can develop code changes in toolbox and see them reflected immediately in your theme for integration testing:

## Unix

1. In vn-toolbox-common via command line type:
    - bower link
2. In your theme project, via command line type:
    - bower link vn-toolbox-common
3. Each time you save a file in vn-toolbox-common, via command line type: 
    - grunt (which will update the dist folder which is used by the theme project)
    
## Windows
1. In your checkout of vn-toolbox-common, on the command line type:
    - bower link
    - This stores the symbolic link/path to the vn-toolbox-common folder 
2. Still on the command line, change directory to your theme project and type:
    - bower link vn-toolbox-common
    - This links the (already bower installed) vn-toolbox-common folder to the checkout on your computer
3. Each time a change is made in the vn-toolbox-common project run grunt
    - grunt builds the project and your changes get put into the dist files (used by the theme)
    - The theme method does not watch the bower_component/vn-toolbox-common/dist directory for file changes so you will have to reload your theme.
    
**External Resources For Bower docs and gh windows thread with some issues a windows user ran into last year related to linking**

1. http://bower.io/docs/api/#link
2. https://github.com/bower/bower/issues/472


Done. See your changes reflected live in your theme project.
