// FRONT:
// Large- 12 mm
// Medium-10 mm
// Small- 8 mm
// Inside:
// Medium 6-7?mm( uppercase)
// 4-5 mm (lowercase)
// Small. 4-5 mm (uppercase)
// 2-3 mm (lowercase)

        var pxl = 3.7795275591;
        var flarge = 12 * pxl;
        var fmedium = 10 * pxl;
        var fsmall = 8 * pxl;
        // If Up and Lo are the same size it will cause a conflict for secondMessageChange
        var iUpMedium = 7 * pxl;
        var iLoMedium = 5 * pxl;
        var iUpSmall = 4 * pxl;
        var iLoSmall = 3 * pxl;
        var firstFontSize = fmedium;
        var secondFontSize = iLoMedium;
        var savedSecondText = '';
        var textLineHeight = secondFontSize * 1.5;

        //Create Canvas
        var stage = new Konva.Stage({
              container: 'canvas',
              width: 945,
              height: 800,
          });
  
        var layer = new Konva.Layer();
  
  
        // Load iamges
        function loadImages(sources, callback) {
          var images = {};
          var loadedImages = 0;
          var numImages = 0;
          // get num of sources
          for (var src in sources) {
            numImages++;
          }
          for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function () {
              if (++loadedImages >= numImages) {
                callback(images);
              }
            };
            images[src].src = sources[src];
          }
        }
  
        //Draw with images inside
        function draw(images) {
  
          var wallet = new Konva.Rect({
              x: 0,
              y: 0,
              width: 945,
              height: 800,
              fillPatternImage: images.wallet_front,
              fillPatternOffset: { x: 0, y: 0 },
              strokeWidth: 0,
            });
  
            //Starting layer
            layer.add(wallet);
            layer.add(firstText);
  
          // add the layer to the stage
          stage.add(layer);
        }
  
        //Create list of images
        var sources = {
          //wallet_front: '/img/wallet_front.jpg',
          wallet_front: '/img/wallet.jpg',
        };
  
        //Load images onto the canvas
        loadImages(sources, function (images) {
          draw(images);
        });

    
        // // font Type
        // var fontStyleChange = document.querySelector('#textFontOptions');
        // fontStyleChange.addEventListener("change", function() {
        //   simpleText.setAttr('fontFamily', this.value);
        //   layer.draw();
        // })
  
  
        // since this text is inside of a defined area, we can center it using
        // align: 'center'
      var firstText = new Konva.Text({
            x: 670,
            y: 220,
            text:
              "Caglar",
            fontSize: firstFontSize,
            fontFamily: 'Rockwell',
            fill: 'rgba(37, 25, 4,0.6)',
            width: 500,
            padding: 20,
            align: 'center',
            draggable: true,
            name: 'textNode',
            offset: {
              x: 250,
              y: 70,
            },
        });

      var secondText = new Konva.Text({
          x: 270,
          y: 620,
          text:
            "I only want to love you\n twice in my lifetime.\n That is now and forever.",
          fontSize: secondFontSize,
          fontFamily: 'Rockwell',
          fill: 'rgba(37, 25, 4,0.8)',
          width: 500,
          padding: 20,
          lineHeight: 1.2,
          align: 'center',
          draggable: true,
          name: 'textNode',
          offset: {
            x: 250,
            y: 70,
          },
      });


        let secondTextToggle = false;
        function addfirstText(){
            if(complexToggle === true){
              secondText.remove();
                complexToggle = false;
            } else {
                layer.add(secondText);
                complexToggle = true;    
            }
          layer.draw();
        }
  
        function firstMessageChange(){
          firstText.setAttr('text', document.querySelector('#firstMessage').value);
          layer.draw();
        }

        function secondMessageChange(){
          console.log(secondText.fontSize());
          if(secondText.fontSize() === iUpMedium || secondText.fontSize() === iUpSmall){
            secondText.setAttr('text', document.querySelector('#secondMessage').value.toUpperCase());
          } else {
            secondText.setAttr('text', document.querySelector('#secondMessage').value);
          }
          layer.draw();
        }
  
         // function from https://stackoverflow.com/a/15832662/512042
        function downloadURI(uri, name) {
          var link = document.createElement('a');
          link.download = name;
          link.href = uri;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          delete link;
        }
  
        document.getElementById('save').addEventListener(
          'click', function () {
            var dataURL = stage.toDataURL({ pixelRatio: 1 });
            downloadURI(dataURL, 'caglar-personalized-wallet.png');
          },false);

        function sizeSelect(option) {
            let removeSelected = document.querySelectorAll('.first-size > .selected');
            removeSelected.forEach(e =>{
                e.classList.remove('selected');
            })
            option.classList.add('selected');

            firstText.setAttr('fontSize', window[option.htmlFor]);

            layer.draw();
        }



      function rotateSelect() {
          firstText.rotate(90);
        layer.draw();
      }


      document.getElementById('file_input').addEventListener(
          'change', function(e) {
            stage.find('.theImg').destroy();
            updateX = 1;
            updateY = 1;
            var URL = window.webkitURL || window.URL;
            var url = URL.createObjectURL(e.target.files[0]);
            var img = new Image();
            img.src = url;
        
        
            img.onload = function() {
        
              var img_width = img.width;
              var img_height = img.height;
        
              // calculate dimensions to get max 300px
              var max = 300;
              var ratio = (img_width > img_height ? (img_width / max) : (img_height / max))
        
              // now load the Konva image
              var theImg = new Konva.Image({
                image: img,
                scale: .3,
                x: 40,
                y: 30,
                opacity: 0.9,
                width: img_width/ratio,
                height: img_height/ratio,
                draggable: true,
                name: 'theImg',
              });
        
              theImg.cache();
              theImg.filters([Konva.Filters.Mask,Konva.Filters.Sepia,Konva.Filters.Contrast,Konva.Filters.Brighten]);
              theImg.contrast(-0.8);
              theImg.brightness(-0.5);
              layer.add(theImg);
              layer.draw();
            }
          }
        );


      let updateX = 1;
      function imgSizeSelect(number) {
        updateX+=number;
        if(updateX < 0){
          updateX = .01;
        }        
        let scaleImage = stage.find('.theImg');
        scaleImage.scale({
          x: updateX,
          y: updateX,
        });

        layer.draw();
    }

    function imgDeleteSelect() {
      stage.find('.theImg').destroy();
      layer.draw();
    }

    document.getElementById('toggle-file-ui').addEventListener(
      'click', function () {
        document.getElementById('toggle-file-ui').classList.add('no-button-bottom');
        document.getElementById('toggle-second-text-ui').classList.remove('no-button-bottom');
        document.getElementById('toggle-third-text-ui').classList.remove('no-button-bottom');
        document.getElementById('toggle-first-text-ui').classList.remove('no-button-bottom');

        let fileUi = document.querySelector('#file-ui');
        let firstTextUi = document.querySelector('#first-text-ui');
        let secondTextUi = document.querySelector('#second-text-ui');
          fileUi.style.display = 'block';
          secondTextUi.style.display = 'none';
          firstTextUi.style.display = 'none';
      },false);

    document.getElementById('toggle-first-text-ui').addEventListener(
      'click', function () {
        document.getElementById('toggle-first-text-ui').classList.add('no-button-bottom');
        document.getElementById('toggle-second-text-ui').classList.remove('no-button-bottom');
        document.getElementById('toggle-third-text-ui').classList.remove('no-button-bottom');
        document.getElementById('toggle-file-ui').classList.remove('no-button-bottom');

        let fileUi = document.querySelector('#file-ui');
        let firstTextUi = document.querySelector('#first-text-ui');
        let secondTextUi = document.querySelector('#second-text-ui');
          firstTextUi.style.display = 'block';
          secondTextUi.style.display = 'none';
          fileUi.style.display = 'none';
      },false);

    document.getElementById('toggle-second-text-ui').addEventListener(
      'click', function () {
        document.getElementById('toggle-first-text-ui').classList.remove('no-button-bottom');
        document.getElementById('toggle-second-text-ui').classList.add('no-button-bottom');
        document.getElementById('toggle-third-text-ui').classList.remove('no-button-bottom');
        document.getElementById('toggle-file-ui').classList.remove('no-button-bottom');

        let fileUi = document.querySelector('#file-ui');
        let firstTextUi = document.querySelector('#first-text-ui');
        let secondTextUi = document.querySelector('#second-text-ui');
          firstTextUi.style.display = 'none';
          secondTextUi.style.display = 'block';
          fileUi.style.display = 'none';
     },false);

     function secondTextAdd() {
      secondText.show();
      layer.add(secondText);
      layer.draw();
     }

     function secondTextHide() {
      secondText.hide();
      layer.draw();
     }

    document.getElementById('custom-first-size').addEventListener(
      'change', function(){
        let customValue = this.value * pxl;
        firstText.setAttr('fontSize', customValue);
        layer.draw();
      },false);

     function firstSizeSelect(option) {
          let removeSelected = document.querySelectorAll('.first-size > .selected');
          removeSelected.forEach(e =>{
              e.classList.remove('selected');
          })
          option.classList.add('selected');
          firstText.setAttr('fontSize', window[option.childNodes[1].value]);
          layer.draw();
      }

     function secondSizeSelect(option) {
          let removeSelected = document.querySelectorAll('.second-size > .selected');
          let secondTextValue = document.querySelector('#secondMessage').value;
          if(secondTextValue === ''){
            secondTextValue = 'Write a personal message.'
          }
          removeSelected.forEach(e =>{
              e.classList.remove('selected');
          })
          option.classList.add('selected');
          // savedSecondText = window[option.childNodes[1].value]
          secondText.setAttr('fontSize', window[option.childNodes[1].value]);
          if(option.childNodes[1].value === "iUpMedium" || option.childNodes[1].value === "iUpSmall"){
            secondText.setAttr('text', secondText.text().toUpperCase());
          } else {
            secondText.setAttr('text', secondTextValue);
          }
          layer.draw();
      }


      function firstFontSelect(option) {
          let removeSelected = document.querySelectorAll('.first-font > .selected');
          removeSelected.forEach(e =>{
              e.classList.remove('selected');
          })
          option.classList.add('selected');
          firstText.setAttr('fontFamily', option.childNodes[1].value);

        layer.draw();
      }

      function secondFontSelect(option) {
          let removeSelected = document.querySelectorAll('.second-font > .selected');
          removeSelected.forEach(e =>{
              e.classList.remove('selected');
          })
          option.classList.add('selected');
          secondText.setAttr('fontFamily', option.childNodes[1].value);

        layer.draw();
      }

      function rotateSelect() {
        firstText.rotate(90);
      layer.draw();
    }


$('#font1')
.fontpicker()
.on('change', function() {
  //  applyFont('#sample1', this.value);
  let values = this.value.split(':');
  values[1] = values[1].replace(/i/,' italic');
  firstText.setAttr('fontFamily', values[0]);
  firstText.setAttr('fontStyle', values[1]);
  layer.draw();
});

$('#font2')
.fontpicker()
.on('change', function() {
  let values = this.value.split(':');
  values[1] = values[1].replace(/i/,' italic');
  secondText.setAttr('fontFamily', values[0]);
  secondText.setAttr('fontStyle', values[1]);
  layer.draw();
});