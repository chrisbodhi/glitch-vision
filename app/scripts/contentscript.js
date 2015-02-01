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
  'use strict';
  return {
    amount: Math.random() * 99,
    seed: Math.random() * 100,
    iterations: Math.random() * 50,
    quality: Math.random() * 99
  };
};

var glitchOut = function( canvas, ctx, params ){
  'use strict';

  var myImageData = ctx.getImageData( 0, 0, canvas.clientWidth, canvas.clientHeight );

  var makeGlitchedImageData = function(imageData) {
    ctx.putImageData(imageData, 0, 0);
  };

  glitch(myImageData, params, makeGlitchedImageData);
};

// JPG Check - glitch.js only works for jpg/jpeg images
$(document).on('ready', function(){
  'use strict';

  $('img').each( function ( ){
    id = (Math.random() * 10000).toFixed().toString();
    var self = $(this);
    if ((/\.(jpg|jpeg)/i).test( self.context.src) ){
      var anImage = addCanvas( self, id );
      var params = generateParams();
      replaceImage( anImage );
      console.log( params );
      console.log( '=======================================================' );
      glitchOut( canvas, ctx, params );
    }
  });
});