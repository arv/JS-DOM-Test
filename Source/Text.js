function Text(ownerDocument, data) {
    CharacterData.call(this, ownerDocument, data);
}

Text.prototype = Object.create(CharacterData.prototype, {
    // Text splitText(unsigned long offset);
    // readonly attribute DOMString wholeText;
});