var canvas, 
    ctx,
    id;

var replaceImage = function ( image ) {
  'use strict';

  var imgWidth = image.context.width;
  var imgHeight = image.context.height;

  var cleanImg = new Image();
  cleanImg.src = image.context.src;

  cleanImg.onload = function () {
    ctx.drawImage( cleanImg, 0, 0, imgWidth, imgHeight );
  };
};

var addCanvas = function( image, id ){
  'use strict';
  
  var imgWidth = image.context.width;
  var imgHeight = image.context.height;

  $(image).replaceWith('<canvas id="' + id + '" width="' + imgWidth + '" height="' + imgHeight + '"></canvas>');

  canvas = document.getElementById( id );
  ctx = canvas.getContext('2d');

  return image;
};

var generateParams = function () {
  return { 
    amount: Math.random() * 90, 
    seed: Math.random() * 90, 
    iterations: Math.random() * 90, 
    quality: Math.random() * 90 
    // amount: 87, 
    // seed: 55, 
    // iterations: 42, 
    // quality: 69
  };
};

var glitchOut = function( canvas, ctx, params ){
  'use strict';

  var my_image_data = ctx.getImageData( 0, 0, canvas.clientWidth, canvas.clientHeight );

  var makeGlitchedImageData = function(image_data) {
    ctx.putImageData(image_data, 0, 0);
  }

  glitch(my_image_data, params, makeGlitchedImageData);
};

// JPG Check - glitch.js only works for jpg/jpeg images
$(document).on('ready', function(){
  'use strict';

  $('img').each( function ( ){
    // 1. Create a random ID for the canvas image
    id = (Math.random() * 10000).toFixed().toString();
    var self = $(this);
    var params = generateParams();

    if ((/\.(jpg|jpeg)/i).test( self.context.src) ){
      // drop image into canvas
      var anImage = addCanvas( self, id );
      replaceImage( anImage );
      // run the glitching code
      glitchOut( canvas, ctx, params );
    }
  })
});