/**********************************
* GPDesigning.com product builder 
**********************************/
$(document).ready(function(){
	$('#mainImage').hide();
	var imgSrcPath = "http://cdn2.officedesigns.com/common/images/products/builder";
	var ie;
	var prodElements = new Array();
	var useElements = new Array();
	
	if (navigator.userAgent.match(/msie/i)) {
		ie = parseInt(window.navigator.appVersion.charAt(0)) + 4;
	} else {
		ie = "false";
	}
	
	function getImageSrc(element){
		var imgPathArray = element.src.split("/");
		var imgName = imgPathArray[imgPathArray.length-1];
		if (imgName.split(".")[1] == "jpg" || imgName.split(".")[1] == "gif"){
			imgName = imgName.split(".")[0]+".png";
		}
		if (ie < 9) {
			var optionType = element.parentNode.parentNode.parentNode.parentNode.firstChild.innerText.replace(/[\ \/:\n]/g, "");
		} else {
			var optionType = element.parentNode.parentNode.parentNode.parentNode.firstElementChild.textContent.replace(/[\ \/:\n]/g, "");
		}
		var imgPath = imgSrcPath+"/"+partNumber+"/"+optionType+"/"+imgName;
		return imgPath;
	}
	
	function getBigImageSrc(element){
		var imgPathArray = element.src.split("/");
		var imgName = imgPathArray[imgPathArray.length-1];
		if (imgName.split(".")[1] == "jpg" || imgName.split(".")[1] == "gif"){
			imgName = imgName.split(".")[0]+".png";
		}
		if (ie < 9) {
			var optionType = element.parentNode.parentNode.parentNode.parentNode.firstChild.innerText.replace(/[\ \/:\n]/g, "");
		} else {
			var optionType = element.parentNode.parentNode.parentNode.parentNode.firstElementChild.textContent.replace(/[\ \/:\n]/g, "");
		}
		var imgPath = imgSrcPath+"/"+partNumber+"/"+optionType+"/big/"+imgName;
		return imgPath;
	}
	
	function setBigImageSrc(optionType, imgName){
		if (imgName.split(".")[1] == "jpg" || imgName.split(".")[1] == "gif"){
			imgName = imgName.split(".")[0]+".png";
		}
		var imgPath = imgSrcPath+"/"+partNumber+"/"+optionType+"/big/"+imgName;
		builderArray[optionType] = imgPath;
	}
	
	$.each($('.product_config_option'), function (index, value){
		var optionName;
		if (ie < 9) {
			optionName = value.firstChild.firstChild.innerText.replace(/[\ \/:\n]/g, "");
		}else{
			optionName = value.firstElementChild.firstChild.textContent.replace(/[\ \/:\n]/g, "");
		}
		prodElements.push(optionName);					   
	});
	
	$.each(elements, function(index,value){
		if(prodElements.indexOf(value)>-1){
			useElements.push(value);
		}
	});
	
	$.each(useElements, function(index, value) {
		$("<img/>").attr({"id":value,"src":"http://cdn2.officedesigns.com/static/images/spacer.png","class":"mainImage"}).appendTo("#imageBuilder");
		builderArray[value] = 'http://cdn2.officedesigns.com/static/images/spacer.png';
	});
	
	var option = $(".product_config_option_menu");
	$.each(option, function(index, value) {
		try {
			if($("."+$(this).id).length == 0){
				var firstElement, optionType;
				if (ie < 9) {
					firstElement = this.firstChild.type;
				}else{
					firstElement = this.firstElementChild.type;
				}

				if(firstElement == "select-one") {
					if (ie < 9) {
						optionType = this.parentNode.firstChild.innerText.replace(/[\ \/:\n]/g, "");
						var imgPath = imgSrcPath+"/"+partNumber+"/"+optionType+"/0.png";
						$('#'+optionType).attr({"src":imgPath});
					}else{
						optionType = this.parentNode.firstElementChild.textContent.replace(/[\ \/:\n]/g, "");
						var imgPath = imgSrcPath+"/"+partNumber+"/"+optionType+"/0.png";
						$('#'+optionType).attr({"src":imgPath});
					}
					var imgName = "0.png";
					setBigImageSrc(optionType, imgName);
				}else{
					var element = $(this).find("img");
					if (ie < 9) {
						optionType = this.parentNode.firstChild.innerText.replace(/[\ \/:\n]/g, "");
						$('#'+optionType).attr({"src":getImageSrc((element)[0])});
					} else {
						optionType = this.parentNode.firstElementChild.textContent.replace(/[\ \/:\n]/g, "");
						$('#'+optionType).attr({"src":getImageSrc((element)[0])});
					}
					var imgPathArray = (element)[0].src.split("/");
					var imgName = imgPathArray[imgPathArray.length-1];
					setBigImageSrc(optionType, imgName);
				}
			}
		} catch(err) {
			console.log(err);
  		}
	});
	
	$(".product_config_option_menu img").click(function() {  
		try {
			var optionType;
			if (ie < 9) {
				optionType = this.parentNode.parentNode.parentNode.parentNode.firstChild.innerText.replace(/[\ \/:\n]/g, "");
			} else {
				optionType = this.parentNode.parentNode.parentNode.parentNode.firstElementChild.textContent.replace(/[\ \/:\n]/g, "");
			}
			var imageSrc = getImageSrc(this);
			$("#"+optionType)[0].src = imageSrc;
			var imgPathArray = imageSrc.split("/");
			var imgName = imgPathArray[imgPathArray.length-1];
			setBigImageSrc(optionType, imgName);
		} catch(err) {
			console.log(err);
  		}
	});
	
	$(".product_config_option_menu select").change(function () {
		$("select option:selected").each(function () {
			try {
				var optionValue;
				var optionType;
				if (this.value == "none") {
					optionValue = "0"
				} else {
					optionValue = this.value;
				}
				if (ie < 9) {
					optionType = this.parentNode.parentNode.parentNode.firstChild.innerText.replace(/[\ \/:\n]/g, "");
					var imagePath = imgSrcPath+"/"+partNumber+"/"+optionType+"/"+optionValue+".png";
					$("#"+this.parentNode.parentNode.parentNode.firstChild.innerText.replace(/[\ \/:\n]/g, ""))[0].src = imagePath;
				} else {
					optionType = this.parentNode.parentNode.parentNode.firstElementChild.textContent.replace(/[\ \/:\n]/g, "");
					var imagePath = imgSrcPath+"/"+partNumber+"/"+optionType+"/"+optionValue+".png";
					$("#"+this.parentNode.parentNode.parentNode.firstElementChild.textContent.replace(/[\ \/:\n]/g, ""))[0].src = imagePath;
				}
				var imgName = optionValue+".png";
				setBigImageSrc(optionType, imgName);
			} catch(err) {
				console.log(err);
  			}
		});
  	});
});

