
var myScroll,
	imprintScroll,
	iOS = false,
    p = navigator.platform,
    nua = navigator.userAgent,
	is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 &&     nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1)),
	isMobile = window.matchMedia('only screen and (max-width: 760px)');
function slidesSize() {
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	TweenMax.set('.slide:not(.landing)', {height:h,onComplete:function(){
		TweenMax.set('.slide.last', {height:'auto'});
	}});
}
function loaded () {
	myScroll = new IScroll('#scroller', { 
		mouseWheel: true, 
		click: true
	});
}
function initImprintScroll() {
	var imprintScroll = new IScroll('.imprint-content', {
	    mouseWheel: true,
	    scrollbars: true
	});
	this.killIt = function() {
		imprintScroll.destroy();
	};
}
function arrowDownNavigation() {
	var my = {
		slideH : ( $('#first').height() + 30 ) * -1,
		landingH : ( $('.landing').height() + 30 ) * -1,
		topOffset : $('#scroller > div').offset().top
	};
	var slide = {
		first : my.topOffset <= my.landingH && my.topOffset > (my.slideH + my.landingH),
		second :  my.topOffset <= (my.slideH + my.landingH) && my.topOffset > ((my.slideH*2) + my.landingH),
		third : my.topOffset <= ((my.slideH*2) + my.landingH) && my.topOffset > ((my.slideH*3) + my.landingH),
		fourth : my.topOffset <= ((my.slideH*3) + my.landingH) && my.topOffset > ((my.slideH*4) + my.landingH)
	};
	// console.log(my.slideH, my.landingH, my.topOffset);
	if ( my.topOffset > my.landingH ) {
		myScroll.scrollToElement(document.querySelector('#scroller #first'), 800, null, true);
	} else if ( slide.first ) {
		myScroll.scrollToElement(document.querySelector('#scroller .slide:nth-child(3)'), 800, null, true);
	} else if ( slide.second ) {
		myScroll.scrollToElement(document.querySelector('#scroller .slide:nth-child(4)'), 800, null, true);
	} else if ( slide.third ) {
		myScroll.scrollToElement(document.querySelector('#scroller .slide:nth-child(5)'), 800, null, true);
	} else if ( slide.fourth ) {
		myScroll.scrollToElement(document.querySelector('#scroller .slide.last'), 800, null, null);
		TweenMax.to('.arrow-down', 0.25, {opacity:1});
	}
}
function animateScreens() {
	var my = {
		slideH : ( $('#first').height() + 30 ) * -1,
		landingH : ( $('.landing').height() + 30 ) * -1,
		topOffset : $('#scroller > div').offset().top
	};
	var slide = {
		first : my.topOffset <= my.landingH && my.topOffset > (my.slideH + my.landingH),
		second :  my.topOffset <= (my.slideH + my.landingH) && my.topOffset > ((my.slideH*2) + my.landingH),
		third : my.topOffset <= ((my.slideH*2) + my.landingH) && my.topOffset > ((my.slideH*3) + my.landingH),
		fourth : my.topOffset <= ((my.slideH*3) + my.landingH) && my.topOffset > ((my.slideH*4) + my.landingH)
	};

	if ( slide.first ) {
		TweenMax.to('#first .screen', 0.5, {opacity:1,ease:Power2.easeInOut});
	} else if ( slide.second ) {
		TweenMax.to('.slide:nth-child(3) .screen', 0.5, {opacity:1,ease:Power2.easeInOut});
	} else if ( slide.third ) {
		TweenMax.to('.slide:nth-child(4) .screen', 0.5, {opacity:1,ease:Power2.easeInOut});
	} else if ( slide.fourth ) {
		TweenMax.to('.slide:nth-child(5) .screen', 0.5, {opacity:1,ease:Power2.easeInOut});
	} else if ( my.topOffset < (my.slideH*4) + my.landingH ) {
		TweenMax.to('.arrow-down', 0.25, {opacity:0});
	}
}
function verticalCenter() {
	$('.slide').each(function(){
		var el = $(this).find('.no-pad'),
			mt = '-' + (el.height() / 2) + 'px';
		TweenMax.set(el, {marginTop:mt});
	});
}

$( document ).ready(function(){
	// Requiered by iScroll 
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	// Add .mobile class to body if so
    if (isMobile.matches) {
        //Conditional script here
        console.log('It\'s Mobile !');
        $('body').addClass('mobile');
        setTimeout(function () {
		  // myScroll.scrollBy(0, -1);
		}, 800);
    } else {
        console.log('It\'s Not Mobile!');
    }

	// Detect if iOS and asign class
	if( p === 'iPad' || p === 'iPhone' || p === 'iPod' ){
		iOS = true;
	}
	if ( iOS === true ) {
		$('.share').addClass('icon-share');
	} else {
		console.log('not iOS');
	}

	$('.landing h4, .landing h1, .slide#first .watch').addClass('from-bottom');
	$('.landing p, .cta').addClass('fadeIn');
});


$( window ).load(function() {

	// Set correct sizes & init myScroll
	slidesSize();
	loaded();

	if ( isMobile.matches ) { } else { verticalCenter(); }
	if(is_android) { $('body').addClass('android'); } 

    //  Landing part animation : 
    TweenMax.set('.from-bottom', {y:50});
    TweenMax.staggerTo('.from-bottom', 0.5, {opacity:1,y:0,ease:Power3.easeOut,delay:0.5}, 0.1);
    TweenMax.staggerTo('.fadeIn', 0.8, {opacity:1,ease:Power3.easeOut,delay:1.2}, 0.1);

    // Hide arrow down when page is scrolling + trigger screen animation 
    myScroll.on('scrollStart', function(){ TweenMax.to('.arrow-down', 0.25, {opacity:0}); });
    myScroll.on('scrollEnd', function(){ TweenMax.to('.arrow-down', 0.25, {opacity:1}); animateScreens(); });

    // arrow-link trigger first scroll : 
    $('body').on('click', '.cta a', function(){
    	myScroll.scrollToElement(document.querySelector('#scroller #first'), 1000);
    	setTimeout(function(){TweenMax.to('.arrow-down', 0.25, {opacity:1});}, 500);
    });

    // arrow down behaviour :
    $('body').on('click', '.arrow-down', arrowDownNavigation);
	
    // Imprint link
	$('body').on('click', '.imprint-link', function(){
		TweenMax.set('#imprint', {display:'block',onComplete:function(){
			initImprintScroll();
			TweenMax.to('#imprint', 0.5, {opacity:1,ease:Power3.easeOut});
		}});
	});
	$('body').on('click', '.close-imprint', function(){
		TweenMax.to('#imprint', 0.5, {opacity:0,ease:Power3.easeOut,onComplete:function(){
			initImprintScroll().killIt();
			TweenMax.set('#imprint',  {display:'none'});
		}});
	});

});

