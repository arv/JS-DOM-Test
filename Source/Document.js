var Document = (function() {

    var tagNameToConstructor = new Map;
    tagNameToConstructor.set('div', HTMLDivElement);

    tagNameToConstructor.set('abbr', HTMLElement);
    tagNameToConstructor.set('acronym', HTMLElement);
    tagNameToConstructor.set('address', HTMLElement);
    tagNameToConstructor.set('article', HTMLElement);
    tagNameToConstructor.set('aside', HTMLElement);
    tagNameToConstructor.set('b', HTMLElement);
    tagNameToConstructor.set('bdi', HTMLElement);
    tagNameToConstructor.set('bdo', HTMLElement);
    tagNameToConstructor.set('bgsound', HTMLElement);
    tagNameToConstructor.set('big', HTMLElement);
    tagNameToConstructor.set('center', HTMLElement);
    tagNameToConstructor.set('cite', HTMLElement);
    tagNameToConstructor.set('code', HTMLElement);
    tagNameToConstructor.set('command', HTMLElement);
    tagNameToConstructor.set('dd', HTMLElement);
    tagNameToConstructor.set('dfn', HTMLElement);
    tagNameToConstructor.set('dt', HTMLElement);
    tagNameToConstructor.set('em', HTMLElement);
    tagNameToConstructor.set('figcaption', HTMLElement);
    tagNameToConstructor.set('figure', HTMLElement);
    tagNameToConstructor.set('footer', HTMLElement);
    tagNameToConstructor.set('header', HTMLElement);
    tagNameToConstructor.set('hgroup', HTMLElement);
    tagNameToConstructor.set('i', HTMLElement);
    tagNameToConstructor.set('kbd', HTMLElement);
    tagNameToConstructor.set('layer', HTMLElement);
    tagNameToConstructor.set('mark', HTMLElement);
    tagNameToConstructor.set('nav', HTMLElement);
    tagNameToConstructor.set('nobr', HTMLElement);
    tagNameToConstructor.set('noembed', HTMLElement);
    tagNameToConstructor.set('noframes', HTMLElement);
    tagNameToConstructor.set('nolayer', HTMLElement);
    tagNameToConstructor.set('noscript', HTMLElement);
    tagNameToConstructor.set('plaintext', HTMLElement);
    tagNameToConstructor.set('rp', HTMLElement);
    tagNameToConstructor.set('rt', HTMLElement);
    tagNameToConstructor.set('ruby', HTMLElement);
    tagNameToConstructor.set('s', HTMLElement);
    tagNameToConstructor.set('samp', HTMLElement);
    tagNameToConstructor.set('section', HTMLElement);
    tagNameToConstructor.set('small', HTMLElement);
    tagNameToConstructor.set('strike', HTMLElement);
    tagNameToConstructor.set('strong', HTMLElement);
    tagNameToConstructor.set('sub', HTMLElement);
    tagNameToConstructor.set('sup', HTMLElement);
    tagNameToConstructor.set('tt', HTMLElement);
    tagNameToConstructor.set('u', HTMLElement);
    tagNameToConstructor.set('var', HTMLElement);
    tagNameToConstructor.set('wbr', HTMLElement);


    function Document() {
        Node.call(this, null);
    }

    Document.prototype= Object.create(Node.prototype, {
        createElement: util.method(function(tagName) {
            // TODO(arv): Only lowercase for HTMLDocument.
            var constr = tagNameToConstructor.get(tagName.toLowerCase());
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
