var ClassList = (function() {
    'use strict';

    var ownerName = Math.random();
    function ClassList(owner) {
        this[ownerName] = owner;
    }
    return ClassList;
})();