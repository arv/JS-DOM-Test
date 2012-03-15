var util = (function() {
    function method(func) {
        return {
            value: func,
            enumerable: false,
            configurable: true,
            writable: true
        };
    }

    function reflectStringAttribute(attributeName) {
        return {
            get: function() {
                return this.getAttribute(attributeName) || '';
            },
            set: function(value) {
                if (value === null)
                    this.removeAttribute(attributeName);
                else
                    this.setAttribute(attributeName, value);
            },
            configurable: true,
            enumerable: true
        }
    }

    function constPrivateValue(v) {
        return {
            value: v
        };
    }

    function reflectBooleanAttribute(attributeName) {
        return {
            get: function() {
                return this.hasAttribute(attributeName);
            },
            set: function(value) {
                if (!value)
                    this.removeAttribute(attributeName);
                else
                    this.setAttribute(attributeName, '');
            },
            configurable: true,
            enumerable: true
        }
    }

    function reflectLongAttribute(attributeName) {
        return {
            get: function() {
                // TODO(arv): Validate
                return parseInt(this.getAttribute(attributeName), 10);
            },
            set: function(value) {
                if (value === null) {
                    this.removeAttribute(attributeName);
                } else {
                    // TODO(arv): Validate
                    this.setAttribute(attributeName, Number(value) | 0);
                }
            },
            configurable: true,
            enumerable: true
        }
    }

    function readOnly(name, constr) {
        return {
            get:  function() {
                if (this[name])
                    return this[name];
                return this[name] = new constr(this)
            },
            enumerable: true,
            configurable: true
        };
    }

    return {
        constPrivateValue: constPrivateValue,
        method: method,
        readOnly: readOnly,
        reflectBooleanAttribute: reflectBooleanAttribute,
        reflectLongAttribute: reflectLongAttribute,
        reflectStringAttribute: reflectStringAttribute,
    }
})();