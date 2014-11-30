console.log('\'Allo \'Allo! Popup');

var addCanvas = function( image ){
  'use strict';

  // 1. Create a random ID for the canvas image
  var id = (Math.random() * 1000).toFixed().toString();
  console.log( id );
  
  // 2. add canvas object to page
  var imgWidth = image.context.width;
  var imgHeight = image.context.height;

  $('body').append('<canvas id="' + id + '" width="' + imgWidth + '" height="' + imgHeight + '"></canvas>');

  // 3. drop img src into canvas *IF JPG/JPEG/jpg/jpeg*
  var canvas = document.getElementById( id );
  var ctx = canvas.getContext('2d');

  var cleanImg = new Image();
  cleanImg.src = image.context.src;

  console.log( image.context.height );
  console.log( image.context.width );

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
    }
  })
});