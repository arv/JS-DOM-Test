var util = (function() {
    var dp = Object.defineProperty;

    function method(func) {
        return {
            value: func,
            configurable: true,
            enumerable: true,
            writable: true
        };
    }

    function reflectStringAttribute(attributeName) {
        return {
            get: function() {
                return this._fastGetAttribute(attributeName) || '';
            },
            set: function(value) {
                if (value === null)
                    this._fastRemoveAttribute(attributeName);
                else
                    this._fastSetAttribute(attributeName, String(value));
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
                return this._fastHasAttribute(attributeName);
            },
            set: function(value) {
                if (!value)
                    this._fastRemoveAttribute(attributeName);
                else
                    this._fastSetAttribute(attributeName, '');
            },
            configurable: true,
            enumerable: true
        }
    }

    function reflectLongAttribute(attributeName) {
        return {
            get: function() {
                // TODO(arv): Validate
                return Number(this._fastGetAttribute(attributeName), 10);
            },
            set: function(value) {
                if (value === null) {
                    this._fastRemoveAttribute(attributeName);
                } else {
                    // TODO(arv): Validate
                    this._fastSetAttribute(attributeName, Number(value) | 0);
                }
            },
            configurable: true,
            enumerable: true
        }
    }

    function readOnly(func) {
        return {
            get: func,
            enumerable: true,
            configurable: true
        };
    }

    function readOnlyValue(value) {
        return readOnly(function() {
            return value;
        });
    }

    function cachedReadOnly(weakMap, constr) {
        return {
            get:  function() {
                var value = weakMap.get(this);
                if (!value) {
                    value = new constr(this);
                    weakMap.set(this, value);
                }
                return value;
            },
            enumerable: true,
            configurable: true
        };
    }

    function defineConst(object, name, value) {
        dp(object, name, {
            value: value,
            enumerable: true
        });
    }

    function defineConsts(constr, namesAndValues) {
        for (var i = 0; i < namesAndValues.length; i += 2) {
            defineConst(constr, namesAndValues[i], namesAndValues[i + 1]);
            defineConst(constr.prototype, namesAndValues[i], namesAndValues[i + 1]);
        }
    }

    function defaultDescriptor(descr) {
        if (!('writable' in descr) && !descr.get && !descr.set)
            descr.writable = true;
        if (!('enumerable' in descr))
            descr.enumerable = true;
        if (!('configurable' in descr))
            descr.enumerable = true;
        return descr;
    }

    function returnNull() {
        return function() {
            return null;
        };
    }

    return {
        cachedReadOnly: cachedReadOnly,
        constPrivateValue: constPrivateValue,
        default: defaultDescriptor,
        defineConsts: defineConsts,
        method: method,
        readOnly: readOnly,
        readOnlyValue: readOnlyValue,
        reflectBooleanAttribute: reflectBooleanAttribute,
        reflectLongAttribute: reflectLongAttribute,
        reflectStringAttribute: reflectStringAttribute,
        returnNull: returnNull,
    };
})();