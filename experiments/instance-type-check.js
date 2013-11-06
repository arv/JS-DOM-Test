
(function() {
  'use strict';

  if (typeof Symbol == 'undefined') {
    throw 'Please enable Experimental JavaScript';
  }

  // var inheritanceSymbol = 'inheritanceSymbol';
  var inheritanceSymbol = Symbol();
  var idCounter = 0;

  function instanceIs(obj, typeInfo, typeInfoIndex) {
    var inheritanceTable = obj[inheritanceSymbol];
    if (!inheritanceTable)
      return false;
    return inheritanceTable[typeInfoIndex] === typeInfo;
  }

  // EventTarget
  var $EventTarget_TypeInfo = idCounter++;
  var $EventTarget_TypeInfoIndex = 0;
  var $EventTarget_InheritanceTable = [$EventTarget_TypeInfo];

  function $EventTarget() {
    this[inheritanceSymbol] = $EventTarget_InheritanceTable;
  }
  var $EventTarget_prototype = $EventTarget.prototype = {
    addEventListener: function(type, func, capture) {
      if (!instanceIs(this, $EventTarget_TypeInfo, $EventTarget_TypeInfoIndex))
        throw new TypeError();
    }
  };

  // Node
  var $Node_TypeInfo = idCounter++;
  var $Node_TypeInfoIndex = 1;
  var $Node_InheritanceTable = [$EventTarget_TypeInfo, $Node_TypeInfo];

  function $Node() {
    this[inheritanceSymbol] = $Node_InheritanceTable;
  }

  var $Node_prototype = $Node.prototype = {
    __proto__: $EventTarget_prototype,
    get firstChild() {
      if (!instanceIs(this, $Node_TypeInfo, $Node_TypeInfoIndex))
        throw new TypeError();
    }
  }

  // Element
  var $Element_TypeInfo = idCounter++;
  var $Element_TypeInfoIndex = 2;
  var $Element_InheritanceTable = [$EventTarget_TypeInfo, $Node_TypeInfo, $Element_TypeInfo];

  function $Element() {
    this[inheritanceSymbol] = $Element_InheritanceTable;
  }

  var $Element_prototype = $Element.prototype = {
    __proto__: $Node_prototype,
    getAttribute: function(name) {
      if (!instanceIs(this, $Element_TypeInfo, $Element_TypeInfoIndex))
        throw new TypeError();
    }
  };

  // HTMLElement
  var $HTMLElement_TypeInfo = idCounter++;
  var $HTMLElement_TypeInfoIndex = 3;
  var $HTMLElement_InheritanceTable = [$EventTarget_TypeInfo, $Node_TypeInfo, $Element_TypeInfo, $HTMLElement_TypeInfo];

  function $HTMLElement() {
    this[inheritanceSymbol] = $HTMLElement_InheritanceTable;
  }

  var $HTMLElement_prototype = $HTMLElement.prototype = {
    __proto__: $Element_prototype
  };

  // HTMLDivElement
  var $HTMLDivElement_TypeInfo = idCounter++;
  var $HTMLDivElement_TypeInfoIndex = 4;
  var $HTMLDivElement_InheritanceTable = [$EventTarget_TypeInfo, $Node_TypeInfo, $Element_TypeInfo, $HTMLElement_TypeInfo, $HTMLDivElement_TypeInfo];

  function $HTMLDivElement() {
    this[inheritanceSymbol] = $HTMLDivElement_InheritanceTable;
  }

  var $HTMLDivElement_prototype = $HTMLDivElement.prototype = {
    __proto__: $Element_prototype
  };

  // XMLHttpRequest
  var $XMLHttpRequest_TypeInfo = idCounter++;
  var $XMLHttpRequest_TypeInfoIndex = 1;
  var $XMLHttpRequest_InheritanceTable = [$EventTarget_TypeInfo, $XMLHttpRequest_TypeInfo];

  function $XMLHttpRequest() {
    this[inheritanceSymbol] = $XMLHttpRequest_InheritanceTable;
  }

  var $XMLHttpRequest_prototype = $XMLHttpRequest.prototype = {
    __proto__: $EventTarget_prototype
  };

  window.EventTarget = $EventTarget;
  window.Node = $Node;
  window.Element = $Element;
  window.HTMLElement = $HTMLElement;
  window.HTMLDivElement = $HTMLDivElement;
  window.XMLHttpRequest = $XMLHttpRequest;

  document.createElement = function() {
    return new HTMLDivElement();
  };

})();