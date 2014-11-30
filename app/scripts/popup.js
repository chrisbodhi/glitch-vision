console.log('\'Allo \'Allo! Popup');

// NOTE: these need to be available for addCanvas() and the on ready actions
// 1. Create a random ID for the canvas image
var id = (Math.random() * 1000).toFixed().toString();

var canvas, 
    ctx;

var addCanvas = function( image ){
  'use strict';
  
  // 2. add canvas object to page
  var imgWidth = image.context.width;
  var imgHeight = image.context.height;

  $('body').append('<canvas id="' + id + '" width="' + imgWidth + '" height="' + imgHeight + '"></canvas>');

  // 3. drop img src into canvas *IF JPG/JPEG/jpg/jpeg*
  canvas = document.getElementById( id );
  ctx = canvas.getContext('2d');

  var cleanImg = new Image();
  cleanImg.src = image.context.src;

  cleanImg.onload = function () {    
    ctx.drawImage( cleanImg, 0, 0, imgWidth, imgHeight );
  };
};

// JPG Check - glitch.js only works for jpg/jpeg images
$(document).on('ready', function(){
  'use strict';

  $('img').each( function (){

    if ((/\.(jpg|jpeg)/i).test($(this).context.currentSrc)){
      // drop image into canvas
      addCanvas( $(this) );
      // remove image from DOM
      $(this).css('display', 'none');
      // run the glitching code
      var my_image_data = ctx.getImageData( 0, 0, canvas.clientWidth, canvas.clientHeight );
      var parameters = { 
        amount: Math.random() * 90, 
        seed: Math.random() * 90, 
        iterations: Math.random() * 90, 
        quality: Math.random() * 90 
      };

      console.log( parameters );

      var drawGlitchedImageData = function(image_data) {
          ctx.putImageData(image_data, 0, 0);
      }

      glitch(my_image_data, parameters, drawGlitchedImageData);

    }
  })
});