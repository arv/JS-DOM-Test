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
        _fastSetAttribute: util.method(function(normalizedName, value) {
            // var map = GET(this, ATTRIBUTE_MAP);
            this._attributeMap.set(normalizedName, value);
        }),
        setAttribute: util.method(function(name, value) {
            this._fastSetAttribute(normalizeAttributeName(this, name),
                                   String(value));
        }),

        _fastGetAttribute: util.method(function(normalizedName) {
            var value = this._attributeMap.get(normalizedName);
            return value !== undefined ? value : null;
        }),
        getAttribute: util.method(function(name) {
            return this._fastGetAttribute(normalizeAttributeName(this, name));
        }),

        _fastHasAttribute: util.method(function(normalizedName) {
            // var map = GET(this, ATTRIBUTE_MAP);
            return this._attributeMap.has(normalizedName);
        }),
        hasAttribute: util.method(function(name) {
            return this._fastHasAttribute(normalizeAttributeName(this, name));
        }),

        _fastRemoveAttribute: util.method(function(normalizedName) {
            // var map = GET(this, ATTRIBUTE_MAP);
            this._attributeMap.delete(normalizedName);
        }),
        removeAttribute: util.method(function(name) {
            this._fastRemoveAttribute(normalizeAttributeName(this, name));
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