var addCanvas = function( image ){
  'use strict';

  // 1. Create a random ID for the canvas image
  var id = (Math.random() * 1000).toFixed();
  // 2. add canvas object to page
  image.prepend('<canvas id="' + id + '"></canvas>');
  // 3. drop img src into canvas *IF JPG/JPEG/jpg/jpeg*
  var canvas = $('canvas#' + id);
  var ctx = canvas.getContext('2d');

  var cleanImg = new Image();
  cleanImg.src = image.context.currentSrc;
  cleanImg.onload = function () {
    ctx.drawImage(cleanImg, image.context.width, image.context.height);
  };
};

// JPG Check - glitch.js only works for jpg/jpeg images
$('img').each( function (){
  'use strict';

  if ((/\.(jpg|jpeg)/i).test($(this).context.currentSrc)){
    // drop image into canvas
    addCanvas( $(this) );
    // remove image from DOM
    $(this).css('display', 'none');
    // run the glitching code

  }
});


