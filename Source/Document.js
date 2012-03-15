var Document = (function() {

    var tagNameToConstructor = new Map;
    tagNameToConstructor.set('div', HTMLDivElement);

    function Document() {
        Node.call(this, null);
    }

    Document.prototype= Object.create(Node.prototype, {
        createElement: util.method(function(tagName) {
            var constr = tagNameToConstructor.get(tagName);
            return new constr(this);
        }),
        createTextNode: util.method(function(text) {
            return new Text(this, text);
        }),
        nodeName: util.readOnlyValue('#document'),
        nodeType: util.readOnlyValue(Node.DOCUMENT_NODE)
    });

    return Document;
})();