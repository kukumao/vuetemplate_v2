(function(window){var svgSprite='<svg><symbol id="icon-x" viewBox="0 0 1024 1024"><path d="M606.690449 507.819214 957.438039 157.071624C976.173541 138.336123 976.150913 107.992757 957.392785 89.234628 938.634656 70.476499 908.29129 70.453872 889.555788 89.189373L538.808198 439.936963 165.455817 66.584582C146.697688 47.826453 116.331695 47.826453 97.528311 66.629837 78.838065 85.320083 78.815437 115.708704 97.573566 134.466833L470.925947 507.819214 97.573567 881.171595C78.838065 899.907096 78.815438 930.295717 97.573567 949.053846 116.331695 967.811974 146.720316 967.789347 165.455818 949.053846L538.808198 575.701465 889.533162 926.426429C908.268663 945.16193 938.679911 945.16193 957.370158 926.471684 976.173541 907.6683 976.150914 877.279679 957.415413 858.544178L606.690449 507.819214Z"  ></path></symbol><symbol id="icon-arrow" viewBox="0 0 1152 1024"><path d="M624.576 0 544.128 80.512 976.192 512.032 544.128 943.488 624.576 1024 1136.096 512.032Z"  ></path></symbol><symbol id="icon-jiantouxia" viewBox="0 0 1024 1024"><path d="M517.689 796.444c-45.511 0-85.333-17.066-119.467-51.2L73.956 381.156C51.2 358.4 56.889 324.266 79.644 301.51c22.756-22.755 56.89-17.067 79.645 5.689l329.955 364.089c5.69 5.689 17.067 11.378 28.445 11.378s22.755-5.69 34.133-17.067l312.89-364.089c22.755-22.755 56.888-28.444 79.644-5.689 22.755 22.756 28.444 56.89 5.688 79.645L637.156 739.556c-28.445 39.822-68.267 56.888-119.467 56.888 5.689 0 0 0 0 0z" fill="#333333" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)