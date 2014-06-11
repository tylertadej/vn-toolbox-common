toolbox-common
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
