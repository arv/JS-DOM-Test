function HTMLDivElement() {
    HTMLElement.call(this, 'DIV');
}

HTMLDivElement.prototype = {
    __proto__: HTMLElement.prototype,
};