var HTMLElement = (function() {
    'use strict';

    var classListMap = new WeakMap;

    function HTMLElement(ownerDocument, tagName) {
        Element.call(this, ownerDocument, tagName, true /* isHTML */)
    }

    HTMLElement.prototype = Object.create(Element.prototype, {
        id: util.reflectStringAttribute('id'),
        title: util.reflectStringAttribute('title'),
        lang: util.reflectStringAttribute('lang'),
        translate: util.reflectBooleanAttribute('translate'),
        dir: util.reflectStringAttribute('dir'),
        className: util.reflectStringAttribute('class'),
        classList: util.cachedReadOnly(classListMap, ClassList),
        tabIndex: util.reflectLongAttribute('tabindex'),
        draggable: util.reflectBooleanAttribute('draggable'),
        webkitdropzone: util.reflectStringAttribute('webkitdropzone'),
        hidden: util.reflectBooleanAttribute('hidden'),
        accessKey: util.reflectStringAttribute('accesskey')

    });

    return HTMLElement;
})();