var ChildNodeList = (function() {
    'use strict';

    function ChildNodeList(owner) {
        this._owner = owner;
        this._invalidate();
    }

    ChildNodeList.prototype = Object.create(Object.prototype, {
        item: util.method(function(index) {
            if (this._lastItem && this._lastIndex === index)
                return this._lastItem;

            if (this._cachedLength !== null && index >= this._cachedLength)
                return null;

            var startItem, startIndex, forward = true;
            if (!this._lastItem || index < this._lastIndex >> 1) {
                startItem = this._owner._firstChild;
                startIndex = 0;
            } else {
                startItem = this._lastItem;
                startIndex = this._lastIndex;
                forward = index > this._lastIndex;
            }

            for (var item = startItem, i = startIndex;
                item && i < index;
                forward ? i++ : i--, item = forward ? item._nextSibling : item._previousSibling) {
            }

            if (item) {
                this._lastItem = item;
                this._lastIndex = i;
            }
            return item;
        }),
        length: util.readOnly(function() {
            if (this._cachedLength !== null)
                return this._cachedLength;
            var item = this._lastItem || this._owner._firstChild;
            var length = this._lastIndex !== null ? this._lastIndex : 0;
            while (item) {
                item = item._nextSibling;
                length++;
            }
            return this._cachedLength = length;
        }),

        _invalidate: util.constPrivateValue(function() {
            this._cachedLength = this._lastItem = this._lastIndex = null;
        })
    });

    return ChildNodeList;
})();