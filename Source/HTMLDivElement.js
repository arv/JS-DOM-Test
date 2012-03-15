function HTMLDivElement(ownerDocument) {
    HTMLElement.call(this, ownerDocument, 'DIV');
}

HTMLDivElement.prototype = Object.create(HTMLElement.prototype);