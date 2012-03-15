var Element = (function() {
    'use strict';

    function normalizeAttributeName(element, name) {
        return element._isHTML ? name.toLowerCase() : name;
    }

    function Element(tagName, isHTML) {
        Node.call(this);
        this._attributeMap = new Map;
        this._tagName = tagName;
        this._isHTML = isHTML;
    }

    Element.prototype = {
        __proto__: Node.prototype,

        _isHTMLElement: false,

        setAttribute: function(name, value) {
            var normalizedName = normalizeAttributeName(this, name);
            // var map = GET(this, ATTRIBUTE_MAP);
            var map = this._attributeMap;
            map.set(normalizedName, String(value));
        },

        getAttribute: function(name) {
            var normalizedName = normalizeAttributeName(this, name);
            // var map = GET(this, ATTRIBUTE_MAP);
            var map = this._attributeMap;
            return map.has(normalizedName) ? map.get(normalizedName) : null;
        },

        hasAttribute: function(name) {
            var normalizedName = normalizeAttributeName(this, name);
            // var map = GET(this, ATTRIBUTE_MAP);
            var map = this._attributeMap;
            return map.has(normalizedName);
        },

        get tagName() {
            return this._tagName;
        }
    };

    return Element;
})();