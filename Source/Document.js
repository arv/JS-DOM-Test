function Document() {}

Document.prototype= {
  __proto__: Node.prototype,

    createElement: function(tagName) {
        return new HTMLDivElement();
    }
};