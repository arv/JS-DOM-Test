function HTMLDivElement(ownerDocument, tagName) {
    HTMLElement.call(this, ownerDocument, 'DIV');
}

HTMLDivElement.prototype = Object.create(HTMLElement.prototype);