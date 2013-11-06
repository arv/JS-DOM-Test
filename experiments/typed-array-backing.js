(function() {
  'use strict';

  var MEMORY = new Uint32Array(1024);
  var BUFFER = MEMORY.buffer;
  var handles = [0];

  var ptr = 1;  // Keep 0 for null

  function allocate(size) {
    // Uint32Array.BYTES_PER_ELEMENT
    var obj = new Uint32Array(BUFFER, ptr * 4, size);
    var index = handles.length;
    MEMORY[ptr] = index;
    handles[index] = obj;
    ptr += size;
    return obj;
  }

  function Node_wrap(address) {
    var obj = new Uint32Array(BUFFER, address * 4, NODE_SIZE);
    obj.__proto__ = $Node_prototype;
    return obj;
  }

  var HANDLE_OFFSET = 0
  var PARENT_NODE_OFFSET = 1;
  var FIRST_CHILD_OFFSET = 2;
  var LAST_CHILD_OFFSET = 3;
  var NEXT_SIBLING_OFFSET = 4;
  var PREVIOUS_SIBLING_OFFSET = 5;
  var NODE_SIZE = 6;

  function Node_set_firstChild(parentAddress, childAddress) {
    MEMORY[parentAddress + FIRST_CHILD_OFFSET] = childAddress;
  }

  function $Node() {
    var self = allocate(NODE_SIZE);
    self.__proto__ = $Node_prototype;
    return self;
  }

  var $Node_prototype = $Node.prototype = {
    get firstChild() {
      // Type check. See instance-type-check.js
      var address = this[2];  // FIRST_CHILD_OFFSET
      if (!address)
        return null;
      var handleIndex = MEMORY[address];
      if (handleIndex !== 0)
        return handles[handleIndex];
      var object = Node_wrap(address);
      var handleIndex = handles.length;
      handles[handleIndex] = object;
      MEMORY[address] = handleIndex;
      return object;
    }
  };

  window.Node = $Node;

  window.Node_set_firstChild = Node_set_firstChild;


})();