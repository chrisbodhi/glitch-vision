var canvas, 
    ctx,
    id;

var addCanvas = function( image, id ){
  'use strict';
  
  // 2. add canvas object to page
  var imgWidth = image.context.width;
  var imgHeight = image.context.height;

  $('body').append('<canvas id="' + id + '" width="' + imgWidth + '" height="' + imgHeight + '" style="z-index:100;postion:absolute;"></canvas>');

  // 3. drop img src into canvas *IF JPG/JPEG/jpg/jpeg*
  canvas = document.getElementById( id );
  ctx = canvas.getContext('2d');

  var cleanImg = new Image();
  cleanImg.src = image.context.src;

  cleanImg.onload = function () {    
    ctx.drawImage( cleanImg, 0, 0, imgWidth, imgHeight );
  };
};

var glitchOut = function( id ){
  
  canvas = document.getElementById( id );
  ctx = canvas.getContext('2d');
  
  var my_image_data = ctx.getImageData( 0, 0, canvas.clientWidth, canvas.clientHeight );
  var parameters = { 
    amount: 17, 
    seed: 17, 
    iterations: 17, 
    quality: 17 
  };

  var drawGlitchedImageData = function(image_data) {
      ctx.putImageData(image_data, 0, 0);
  }

  glitch(my_image_data, parameters, drawGlitchedImageData);
};

// JPG Check - glitch.js only works for jpg/jpeg images
$(document).on('ready', function(){
  'use strict';

  $('img').each( function (){
    // 1. Create a random ID for the canvas image
    id = (Math.random() * 10000).toFixed().toString();
    
    if ((/\.(jpg|jpeg)/i).test($(this).context.src)){
      // drop image into canvas
      addCanvas( $(this), id );
      // remove image from DOM
      $(this).css('display', 'none');
      // run the glitching code
      glitchOut( id );

    }
  })
});