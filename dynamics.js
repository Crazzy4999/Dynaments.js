//Copyright © 2022 Fábián Álmos László
class DynamicStyle {
    constructor(style, id) {
        this._style = {};
        this._style = style;
    }
}
class DynamicElement {
    constructor() {
        this._type = "div";
        this._inputType = "text";
        this._id = "";
        this._text = "";
        this._innerHTML = "";
        this._style = {};
        this._classList = "";
        this._parent = this;
        this._children = [];
        this._builtChildren = [];
        this.setTexts = (e) => { e instanceof HTMLInputElement ? e.value = this._text : e.innerText = this._text; e.nodeValue = this._text; e.textContent = this._text; }; //TODO: implementation for HTMLINPUTELEMENTS, like: text, textarea, button
        this.check = (val) => { return (val !== "" || val !== null || val !== undefined); };
        this.appendByClass = (c, i, e) => { const n = document.getElementsByClassName(c).item(i); if (n !== null) {
            n.append(e);
            this.setTexts(e);
        } };
        this.appendByTag = (t, i, e) => { var _a; (_a = document.getElementsByTagName(t).item(i)) === null || _a === void 0 ? void 0 : _a.append(e); this.setTexts(e); };
    }
    type(type) {
        this._type = type;
        return this;
    }
    inputType(inputType) {
        this._inputType = inputType;
        return this;
    }
    id(id) {
        this._id = id;
        return this;
    }
    text(text) {
        this._text = text;
        return this;
    }
    innerHTML(innerHTML) {
        this._innerHTML = innerHTML;
        return this;
    }
    style(style) {
        this._style = style;
        return this;
    }
    class(classList) {
        this._classList = classList;
        return this;
    }
    addChild() {
        const child = new DynamicElement();
        child._parent = this;
        this._children.push(child);
        return child;
    }
    buildChild() {
        this._parent._builtChildren.push(this.build());
        return this._parent;
    }
    build(appendTo) {
        var _a;
        const element = document.createElement(this._type);
        if (element instanceof HTMLInputElement)
            element.type = this._inputType;
        if (this._id !== "")
            element.id = this._id;
        element.innerHTML = this._innerHTML;
        if (this._style instanceof DynamicStyle) {
            Object.entries(Object.entries(new DynamicStyle(this._style)._style)[0][1]).forEach((s) => element.style[s[0]] = s[1]);
        }
        else
            Object.entries(this._style).forEach((s) => element.style[s[0]] = s[1]);
        this._classList.split(" ").forEach(c => {
            if (this._classList.split(" ")[0] !== "") {
                element.classList.add(c);
            }
        });
        if (appendTo !== undefined /* || appendTo !== null*/) {
            if (!this.check(appendTo.id)) {
                if (this.check(appendTo.class)) {
                    this.check(appendTo.index) ? this.appendByClass(appendTo.class, appendTo.index, element) : this.appendByClass(appendTo.class, 0, element);
                    return element;
                }
                if (this.check(appendTo.tag)) {
                    this.check(appendTo.index) ? this.appendByTag(appendTo.tag, appendTo.index, element) : this.appendByTag(appendTo.tag, 0, element);
                    return element;
                }
            }
            else {
                (_a = document.getElementById(appendTo.id)) === null || _a === void 0 ? void 0 : _a.append(element);
                this.setTexts(element);
            }
        }
        this._builtChildren.forEach(child => element.append(child));
        return element;
    }
}
export default DynamicElement;
export { DynamicElement, DynamicStyle };
