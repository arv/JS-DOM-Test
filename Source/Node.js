var Node = (function() {

    var childNodesWeakMap = new WeakMap;

    function invalidateChildNodes(node) {
        var childNodes = childNodesWeakMap.get(node);
        if (childNodes)
            childNodes._invalidate();
    }

    function forAllChildNodes(node, func) {
        for (var child = node._firstChild; child; ) {
            var next = child._nextSibling;
            func(child);
            child = next;
        }
    }

    function removeAllChildren(node) {
        forAllChildNodes(node, function(child) {
            child._parentNode = child._previousSibling = child._nextSibling = null;
        });
        node._firstChild = node._lastChild = null;
        invalidateChildNodes(node);
    }

    function appendChild(child) {
        return this.insertBefore(child, null);
    }

    function removeChild(child) {
        // Check for ancestor etc.
        if (child._parentNode !== this) {
            // TODO(arv): Implement
            throw 'NotFoundError';
        }

        if (child === this._lastChild)
            this._lastChild = child._previousSibling;
        if (child === this._firstChild)
            this._firstChild = child._nextSibling;
        if (child._previousSibling)
            child._previousSibling._nextSibling = child._nextSibling;
        if (child._nextSibling)
            child._nextSibling._previousSibling = child._previousSibling;
        child._previousSibling = child._nextSibling = child._parentNode = null;
        invalidateChildNodes(this);
        return child;
    }

    function insertBefore(node, oldChild) {
        // Check for ancestor etc.
        var oldParent;
        if ((oldParent = node._parentNode)) {
            oldParent.removeChild(node);
        }

        if (!oldChild) {
            if (!this._lastChild) {
                this._lastChild = this._firstChild = node;
            } else {
                var oldLastChild = this._lastChild;
                oldLastChild._nextSibling = node;
                node._previousSibling = oldLastChild;
                this._lastChild = node;
            }
        } else {
            if (oldChild._parentNode !== this) {
                // TODO(arv): Implement
                throw 'NotFoundError';
            }

            if (oldChild === this._firstChild)
                this._firstChild = node;

            node._nextSibling = oldChild;
            node._previousSibling = oldChild._previousSibling;

            if (oldChild._previousSibling)
                oldChild._previousSibling._nextSibling = node;

            oldChild._previousSibling = node;
        }

        node._parentNode = this;
        invalidateChildNodes(this);
        return oldChild;
    }

    function replaceChild(node, oldChild) {
        // Check for ancestor etc.
        if (!oldChild) {
            // TODO(arv): Implement
            throw "MissingArgument";
        }
        if (oldChild._parentNode !== this) {
            // TODO(arv): Implement
            throw 'NotFoundError';
        }

        if (oldChild === this._firstChild)
            this._firstChild = node;
        if (oldChild === this._lastChild)
            this._lastChild = node;
        node._previousSibling = oldChild._previousSibling;
        node._nextSibling = oldChild._nextSibling;
        oldChild._parentNode = oldChild._previousSibling = oldChild._nextSibling = null;

        node._parentNode = this;
        invalidateChildNodes(this);
        return node;
    }

    function getTextContent() {
        switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
                var s = '';
                forAllChildNodes(this, function(child) {
                    var childTextContent = child.textContent;
                    if (childTextContent)
                        s += childTextContent;
                });
                return s;
            case Node.TEXT_NODE:
            case Node.PROCESSING_INSTRUCTION_NODE:
            case Node.COMMENT_NODE:
                return this.data;
            default:
                return null;
        }
    }

    function setTextContent(value) {
        switch (this.nodeType) {
            case Node.ELEMENT_NODE:
            case Node.DOCUMENT_FRAGMENT_NODE:
                removeAllChildren(this);
                var textNode = new Text(this._ownerDocument, value);
                this.appendChild(textNode);
                break;
            case Node.TEXT_NODE:
            case Node.PROCESSING_INSTRUCTION_NODE:
            case Node.COMMENT_NODE:
                this.data = value;
                break;
            default:
                break;
        }
    }

    function Node(ownerDocument) {
        this._ownerDocument = ownerDocument;
        this._firstChild = this._lastChild = this._parentNode = this._nextSibling = this._previousSibling = null;
    }

    Node.prototype = Object.create(Object.prototype, {
        ownerDocument: util.readOnly(function() {
            return this._ownerDocument;
        }),

        firstChild: util.readOnly(function() { return this._firstChild; }),
        lastChild: util.readOnly(function() { return this._lastChild; }),
        parentNode: util.readOnly(function() { return this._parentNode; }),
        nextSibling: util.readOnly(function() { return this._nextSibling; }),
        previousSibling: util.readOnly(function() { return this._previousSibling; }),

        appendChild: util.method(appendChild),
        removeChild: util.method(removeChild),
        insertBefore: util.method(insertBefore),
        replaceChild: util.method(replaceChild),

        hasChildNodes: util.method(function() {
            return !!this._firstChild;
        }),

        textContent: util.default({
            get: getTextContent,
            set: setTextContent,
        }),

        childNodes: util.cachedReadOnly(childNodesWeakMap, ChildNodeList),
    });

    util.defineConsts(Node, [
        'ELEMENT_NODE', 1,
        'TEXT_NODE', 3,
        'PROCESSING_INSTRUCTION_NODE', 7,
        'COMMENT_NODE', 8,
        'DOCUMENT_NODE', 9,
        'DOCUMENT_TYPE_NODE', 10,
        'DOCUMENT_FRAGMENT_NODE', 11
    ]);

    return Node;
})();