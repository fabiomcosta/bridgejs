/*
 * BridgeJS MooTools Adapter
 */

Object.extend(Bridge, (function(global) {
  var _slice     = global.Array.prototype.slice;
  var byId       = global.document.id, bySelector = global.$$;
  
  function emptyFunction(){};
  
  function $(element) {
    if (element.constructor && element.constructor == NodeWrapper) {
      return element;
    }
    var NW = new NodeWrapper(element);
    return NW.source && NW;
  }

  function $$(selector) {
    return new NodeListWrapper(selector);
  }
  
  var _Object = window.Object,
  Object = Object.extend((function() {
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    return {
      isArray:     Type.isArray,
      isFunction:  Type.isFunction,
      isNumber:    Type.isNumber,
      isString:    Type.isString,
      isUndefined: isUndefined,
      isElement:   Type.isElement,
      keys:        Object.keys
    };
  })(), Bridge.Shared.Object);
  
  var Function = Object.extend({
    argumentNames: function(fn) {
      var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
        .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
        .replace(/\s+/g, '').split(',');
      return names.length == 1 && !names[0] ? [] : names;
    }
  }, Bridge.Shared.Function);
  
  var Viewport = {
    getWidth: function() {
      return byId(window).getSize().x;
    },
    getHeight: function() {
      return byId(window).getSize().y;
    },
    getDimensions: function() {
      var dimensions = byId(window).getSize();
      return {
        width: dimensions.x,
        height: dimensions.y
      };
    },
    getScrollOffsets: function() {
      var scrolls = byId(window).getScroll();
      return {
        left: scrolls.x,
        top: scrolls.y
      };
    }
  };
  
  Array = Object.extend((function() {
    function detect(array, iterator, context) {
      this.each(array, function(value, index) {
        if (iterator.call(context, value, index)) {
          return value;
        }
      });
    };

    function without(array) {
      var values = _slice.call(arguments, 1);
      for (var i = values.length; i--;) array.erase(values[i]);
      return array;
    }

    return {
      find:     detect,
      detect:   detect,
      without:  without,
      findAll:  Array.filter,
      select:   Array.filter,
      include:  Array.contains,
      member:   Array.contains
    };
  })(), Bridge.Shared.Array);
  
  var Ajax = {};
  Ajax.Request = function(url, options) {
    this.options = Object.extend({
      onException: emptyFunction,
      parameters:  ''
    }, options || {});
    this.options.url = url;
    this.options.onFailure = this.options.onException;
    this.options.data = this.options.parameters;
    delete this.options.onException;

    new Request(this.options).send();
  };

  // domloaded
  function domloaded(fn) {
    $(document).addEvent('domready', fn);
  };

  return {
    Ajax:      Ajax,
    Array:     Array,
    each:      Array.each,
    _each:     Array.forEach,
    Element:   global.Element,
    //Event:     Event,
    Function:  Function,
    Object:    Object,
    domloaded: domloaded,
    $:         $,
    $$:        $$,
    emptyFunction: emptyFunction,
    K:         Function.from,
    String:    Bridge.Shared.String,
    Viewport:  Viewport
  };

})(this));