/**************************************
* GPDesigning.com product builder zoom
**************************************/
(function ($) {

    $(document).ready(function () {
        $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
    });

    function format(str) {
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace('%' + (i - 1), arguments[i]);
        }
        return str;
    }

    function CloudZoom(jWin, opts) {
        var sImg = $('img', jWin);
		var	img1;
		var	img2;
        var zoomDiv = null;
		var	$mouseTrap = null;
		var	lens = null;
		var	$tint = null;
		var	softFocus = null;
		var	zoomImage;
		var zoomFade = 300;
		var zoomBoxWidth = 400;
		var zoomBoxHeight = 618;
		var zoomBoxLeftPosition = 300;
		var zoomBoxTopPosition = -10;
        var controlTimer = 0;      
        var cw, ch;
        var destU = 0;
		var	destV = 0;
        var currV = 0;
        var currU = 0;      
        var filesLoaded = 0;
        var mx,
            my; 
        var ctx = this, zw;

        setTimeout(function () {

            if ($mouseTrap === null) {
                var w = jWin.width();
                jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>', w / 3, (w / 2) - (w / 6))).find(':last').css('opacity', 0.5);
            }
        }, 200);

        this.removeBits = function () {
            //$mouseTrap.unbind();
            if (lens) {
                lens.remove();
                lens = null;             
            }
            if ($tint) {
                $tint.remove();
                $tint = null;
            }
            if (softFocus) {
                softFocus.remove();
                softFocus = null;
            }

            $('.cloud-zoom-loading', jWin.parent()).remove();
        };

        this.destroy = function () {
            jWin.data('zoom', null);

            if ($mouseTrap) {
                $mouseTrap.unbind();
                $mouseTrap.remove();
                $mouseTrap = null;
            }
            if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null;
            }
        };

        this.fadedOut = function () {     
			if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null;
            }
        };

        this.controlLoop = function () {
            if (lens) {
                var x = (mx - sImg.offset().left - (cw * 0.5)) >> 0;
                var y = (my - sImg.offset().top - (ch * 0.5)) >> 0;
               
                if (x < 0) {
                    x = 0;
                }
                else if (x > (sImg.outerWidth() - cw)) {
                    x = (sImg.outerWidth() - cw);
                }
                if (y < 0) {
                    y = 0;
                }
                else if (y > (sImg.outerHeight() - ch)) {
                    y = (sImg.outerHeight() - ch);
                }

                lens.css({
                    left: x,
                    top: y
                });
                lens.css('background-position', (-x) + 'px ' + (-y) + 'px');

                destU = (((x) / sImg.outerWidth()) * zoomImage.width) >> 0;
                destV = (((y) / sImg.outerHeight()) * zoomImage.height) >> 0;
                currU += (destU - currU) / opts.smoothMove;
                currV += (destV - currV) / opts.smoothMove;

                zoomDiv.css('background-position', (-(currU >> 0) + 'px ') + (-(currV >> 0) + 'px'));              
            }
            controlTimer = setTimeout(function () {
                ctx.controlLoop();
            }, 30);
        };

        this.init2 = function (img, id) {

            filesLoaded++;
	
            if (id === 1) {
                zoomImage = img;
            }

            if (filesLoaded === 2) {
                this.init();
            }
        };

        this.init = function () {
            $('.cloud-zoom-loading', jWin.parent()).remove();

            $mouseTrap = jWin.parent().append(format("<div class='mousetrap' style='z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;\'></div>", 220, 340, 40, 10)).find(':last');

            //////////////////////////////////////////////////////////////////////			
            /* Do as little as possible in mousemove event to prevent slowdown. */
            $mouseTrap.bind('mousemove', this, function (event) {
                // Just update the mouse position
                mx = event.pageX;
                my = event.pageY;
            });
            //////////////////////////////////////////////////////////////////////					
            $mouseTrap.bind('mouseleave', this, function (event) {
                clearTimeout(controlTimer);
                //event.data.removeBits();                
				if(lens) { lens.fadeOut(zoomFade - 1); }
				if($tint) { $tint.fadeOut(zoomFade - 1); }
				if(softFocus) { softFocus.fadeOut(zoomFade - 1); }
				zoomDiv.fadeOut(zoomFade, function () {
                    ctx.fadedOut();
                });																
                return false;
            });
            //////////////////////////////////////////////////////////////////////			
            $mouseTrap.bind('mouseenter', this, function (event) {
				mx = event.pageX;
                my = event.pageY;
                zw = event.data;
                if (zoomDiv) {
                    zoomDiv.stop(true, false);
                    zoomDiv.remove();
                }

                var xPos = opts.adjustX,
                    yPos = opts.adjustY;
                             
                var siw = sImg.outerWidth();
                var sih = sImg.outerHeight();

                var w = opts.zoomWidth;
                var h = opts.zoomHeight;
                if (opts.zoomWidth == 'auto') {
                    w = siw;
                }
                if (opts.zoomHeight == 'auto') {
                    h = sih;
                }

                var appendTo = jWin.parent(); // attach to the wrapper			
                switch (opts.position) {
                case 'top':
                    yPos -= h; // + opts.adjustY;
                    break;
                case 'right':
                    xPos += siw; // + opts.adjustX;					
                    break;
                case 'bottom':
                    yPos += sih; // + opts.adjustY;
                    break;
                case 'left':
                    xPos -= w; // + opts.adjustX;					
                    break;
                case 'inside':
                    w = siw;
                    h = sih;
                    break;
                    // All other values, try and find an id in the dom to attach to.
                default:
                    appendTo = $('#' + opts.position);
                    // If dom element doesn't exit, just use 'right' position as default.
                    if (!appendTo.length) {
                        appendTo = jWin;
                        xPos += siw; //+ opts.adjustX;
                        yPos += sih; // + opts.adjustY;	
                    } else {
                        w = appendTo.innerWidth();
                        h = appendTo.innerHeight();
                    }
                }
				
				var zoomDivs = '<div id="cloud-zoom-big_whitepx" class="cloud-zoom-big" style="display:block;position:absolute;left:'+zoomBoxLeftPosition+'px;top:'+zoomBoxTopPosition+'px;width:'+zoomBoxWidth+'px;height:'+zoomBoxHeight+'px;background-image:url(\'http://cdn2.officedesigns.com/common/images/products/builder/default_zoom.png\');z-index:99;"></div>';
				
				elements.forEach(function(value, index) {
					zoomDivs += '<div id="cloud-zoom-big'+value+'" class="cloud-zoom-big" style="display:block;position:absolute;left:'+zoomBoxLeftPosition+'px;top:'+zoomBoxTopPosition+'px;width:'+zoomBoxWidth+'px;height:'+zoomBoxHeight+'px;background-image:url(\''+builderArray[value]+'\');z-index:99;"></div>';
				})
                
				zoomDiv = appendTo.append(zoomDivs).find('.cloud-zoom-big');

                // Add the title from title tag.
                if (sImg.attr('title') && opts.showTitle) {
                    zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>', sImg.attr('title'))).find(':last').css('opacity', opts.titleOpacity);
                }

                zoomDiv.fadeIn(zoomFade);

                if (lens) {
                    lens.remove();
                    lens = null;
                } /* Work out size of cursor */
                cw = (sImg.outerWidth() / zoomImage.width) * zoomDiv.width();
                ch = (sImg.outerHeight() / zoomImage.height) * zoomDiv.height();

                // Attach mouse, initially invisible to prevent first frame glitch
                lens = jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>", cw, ch)).find(':last');

                $mouseTrap.css('cursor', lens.css('cursor'));

                var noTrans = false; // Lens opasity
                if (!noTrans) {
                    lens.css('opacity', opts.lensOpacity);										
                }
				
				var showLens = false; // Show or hide lens
				if (showLens) {
					if ( opts.position !== 'inside' ) { lens.fadeIn(zoomFade); } 
				}

                // Start processing. 
                zw.controlLoop();

                return; // Don't return false here otherwise opera will not detect change of the mouse pointer type.
            });
        };

        img1 = new Image();
        $(img1).load(function () {
            ctx.init2(this, 0);
        });
        img1.src = sImg.attr('src');

        img2 = new Image();
        $(img2).load(function () {
            ctx.init2(this, 1);
        });
        img2.src = jWin.attr('href');
    }

    $.fn.CloudZoom = function (options) {
        // IE6 background image flicker fix
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
        this.each(function () {
			var	relOpts, opts;
			// Hmm...eval...slap on wrist.
			eval('var	a = {' + $(this).attr('rel') + '}');
			relOpts = a;
            if ($(this).is('.cloud-zoom')) {
                $(this).css({
                    'position': 'relative',
                    'display': 'block'
                });
                $('img', $(this)).css({
                    'display': 'block'
                });
                // Wrap an outer div around the link so we can attach things without them becoming part of the link.
                // But not if wrap already exists.
                if ($(this).parent().attr('id') != 'wrap') {
                    $(this).wrap('<div id="wrap" style="top:0px;z-index:900;position:relative;"></div>');
                }
                opts = $.extend({}, $.fn.CloudZoom.defaults, options);
                opts = $.extend({}, opts, relOpts);
                $(this).data('zoom', new CloudZoom($(this), opts));

            } else if ($(this).is('.cloud-zoom-gallery')) {
                opts = $.extend({}, relOpts, options);
                $(this).data('relOpts', opts);
                $(this).bind('click', $(this), function (event) {
                    var data = event.data.data('relOpts');
                    // Destroy the previous zoom
                    $('#' + data.useZoom).data('zoom').destroy();
                    // Change the biglink to point to the new big image.
                    $('#' + data.useZoom).attr('href', event.data.attr('href'));
                    // Change the small image to point to the new small image.
                    $('#' + data.useZoom + ' img').attr('src', event.data.data('relOpts').smallImage);
                    // Init a new zoom with the new images.				
                    $('#' + event.data.data('relOpts').useZoom).CloudZoom();
                    return false;
                });
            }
        });
        return this;
    };

    $.fn.CloudZoom.defaults = {
        zoomWidth: '220',
        zoomHeight: '340',
        position: 'right',
        tint: false,
        tintOpacity: 0.5,
        lensOpacity: 0.5,
        softFocus: false,
        smoothMove: 3,
        showTitle: false,
        titleOpacity: 0.5,
        adjustX: 0,
        adjustY: 0
    };

})(jQuery);