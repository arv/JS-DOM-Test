var Element = (function() {
    'use strict';

    function nextElement(node) {
        for (; node && node.nodeType !== Node.ELEMENT_NODE; node = node._nextSibling) {}
        return node;
    }

    function previousElement(node) {
        for (; node && node.nodeType !== Node.ELEMENT_NODE; node = node._previousSibling) {}
        return node;
    }

    function normalizeAttributeName(element, name) {
        return element._isHTML ? name.toLowerCase() : name;
    }

    function Element(ownerDocument, tagName, isHTML) {
        Node.call(this, ownerDocument);
        this._attributeMap = new Map;
        this._tagName = tagName;
        this._isHTML = isHTML;
    }

    Element.prototype = Object.create(Node.prototype, {
        setAttribute: util.method(function(name, value) {
            var normalizedName = normalizeAttributeName(this, name);
            // var map = GET(this, ATTRIBUTE_MAP);
            var map = this._attributeMap;
            map.set(normalizedName, String(value));
        }),
        getAttribute: util.method(function(name) {
            var normalizedName = normalizeAttributeName(this, name);
            // var map = GET(this, ATTRIBUTE_MAP);
            var map = this._attributeMap;
            return map.has(normalizedName) ? map.get(normalizedName) : null;
        }),
        hasAttribute: util.method(function(name) {
            var normalizedName = normalizeAttributeName(this, name);
            // var map = GET(this, ATTRIBUTE_MAP);
            var map = this._attributeMap;
            return map.has(normalizedName);
        }),

        tagName: util.readOnly(function() {
            return this._tagName;
        }),

        nodeName: util.readOnly(function() {
            return this.tagName;
        }),

        nodeType: util.readOnlyValue(Node.ELEMENT_NODE),

        firstElementChild: util.readOnly(function() {
            return nextElement(this._firstChild);
        }),
        lastElementChild: util.readOnly(function() {
            return previousElement(this._lastChild);
        }),
        previousElementSibling: util.readOnly(function() {
            return previousElement(this._previousSibling);
        }),
        nextElementSibling: util.readOnly(function() {
            return nextElement(this._nextSibling);
        }),
    });

    return Element;
})();