function CharacterData(ownerDocument, data) {
    Node.call(this, ownerDocument);
    this.data = data;
}

CharacterData.prototype = Object.create(Node.prototype, {
    data: util.default({
        get: function() { return this._data; },
        set: function(value) {
            this._data = value === null ? '' : String(value);
        },
    }),
    length: util.readOnly(function() {
        return this._data.length;
    }),
    textContent: util.default({
        get: function() { return this.data; },
        set: function(value) { this.data = value; }
    })
});