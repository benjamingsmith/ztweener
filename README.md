# ztweener
A lightweight tween library for Zepto.js

##Basic Usage:
This library depends on Zepto.js and Zepto's Effects plugin. [Located here](http://zeptojs.com/)

###Animate To
```javascript
$(el).animateTo({
  'property':'value'
},durationTime, easing, callbackFunction, delay);
```
###Animate From
```javascript
$(el).animateFrom({
  'property':'value'
},durationTime, easing, callbackFunction, delay);
```

###Delayed Call with function inline
```javascript
$.delayedCall(delayTime, function(){
  
});
```
###Delayed Call by function name
```javascript
$.delayedCall(delayTime, functionName);
```

###Kill all delayedCalls
```javascript
$.killDelays();
```