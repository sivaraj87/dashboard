
/*!
 * jQuery UI 1.8.12
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
 (function(c, j) {
    function k(a) {
        return ! c(a).parents().andSelf().filter(function() {
            return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
        }).length
    }
    c.ui = c.ui || {};
    if (!c.ui.version) {
        c.extend(c.ui, {
            version: "1.8.12",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        c.fn.extend({
            _focus: c.fn.focus,
            focus: function(a, b) {
                return typeof a === "number" ? this.each(function() {
                    var d = this;
                    setTimeout(function() {
                        c(d).focus();
                        b && b.call(d)
                    },
                    a)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function() {
                var a;
                a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(c.curCSS(this,
                    "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
            },
            zIndex: function(a) {
                if (a !== j) return this.css("zIndex", a);
                if (this.length) {
                    a = c(this[0]);
                    for (var b; a.length && a[0] !== document;) {
                        b = a.css("position");
                        if (b === "absolute" || b === "relative" || b === "fixed") {
                            b = parseInt(a.css("zIndex"), 10);
                            if (!isNaN(b) && b !== 0) return b
                        }
                        a = a.parent()
                    }
                }
                return 0
            },
            disableSelection: function() {
                return this.bind((c.support.selectstart ? "selectstart": "mousedown") + ".ui-disableSelection",
                function(a) {
                    a.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        });
        c.each(["Width", "Height"],
        function(a, b) {
            function d(f, g, l, m) {
                c.each(e,
                function() {
                    g -= parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
                    if (l) g -= parseFloat(c.curCSS(f,
                    "border" + this + "Width", true)) || 0;
                    if (m) g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
                });
                return g
            }
            var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            h = b.toLowerCase(),
            i = {
                innerWidth: c.fn.innerWidth,
                innerHeight: c.fn.innerHeight,
                outerWidth: c.fn.outerWidth,
                outerHeight: c.fn.outerHeight
            };
            c.fn["inner" + b] = function(f) {
                if (f === j) return i["inner" + b].call(this);
                return this.each(function() {
                    c(this).css(h, d(this, f) + "px")
                })
            };
            c.fn["outer" + b] = function(f, g) {
                if (typeof f !== "number") return i["outer" + b].call(this, f);
                return this.each(function() {
                    c(this).css(h,
                    d(this, f, true, g) + "px")
                })
            }
        });
        c.extend(c.expr[":"], {
            data: function(a, b, d) {
                return !! c.data(a, d[3])
            },
            focusable: function(a) {
                var b = a.nodeName.toLowerCase(),
                d = c.attr(a, "tabindex");
                if ("area" === b) {
                    b = a.parentNode;
                    d = b.name;
                    if (!a.href || !d || b.nodeName.toLowerCase() !== "map") return false;
                    a = c("img[usemap=#" + d + "]")[0];
                    return !! a && k(a)
                }
                return (/input|select|textarea|button|object/.test(b) ? !a.disabled: "a" == b ? a.href || !isNaN(d) : !isNaN(d)) && k(a)
            },
            tabbable: function(a) {
                var b = c.attr(a, "tabindex");
                return (isNaN(b) || b >= 0) && c(a).is(":focusable")
            }
        });
        c(function() {
            var a = document.body,
            b = a.appendChild(b = document.createElement("div"));
            c.extend(b.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            c.support.minHeight = b.offsetHeight === 100;
            c.support.selectstart = "onselectstart" in b;
            a.removeChild(b).style.display = "none"
        });
        c.extend(c.ui, {
            plugin: {
                add: function(a, b, d) {
                    a = c.ui[a].prototype;
                    for (var e in d) {
                        a.plugins[e] = a.plugins[e] || [];
                        a.plugins[e].push([b, d[e]])
                    }
                },
                call: function(a, b, d) {
                    if ((b = a.plugins[b]) && a.element[0].parentNode) for (var e = 0; e < b.length; e++) a.options[b[e][0]] &&
                    b[e][1].apply(a.element, d)
                }
            },
            contains: function(a, b) {
                return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16: a !== b && a.contains(b)
            },
            hasScroll: function(a, b) {
                if (c(a).css("overflow") === "hidden") return false;
                b = b && b === "left" ? "scrollLeft": "scrollTop";
                var d = false;
                if (a[b] > 0) return true;
                a[b] = 1;
                d = a[b] > 0;
                a[b] = 0;
                return d
            },
            isOverAxis: function(a, b, d) {
                return a > b && a < b + d
            },
            isOver: function(a, b, d, e, h, i) {
                return c.ui.isOverAxis(a, d, h) && c.ui.isOverAxis(b, e, i)
            }
        })
    }
})(jQuery);

/*!
 * jQuery UI Widget 1.8.12
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
 (function(b, j) {
    if (b.cleanData) {
        var k = b.cleanData;
        b.cleanData = function(a) {
            for (var c = 0, d; (d = a[c]) != null; c++) b(d).triggerHandler("remove");
            k(a)
        }
    } else {
        var l = b.fn.remove;
        b.fn.remove = function(a, c) {
            return this.each(function() {
                if (!c) if (!a || b.filter(a, [this]).length) b("*", this).add([this]).each(function() {
                    b(this).triggerHandler("remove")
                });
                return l.call(b(this), a, c)
            })
        }
    }
    b.widget = function(a, c, d) {
        var e = a.split(".")[0],
        f;
        a = a.split(".")[1];
        f = e + "-" + a;
        if (!d) {
            d = c;
            c = b.Widget
        }
        b.expr[":"][f] = function(h) {
            return !! b.data(h,
            a)
        };
        b[e] = b[e] || {};
        b[e][a] = function(h, g) {
            arguments.length && this._createWidget(h, g)
        };
        c = new c;
        c.options = b.extend(true, {},
        c.options);
        b[e][a].prototype = b.extend(true, c, {
            namespace: e,
            widgetName: a,
            widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a,
            widgetBaseClass: f
        },
        d);
        b.widget.bridge(a, b[e][a])
    };
    b.widget.bridge = function(a, c) {
        b.fn[a] = function(d) {
            var e = typeof d === "string",
            f = Array.prototype.slice.call(arguments, 1),
            h = this;
            d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d;
            if (e && d.charAt(0) === "_") return h;
            e ? this.each(function() {
                var g = b.data(this, a),
                i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g;
                if (i !== g && i !== j) {
                    h = i;
                    return false
                }
            }) : this.each(function() {
                var g = b.data(this, a);
                g ? g.option(d || {})._init() : b.data(this, a, new c(d, this))
            });
            return h
        }
    };
    b.Widget = function(a, c) {
        arguments.length && this._createWidget(a, c)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function(a, c) {
            b.data(c, this.widgetName, this);
            this.element = b(c);
            this.options = b.extend(true, {},
            this.options,
            this._getCreateOptions(), a);
            var d = this;
            this.element.bind("remove." + this.widgetName,
            function() {
                d.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function() {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(a, c) {
            var d = a;
            if (arguments.length === 0) return b.extend({},
            this.options);
            if (typeof a === "string") {
                if (c === j) return this.options[a];
                d = {};
                d[a] = c
            }
            this._setOptions(d);
            return this
        },
        _setOptions: function(a) {
            var c = this;
            b.each(a,
            function(d, e) {
                c._setOption(d, e)
            });
            return this
        },
        _setOption: function(a, c) {
            this.options[a] = c;
            if (a === "disabled") this.widget()[c ? "addClass": "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c);
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _trigger: function(a, c, d) {
            var e = this.options[a];
            c = b.Event(c);
            c.type = (a === this.widgetEventPrefix ? a: this.widgetEventPrefix + a).toLowerCase();
            d = d || {};
            if (c.originalEvent) {
                a = b.event.props.length;
                for (var f; a;) {
                    f = b.event.props[--a];
                    c[f] = c.originalEvent[f]
                }
            }
            this.element.trigger(c, d);
            return ! (b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
        }
    }
})(jQuery);

/*!
 * jQuery UI Mouse 1.8.12
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
 (function(b) {
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var a = this;
            this.element.bind("mousedown." + this.widgetName,
            function(c) {
                return a._mouseDown(c)
            }).bind("click." + this.widgetName,
            function(c) {
                if (true === b.data(c.target, a.widgetName + ".preventClickEvent")) {
                    b.removeData(c.target, a.widgetName + ".preventClickEvent");
                    c.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(a) {
            a.originalEvent =
            a.originalEvent || {};
            if (!a.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(a);
                this._mouseDownEvent = a;
                var c = this,
                e = a.which == 1,
                f = typeof this.options.cancel == "string" ? b(a.target).parents().add(a.target).filter(this.options.cancel).length: false;
                if (!e || f || !this._mouseCapture(a)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function() {
                    c.mouseDelayMet = true
                },
                this.options.delay);
                if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                    this._mouseStarted =
                    this._mouseStart(a) !== false;
                    if (!this._mouseStarted) {
                        a.preventDefault();
                        return true
                    }
                }
                true === b.data(a.target, this.widgetName + ".preventClickEvent") && b.removeData(a.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(d) {
                    return c._mouseMove(d)
                };
                this._mouseUpDelegate = function(d) {
                    return c._mouseUp(d)
                };
                b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                a.preventDefault();
                return a.originalEvent.mouseHandled =
                true
            }
        },
        _mouseMove: function(a) {
            if (b.browser.msie && !(document.documentMode >= 9) && !a.button) return this._mouseUp(a);
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== false) ? this._mouseDrag(a) : this._mouseUp(a);
            return ! this._mouseStarted
        },
        _mouseUp: function(a) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                a.target == this._mouseDownEvent.target && b.data(a.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(a)
            }
            return false
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    })
})(jQuery);

/*
 * jQuery UI Resizable 1.8.12
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
 (function(e) {
    e.widget("ui.resizable", e.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1E3
        },
        _create: function() {
            var b = this,
            a = this.options;
            this.element.addClass("ui-resizable");
            e.extend(this, {
                _aspectRatio: !!a.aspectRatio,
                aspectRatio: a.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper": null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) { / relative / .test(this.element.css("position")) && e.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle =
                this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = a.handles || (!e(".ui-resizable-handle", this.element).length ? "e,s,se": {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var c = this.handles.split(",");
                this.handles = {};
                for (var d = 0; d < c.length; d++) {
                    var f = e.trim(c[d]),
                    g = e('<div class="ui-resizable-handle ' + ("ui-resizable-" + f) + '"></div>');
                    /sw|se|ne|nw/.test(f) && g.css({
                        zIndex: ++a.zIndex
                    });
                    "se" == f && g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[f] = ".ui-resizable-" + f;
                    this.element.append(g)
                }
            }
            this._renderAxis = function(h) {
                h = h || this.element;
                for (var i in this.handles) {
                    if (this.handles[i].constructor ==
                    String) this.handles[i] = e(this.handles[i], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var j = e(this.handles[i], this.element),
                        k = 0;
                        k = /sw|ne|nw|se|n|s/.test(i) ? j.outerHeight() : j.outerWidth();
                        j = ["padding", /ne|nw|n/.test(i) ? "Top": /se|sw|s/.test(i) ? "Bottom": /^e$/.test(i) ? "Right": "Left"].join("");
                        h.css(j, k);
                        this._proportionallyResize()
                    }
                    e(this.handles[i])
                }
            };
            this._renderAxis(this.element);
            this._handles = e(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!b.resizing) {
                    if (this.className) var h = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    b.axis = h && h[1] ? h[1] : "se"
                }
            });
            if (a.autoHide) {
                this._handles.hide();
                e(this.element).addClass("ui-resizable-autohide").hover(function() {
                    e(this).removeClass("ui-resizable-autohide");
                    b._handles.show()
                },
                function() {
                    if (!b.resizing) {
                        e(this).addClass("ui-resizable-autohide");
                        b._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var b = function(c) {
                e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                b(this.element);
                var a = this.element;
                a.after(this.originalElement.css({
                    position: a.css("position"),
                    width: a.outerWidth(),
                    height: a.outerHeight(),
                    top: a.css("top"),
                    left: a.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            b(this.originalElement);
            return this
        },
        _mouseCapture: function(b) {
            var a = false;
            for (var c in this.handles) if (e(this.handles[c])[0] == b.target) a = true;
            return ! this.options.disabled && a
        },
        _mouseStart: function(b) {
            var a = this.options,
            c = this.element.position(),
            d = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: e(document).scrollTop(),
                left: e(document).scrollLeft()
            };
            if (d.is(".ui-draggable") || /absolute/.test(d.css("position"))) d.css({
                position: "absolute",
                top: c.top,
                left: c.left
            });
            e.browser.opera && /relative/.test(d.css("position")) && d.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            c = m(this.helper.css("left"));
            var f = m(this.helper.css("top"));
            if (a.containment) {
                c += e(a.containment).scrollLeft() || 0;
                f += e(a.containment).scrollTop() || 0
            }
            this.offset =
            this.helper.offset();
            this.position = {
                left: c,
                top: f
            };
            this.size = this._helper ? {
                width: d.outerWidth(),
                height: d.outerHeight()
            }: {
                width: d.width(),
                height: d.height()
            };
            this.originalSize = this._helper ? {
                width: d.outerWidth(),
                height: d.outerHeight()
            }: {
                width: d.width(),
                height: d.height()
            };
            this.originalPosition = {
                left: c,
                top: f
            };
            this.sizeDiff = {
                width: d.outerWidth() - d.width(),
                height: d.outerHeight() - d.height()
            };
            this.originalMousePosition = {
                left: b.pageX,
                top: b.pageY
            };
            this.aspectRatio = typeof a.aspectRatio == "number" ? a.aspectRatio:
            this.originalSize.width / this.originalSize.height || 1;
            a = e(".ui-resizable-" + this.axis).css("cursor");
            e("body").css("cursor", a == "auto" ? this.axis + "-resize": a);
            d.addClass("ui-resizable-resizing");
            this._propagate("start", b);
            return true
        },
        _mouseDrag: function(b) {
            var a = this.helper,
            c = this.originalMousePosition,
            d = this._change[this.axis];
            if (!d) return false;
            c = d.apply(this, [b, b.pageX - c.left || 0, b.pageY - c.top || 0]);
            if (this._aspectRatio || b.shiftKey) c = this._updateRatio(c, b);
            c = this._respectSize(c, b);
            this._propagate("resize",
            b);
            a.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }); ! this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(c);
            this._trigger("resize", b, this.ui());
            return false
        },
        _mouseStop: function(b) {
            this.resizing = false;
            var a = this.options,
            c = this;
            if (this._helper) {
                var d = this._proportionallyResizeElements,
                f = d.length && /textarea/i.test(d[0].nodeName);
                d = f && e.ui.hasScroll(d[0], "left") ? 0: c.sizeDiff.height;
                f = f ? 0: c.sizeDiff.width;
                f = {
                    width: c.helper.width() - f,
                    height: c.helper.height() - d
                };
                d = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null;
                var g = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
                a.animate || this.element.css(e.extend(f, {
                    top: g,
                    left: d
                }));
                c.helper.height(c.size.height);
                c.helper.width(c.size.width);
                this._helper && !a.animate && this._proportionallyResize()
            }
            e("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", b);
            this._helper && this.helper.remove();
            return false
        },
        _updateCache: function(b) {
            this.offset = this.helper.offset();
            if (l(b.left)) this.position.left = b.left;
            if (l(b.top)) this.position.top = b.top;
            if (l(b.height)) this.size.height = b.height;
            if (l(b.width)) this.size.width = b.width
        },
        _updateRatio: function(b) {
            var a = this.position,
            c = this.size,
            d = this.axis;
            if (b.height) b.width = c.height * this.aspectRatio;
            else if (b.width) b.height = c.width / this.aspectRatio;
            if (d == "sw") {
                b.left = a.left + (c.width - b.width);
                b.top =
                null
            }
            if (d == "nw") {
                b.top = a.top + (c.height - b.height);
                b.left = a.left + (c.width - b.width)
            }
            return b
        },
        _respectSize: function(b) {
            var a = this.options,
            c = this.axis,
            d = l(b.width) && a.maxWidth && a.maxWidth < b.width,
            f = l(b.height) && a.maxHeight && a.maxHeight < b.height,
            g = l(b.width) && a.minWidth && a.minWidth > b.width,
            h = l(b.height) && a.minHeight && a.minHeight > b.height;
            if (g) b.width = a.minWidth;
            if (h) b.height = a.minHeight;
            if (d) b.width = a.maxWidth;
            if (f) b.height = a.maxHeight;
            var i = this.originalPosition.left + this.originalSize.width,
            j = this.position.top +
            this.size.height,
            k = /sw|nw|w/.test(c);
            c = /nw|ne|n/.test(c);
            if (g && k) b.left = i - a.minWidth;
            if (d && k) b.left = i - a.maxWidth;
            if (h && c) b.top = j - a.minHeight;
            if (f && c) b.top = j - a.maxHeight;
            if ((a = !b.width && !b.height) && !b.left && b.top) b.top = null;
            else if (a && !b.top && b.left) b.left = null;
            return b
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) for (var b = this.helper || this.element, a = 0; a < this._proportionallyResizeElements.length; a++) {
                var c = this._proportionallyResizeElements[a];
                if (!this.borderDif) {
                    var d =
                    [c.css("borderTopWidth"), c.css("borderRightWidth"), c.css("borderBottomWidth"), c.css("borderLeftWidth")],
                    f = [c.css("paddingTop"), c.css("paddingRight"), c.css("paddingBottom"), c.css("paddingLeft")];
                    this.borderDif = e.map(d,
                    function(g, h) {
                        g = parseInt(g, 10) || 0;
                        h = parseInt(f[h], 10) || 0;
                        return g + h
                    })
                }
                e.browser.msie && (e(b).is(":hidden") || e(b).parents(":hidden").length) || c.css({
                    height: b.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: b.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function() {
            var b =
            this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                var a = e.browser.msie && e.browser.version < 7,
                c = a ? 1: 0;
                a = a ? 2: -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + a,
                    height: this.element.outerHeight() + a,
                    position: "absolute",
                    left: this.elementOffset.left - c + "px",
                    top: this.elementOffset.top - c + "px",
                    zIndex: ++b.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function(b,
            a) {
                return {
                    width: this.originalSize.width + a
                }
            },
            w: function(b, a) {
                return {
                    left: this.originalPosition.left + a,
                    width: this.originalSize.width - a
                }
            },
            n: function(b, a, c) {
                return {
                    top: this.originalPosition.top + c,
                    height: this.originalSize.height - c
                }
            },
            s: function(b, a, c) {
                return {
                    height: this.originalSize.height + c
                }
            },
            se: function(b, a, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            sw: function(b, a, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, a,
                c]))
            },
            ne: function(b, a, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            nw: function(b, a, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, a, c]))
            }
        },
        _propagate: function(b, a) {
            e.ui.plugin.call(this, b, [a, this.ui()]);
            b != "resize" && this._trigger(b, a, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    e.extend(e.ui.resizable, {
        version: "1.8.12"
    });
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var b = e(this).data("resizable").options,
            a = function(c) {
                e(c).each(function() {
                    var d = e(this);
                    d.data("resizable-alsoresize", {
                        width: parseInt(d.width(), 10),
                        height: parseInt(d.height(), 10),
                        left: parseInt(d.css("left"), 10),
                        top: parseInt(d.css("top"), 10),
                        position: d.css("position")
                    })
                })
            };
            if (typeof b.alsoResize == "object" && !b.alsoResize.parentNode) if (b.alsoResize.length) {
                b.alsoResize =
                b.alsoResize[0];
                a(b.alsoResize)
            } else e.each(b.alsoResize,
            function(c) {
                a(c)
            });
            else a(b.alsoResize)
        },
        resize: function(b, a) {
            var c = e(this).data("resizable");
            b = c.options;
            var d = c.originalSize,
            f = c.originalPosition,
            g = {
                height: c.size.height - d.height || 0,
                width: c.size.width - d.width || 0,
                top: c.position.top - f.top || 0,
                left: c.position.left - f.left || 0
            },
            h = function(i, j) {
                e(i).each(function() {
                    var k = e(this),
                    q = e(this).data("resizable-alsoresize"),
                    p = {},
                    r = j && j.length ? j: k.parents(a.originalElement[0]).length ? ["width", "height"] : ["width",
                    "height", "top", "left"];
                    e.each(r,
                    function(n, o) {
                        if ((n = (q[o] || 0) + (g[o] || 0)) && n >= 0) p[o] = n || null
                    });
                    if (e.browser.opera && /relative/.test(k.css("position"))) {
                        c._revertToRelativePosition = true;
                        k.css({
                            position: "absolute",
                            top: "auto",
                            left: "auto"
                        })
                    }
                    k.css(p)
                })
            };
            typeof b.alsoResize == "object" && !b.alsoResize.nodeType ? e.each(b.alsoResize,
            function(i, j) {
                h(i, j)
            }) : h(b.alsoResize)
        },
        stop: function() {
            var b = e(this).data("resizable"),
            a = b.options,
            c = function(d) {
                e(d).each(function() {
                    var f = e(this);
                    f.css({
                        position: f.data("resizable-alsoresize").position
                    })
                })
            };
            if (b._revertToRelativePosition) {
                b._revertToRelativePosition = false;
                typeof a.alsoResize == "object" && !a.alsoResize.nodeType ? e.each(a.alsoResize,
                function(d) {
                    c(d)
                }) : c(a.alsoResize)
            }
            e(this).removeData("resizable-alsoresize")
        }
    });
    e.ui.plugin.add("resizable", "animate", {
        stop: function(b) {
            var a = e(this).data("resizable"),
            c = a.options,
            d = a._proportionallyResizeElements,
            f = d.length && /textarea/i.test(d[0].nodeName),
            g = f && e.ui.hasScroll(d[0], "left") ? 0: a.sizeDiff.height;
            f = {
                width: a.size.width - (f ? 0: a.sizeDiff.width),
                height: a.size.height -
                g
            };
            g = parseInt(a.element.css("left"), 10) + (a.position.left - a.originalPosition.left) || null;
            var h = parseInt(a.element.css("top"), 10) + (a.position.top - a.originalPosition.top) || null;
            a.element.animate(e.extend(f, h && g ? {
                top: h,
                left: g
            }: {}), {
                duration: c.animateDuration,
                easing: c.animateEasing,
                step: function() {
                    var i = {
                        width: parseInt(a.element.css("width"), 10),
                        height: parseInt(a.element.css("height"), 10),
                        top: parseInt(a.element.css("top"), 10),
                        left: parseInt(a.element.css("left"), 10)
                    };
                    d && d.length && e(d[0]).css({
                        width: i.width,
                        height: i.height
                    });
                    a._updateCache(i);
                    a._propagate("resize", b)
                }
            })
        }
    });
    e.ui.plugin.add("resizable", "containment", {
        start: function() {
            var b = e(this).data("resizable"),
            a = b.element,
            c = b.options.containment;
            if (a = c instanceof e ? c.get(0) : /parent/.test(c) ? a.parent().get(0) : c) {
                b.containerElement = e(a);
                if (/document/.test(c) || c == document) {
                    b.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    b.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    b.parentData = {
                        element: e(document),
                        left: 0,
                        top: 0,
                        width: e(document).width(),
                        height: e(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var d =
                    e(a),
                    f = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function(i, j) {
                        f[i] = m(d.css("padding" + j))
                    });
                    b.containerOffset = d.offset();
                    b.containerPosition = d.position();
                    b.containerSize = {
                        height: d.innerHeight() - f[3],
                        width: d.innerWidth() - f[1]
                    };
                    c = b.containerOffset;
                    var g = b.containerSize.height,
                    h = b.containerSize.width;
                    h = e.ui.hasScroll(a, "left") ? a.scrollWidth: h;
                    g = e.ui.hasScroll(a) ? a.scrollHeight: g;
                    b.parentData = {
                        element: a,
                        left: c.left,
                        top: c.top,
                        width: h,
                        height: g
                    }
                }
            }
        },
        resize: function(b) {
            var a = e(this).data("resizable"),
            c = a.options,
            d = a.containerOffset,
            f = a.position;
            b = a._aspectRatio || b.shiftKey;
            var g = {
                top: 0,
                left: 0
            },
            h = a.containerElement;
            if (h[0] != document && /static/.test(h.css("position"))) g = d;
            if (f.left < (a._helper ? d.left: 0)) {
                a.size.width += a._helper ? a.position.left - d.left: a.position.left - g.left;
                if (b) a.size.height = a.size.width / c.aspectRatio;
                a.position.left = c.helper ? d.left: 0
            }
            if (f.top < (a._helper ? d.top: 0)) {
                a.size.height += a._helper ? a.position.top - d.top: a.position.top;
                if (b) a.size.width = a.size.height * c.aspectRatio;
                a.position.top = a._helper ?
                d.top: 0
            }
            a.offset.left = a.parentData.left + a.position.left;
            a.offset.top = a.parentData.top + a.position.top;
            c = Math.abs((a._helper ? a.offset.left - g.left: a.offset.left - g.left) + a.sizeDiff.width);
            d = Math.abs((a._helper ? a.offset.top - g.top: a.offset.top - d.top) + a.sizeDiff.height);
            f = a.containerElement.get(0) == a.element.parent().get(0);
            g = /relative|absolute/.test(a.containerElement.css("position"));
            if (f && g) c -= a.parentData.left;
            if (c + a.size.width >= a.parentData.width) {
                a.size.width = a.parentData.width - c;
                if (b) a.size.height =
                a.size.width / a.aspectRatio
            }
            if (d + a.size.height >= a.parentData.height) {
                a.size.height = a.parentData.height - d;
                if (b) a.size.width = a.size.height * a.aspectRatio
            }
        },
        stop: function() {
            var b = e(this).data("resizable"),
            a = b.options,
            c = b.containerOffset,
            d = b.containerPosition,
            f = b.containerElement,
            g = e(b.helper),
            h = g.offset(),
            i = g.outerWidth() - b.sizeDiff.width;
            g = g.outerHeight() - b.sizeDiff.height;
            b._helper && !a.animate && /relative/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: i,
                height: g
            });
            b._helper && !a.animate &&
            /static/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: i,
                height: g
            })
        }
    });
    e.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var b = e(this).data("resizable"),
            a = b.options,
            c = b.size;
            b.ghost = b.originalElement.clone();
            b.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: c.height,
                width: c.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof a.ghost == "string" ? a.ghost: "");
            b.ghost.appendTo(b.helper)
        },
        resize: function() {
            var b = e(this).data("resizable");
            b.ghost && b.ghost.css({
                position: "relative",
                height: b.size.height,
                width: b.size.width
            })
        },
        stop: function() {
            var b = e(this).data("resizable");
            b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
        }
    });
    e.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var b = e(this).data("resizable"),
            a = b.options,
            c = b.size,
            d = b.originalSize,
            f = b.originalPosition,
            g = b.axis;
            a.grid = typeof a.grid == "number" ? [a.grid, a.grid] : a.grid;
            var h = Math.round((c.width - d.width) / (a.grid[0] || 1)) * (a.grid[0] || 1);
            a = Math.round((c.height - d.height) /
            (a.grid[1] || 1)) * (a.grid[1] || 1);
            if (/^(se|s|e)$/.test(g)) {
                b.size.width = d.width + h;
                b.size.height = d.height + a
            } else if (/^(ne)$/.test(g)) {
                b.size.width = d.width + h;
                b.size.height = d.height + a;
                b.position.top = f.top - a
            } else {
                if (/^(sw)$/.test(g)) {
                    b.size.width = d.width + h;
                    b.size.height = d.height + a
                } else {
                    b.size.width = d.width + h;
                    b.size.height = d.height + a;
                    b.position.top = f.top - a
                }
                b.position.left = f.left - h
            }
        }
    });
    var m = function(b) {
        return parseInt(b, 10) || 0
    },
    l = function(b) {
        return ! isNaN(parseInt(b, 10))
    }
})(jQuery);

/*
 * jQuery UI Sortable 1.8.12
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
 (function(d) {
    d.widget("ui.sortable", d.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function() {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData("sortable-item");
            return this
        },
        _setOption: function(a, b) {
            if (a === "disabled") {
                this.options[a] =
                b;
                this.widget()[b ? "addClass": "removeClass"]("ui-sortable-disabled")
            } else d.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(a, b) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(a);
            var c = null,
            e = this;
            d(a.target).parents().each(function() {
                if (d.data(this, "sortable-item") == e) {
                    c = d(this);
                    return false
                }
            });
            if (d.data(a.target, "sortable-item") == e) c = d(a.target);
            if (!c) return false;
            if (this.options.handle && !b) {
                var f = false;
                d(this.options.handle, c).find("*").andSelf().each(function() {
                    if (this == a.target) f = true
                });
                if (!f) return false
            }
            this.currentItem = c;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(a, b, c) {
            b = this.options;
            var e = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(a);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left -
                this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            b.containment && this._setContainment();
            if (b.cursor) {
                if (d("body").css("cursor")) this._storedCursor = d("body").css("cursor");
                d("body").css("cursor", b.cursor)
            }
            if (b.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", b.opacity)
            }
            if (b.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", b.zIndex)
            }
            if (this.scrollParent[0] !=
            document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", a, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!c) for (c = this.containers.length - 1; c >= 0; c--) this.containers[c]._trigger("activate", a, e._uiHash(this));
            if (d.ui.ddmanager) d.ui.ddmanager.current = this;
            d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(a);
            return true
        },
        _mouseDrag: function(a) {
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var b = this.options,
                c = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - a.pageY < b.scrollSensitivity) this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + b.scrollSpeed;
                    else if (a.pageY - this.overflowOffset.top <
                    b.scrollSensitivity) this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - b.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - a.pageX < b.scrollSensitivity) this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + b.scrollSpeed;
                    else if (a.pageX - this.overflowOffset.left < b.scrollSensitivity) this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - b.scrollSpeed
                } else {
                    if (a.pageY - d(document).scrollTop() < b.scrollSensitivity) c = d(document).scrollTop(d(document).scrollTop() -
                    b.scrollSpeed);
                    else if (d(window).height() - (a.pageY - d(document).scrollTop()) < b.scrollSensitivity) c = d(document).scrollTop(d(document).scrollTop() + b.scrollSpeed);
                    if (a.pageX - d(document).scrollLeft() < b.scrollSensitivity) c = d(document).scrollLeft(d(document).scrollLeft() - b.scrollSpeed);
                    else if (d(window).width() - (a.pageX - d(document).scrollLeft()) < b.scrollSensitivity) c = d(document).scrollLeft(d(document).scrollLeft() + b.scrollSpeed)
                }
                c !== false && d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this,
                a)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (b = this.items.length - 1; b >= 0; b--) {
                c = this.items[b];
                var e = c.item[0],
                f = this._intersectsWithPointer(c);
                if (f) if (e != this.currentItem[0] && this.placeholder[f == 1 ? "next": "prev"]()[0] != e && !d.ui.contains(this.placeholder[0], e) && (this.options.type == "semi-dynamic" ? !d.ui.contains(this.element[0],
                e) : true)) {
                    this.direction = f == 1 ? "down": "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(c)) this._rearrange(a, c);
                    else break;
                    this._trigger("change", a, this._uiHash());
                    break
                }
            }
            this._contactContainers(a);
            d.ui.ddmanager && d.ui.ddmanager.drag(this, a);
            this._trigger("sort", a, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(a, b) {
            if (a) {
                d.ui.ddmanager && !this.options.dropBehaviour && d.ui.ddmanager.drop(this, a);
                if (this.options.revert) {
                    var c = this;
                    b = c.placeholder.offset();
                    c.reverting = true;
                    d(this.helper).animate({
                        left: b.left - this.offset.parent.left - c.margins.left + (this.offsetParent[0] == document.body ? 0: this.offsetParent[0].scrollLeft),
                        top: b.top - this.offset.parent.top - c.margins.top + (this.offsetParent[0] == document.body ? 0: this.offsetParent[0].scrollTop)
                    },
                    parseInt(this.options.revert, 10) || 500,
                    function() {
                        c._clear(a)
                    })
                } else this._clear(a, b);
                return false
            }
        },
        cancel: function() {
            var a = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") :
                this.currentItem.show();
                for (var b = this.containers.length - 1; b >= 0; b--) {
                    this.containers[b]._trigger("deactivate", null, a._uiHash(this));
                    if (this.containers[b].containerCache.over) {
                        this.containers[b]._trigger("out", null, a._uiHash(this));
                        this.containers[b].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                d.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? d(this.domPosition.prev).after(this.currentItem) : d(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function(a) {
            var b = this._getItemsAsjQuery(a && a.connected),
            c = [];
            a = a || {};
            d(b).each(function() {
                var e = (d(a.item || this).attr(a.attribute || "id") || "").match(a.expression || /(.+)[-=_](.+)/);
                if (e) c.push((a.key || e[1] + "[]") + "=" + (a.key && a.expression ? e[1] : e[2]))
            }); ! c.length && a.key && c.push(a.key + "=");
            return c.join("&")
        },
        toArray: function(a) {
            var b = this._getItemsAsjQuery(a && a.connected),
            c = [];
            a = a || {};
            b.each(function() {
                c.push(d(a.item || this).attr(a.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function(a) {
            var b = this.positionAbs.left,
            c = b + this.helperProportions.width,
            e = this.positionAbs.top,
            f = e + this.helperProportions.height,
            g = a.left,
            h = g + a.width,
            i = a.top,
            k = i + a.height,
            j = this.offset.click.top,
            l = this.offset.click.left;
            j = e + j > i && e + j < k && b + l > g && b + l < h;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers ||
            this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width": "height"] > a[this.floating ? "width": "height"] ? j: g < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < h && i < e + this.helperProportions.height / 2 && f - this.helperProportions.height / 2 < k
        },
        _intersectsWithPointer: function(a) {
            var b = d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height);
            a = d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width);
            b = b && a;
            a = this._getDragVerticalDirection();
            var c = this._getDragHorizontalDirection();
            if (!b) return false;
            return this.floating ? c && c == "right" || a == "down" ? 2: 1: a && (a == "down" ? 2: 1)
        },
        _intersectsWithSides: function(a) {
            var b = d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height);
            a = d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width);
            var c = this._getDragVerticalDirection(),
            e = this._getDragHorizontalDirection();
            return this.floating && e ? e == "right" && a || e == "left" && !a: c && (c == "down" && b || c == "up" && !b)
        },
        _getDragVerticalDirection: function() {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return a != 0 && (a > 0 ? "down": "up")
        },
        _getDragHorizontalDirection: function() {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a != 0 && (a > 0 ? "right": "left")
        },
        refresh: function(a) {
            this._refreshItems(a);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function(a) {
            var b = [],
            c = [],
            e = this._connectWith();
            if (e && a) for (a = e.length - 1; a >= 0; a--) for (var f = d(e[a]), g = f.length - 1; g >= 0; g--) {
                var h = d.data(f[g], "sortable");
                if (h && h != this && !h.options.disabled) c.push([d.isFunction(h.options.items) ? h.options.items.call(h.element) : d(h.options.items, h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), h])
            }
            c.push([d.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : d(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
            this]);
            for (a = c.length - 1; a >= 0; a--) c[a][0].each(function() {
                b.push(this)
            });
            return d(b)
        },
        _removeCurrentsFromItems: function() {
            for (var a = this.currentItem.find(":data(sortable-item)"), b = 0; b < this.items.length; b++) for (var c = 0; c < a.length; c++) a[c] == this.items[b].item[0] && this.items.splice(b, 1)
        },
        _refreshItems: function(a) {
            this.items = [];
            this.containers = [this];
            var b = this.items,
            c = [[d.isFunction(this.options.items) ? this.options.items.call(this.element[0], a, {
                item: this.currentItem
            }) : d(this.options.items, this.element),
            this]],
            e = this._connectWith();
            if (e) for (var f = e.length - 1; f >= 0; f--) for (var g = d(e[f]), h = g.length - 1; h >= 0; h--) {
                var i = d.data(g[h], "sortable");
                if (i && i != this && !i.options.disabled) {
                    c.push([d.isFunction(i.options.items) ? i.options.items.call(i.element[0], a, {
                        item: this.currentItem
                    }) : d(i.options.items, i.element), i]);
                    this.containers.push(i)
                }
            }
            for (f = c.length - 1; f >= 0; f--) {
                a = c[f][1];
                e = c[f][0];
                h = 0;
                for (g = e.length; h < g; h++) {
                    i = d(e[h]);
                    i.data("sortable-item", a);
                    b.push({
                        item: i,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(a) {
            if (this.offsetParent &&
            this.helper) this.offset.parent = this._getParentOffset();
            for (var b = this.items.length - 1; b >= 0; b--) {
                var c = this.items[b];
                if (! (c.instance != this.currentContainer && this.currentContainer && c.item[0] != this.currentItem[0])) {
                    var e = this.options.toleranceElement ? d(this.options.toleranceElement, c.item) : c.item;
                    if (!a) {
                        c.width = e.outerWidth();
                        c.height = e.outerHeight()
                    }
                    e = e.offset();
                    c.left = e.left;
                    c.top = e.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (b =
            this.containers.length - 1; b >= 0; b--) {
                e = this.containers[b].element.offset();
                this.containers[b].containerCache.left = e.left;
                this.containers[b].containerCache.top = e.top;
                this.containers[b].containerCache.width = this.containers[b].element.outerWidth();
                this.containers[b].containerCache.height = this.containers[b].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function(a) {
            var b = a || this,
            c = b.options;
            if (!c.placeholder || c.placeholder.constructor == String) {
                var e = c.placeholder;
                c.placeholder = {
                    element: function() {
                        var f =
                        d(document.createElement(b.currentItem[0].nodeName)).addClass(e || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!e) f.style.visibility = "hidden";
                        return f
                    },
                    update: function(f, g) {
                        if (! (e && !c.forcePlaceholderSize)) {
                            g.height() || g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10));
                            g.width() || g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") ||
                            0, 10))
                        }
                    }
                }
            }
            b.placeholder = d(c.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            c.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function(a) {
            for (var b = null, c = null, e = this.containers.length - 1; e >= 0; e--) if (!d.ui.contains(this.currentItem[0], this.containers[e].element[0])) if (this._intersectsWith(this.containers[e].containerCache)) {
                if (! (b && d.ui.contains(this.containers[e].element[0], b.element[0]))) {
                    b = this.containers[e];
                    c = e
                }
            } else if (this.containers[e].containerCache.over) {
                this.containers[e]._trigger("out",
                a, this._uiHash(this));
                this.containers[e].containerCache.over = 0
            }
            if (b) if (this.containers.length === 1) {
                this.containers[c]._trigger("over", a, this._uiHash(this));
                this.containers[c].containerCache.over = 1
            } else if (this.currentContainer != this.containers[c]) {
                b = 1E4;
                e = null;
                for (var f = this.positionAbs[this.containers[c].floating ? "left": "top"], g = this.items.length - 1; g >= 0; g--) if (d.ui.contains(this.containers[c].element[0], this.items[g].item[0])) {
                    var h = this.items[g][this.containers[c].floating ? "left": "top"];
                    if (Math.abs(h -
                    f) < b) {
                        b = Math.abs(h - f);
                        e = this.items[g]
                    }
                }
                if (e || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[c];
                    e ? this._rearrange(a, e, null, true) : this._rearrange(a, null, this.containers[c].element, true);
                    this._trigger("change", a, this._uiHash());
                    this.containers[c]._trigger("change", a, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[c]._trigger("over", a, this._uiHash(this));
                    this.containers[c].containerCache.over = 1
                }
            }
        },
        _createHelper: function(a) {
            var b =
            this.options;
            a = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a, this.currentItem])) : b.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            a.parents("body").length || d(b.appendTo != "parent" ? b.appendTo: this.currentItem[0].parentNode)[0].appendChild(a[0]);
            if (a[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (a[0].style.width ==
            "" || b.forceHelperSize) a.width(this.currentItem.width());
            if (a[0].style.height == "" || b.forceHelperSize) a.height(this.currentItem.height());
            return a
        },
        _adjustOffsetFromHelper: function(a) {
            if (typeof a == "string") a = a.split(" ");
            if (d.isArray(a)) a = {
                left: +a[0],
                top: +a[1] || 0
            };
            if ("left" in a) this.offset.click.left = a.left + this.margins.left;
            if ("right" in a) this.offset.click.left = this.helperProportions.width - a.right + this.margins.left;
            if ("top" in a) this.offset.click.top = a.top + this.margins.top;
            if ("bottom" in a) this.offset.click.top =
            this.helperProportions.height - a.bottom + this.margins.top
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && d.browser.msie) a =
            {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"),
                10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var a = this.options;
            if (a.containment == "parent") a.containment = this.helper[0].parentNode;
            if (a.containment == "document" || a.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, d(a.containment == "document" ?
            document: window).width() - this.helperProportions.width - this.margins.left, (d(a.containment == "document" ? document: window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(a.containment)) {
                var b = d(a.containment)[0];
                a = d(a.containment).offset();
                var c = d(b).css("overflow") != "hidden";
                this.containment = [a.left + (parseInt(d(b).css("borderLeftWidth"), 10) || 0) + (parseInt(d(b).css("paddingLeft"), 10) || 0) - this.margins.left, a.top + (parseInt(d(b).css("borderTopWidth"),
                10) || 0) + (parseInt(d(b).css("paddingTop"), 10) || 0) - this.margins.top, a.left + (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(d(b).css("borderLeftWidth"), 10) || 0) - (parseInt(d(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, a.top + (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(d(b).css("borderTopWidth"), 10) || 0) - (parseInt(d(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(a, b) {
            if (!b) b =
            this.position;
            a = a == "absolute" ? 1: -1;
            var c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            e = /(html|body)/i.test(c[0].tagName);
            return {
                top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - (d.browser.safari && this.cssPosition == "fixed" ? 0: (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0: c.scrollTop()) * a),
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - (d.browser.safari &&
                this.cssPosition == "fixed" ? 0: (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0: c.scrollLeft()) * a)
            }
        },
        _generatePosition: function(a) {
            var b = this.options,
            c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent: this.scrollParent,
            e = /(html|body)/i.test(c[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var f = a.pageX,
            g = a.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (a.pageX - this.offset.click.left < this.containment[0]) f = this.containment[0] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top < this.containment[1]) g = this.containment[1] + this.offset.click.top;
                    if (a.pageX - this.offset.click.left > this.containment[2]) f = this.containment[2] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top > this.containment[3]) g = this.containment[3] + this.offset.click.top
                }
                if (b.grid) {
                    g = this.originalPageY + Math.round((g -
                    this.originalPageY) / b.grid[1]) * b.grid[1];
                    g = this.containment ? !(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g: !(g - this.offset.click.top < this.containment[1]) ? g - b.grid[1] : g + b.grid[1] : g;
                    f = this.originalPageX + Math.round((f - this.originalPageX) / b.grid[0]) * b.grid[0];
                    f = this.containment ? !(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f: !(f - this.offset.click.left < this.containment[0]) ? f - b.grid[0] : f + b.grid[0] : f
                }
            }
            return {
                top: g -
                this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && this.cssPosition == "fixed" ? 0: this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0: c.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (d.browser.safari && this.cssPosition == "fixed" ? 0: this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0: c.scrollLeft())
            }
        },
        _rearrange: function(a, b, c, e) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0],
            this.direction == "down" ? b.item[0] : b.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter: 1;
            var f = this,
            g = this.counter;
            window.setTimeout(function() {
                g == f.counter && f.refreshPositions(!e)
            },
            0)
        },
        _clear: function(a, b) {
            this.reverting = false;
            var c = []; ! this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var e in this._storedCSS) if (this._storedCSS[e] == "auto" || this._storedCSS[e] == "static") this._storedCSS[e] =
                "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !b && c.push(function(f) {
                this._trigger("receive", f, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !b) c.push(function(f) {
                this._trigger("update", f, this._uiHash())
            });
            if (!d.ui.contains(this.element[0], this.currentItem[0])) {
                b || c.push(function(f) {
                    this._trigger("remove",
                    f, this._uiHash())
                });
                for (e = this.containers.length - 1; e >= 0; e--) if (d.ui.contains(this.containers[e].element[0], this.currentItem[0]) && !b) {
                    c.push(function(f) {
                        return function(g) {
                            f._trigger("receive", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]));
                    c.push(function(f) {
                        return function(g) {
                            f._trigger("update", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]))
                }
            }
            for (e = this.containers.length - 1; e >= 0; e--) {
                b || c.push(function(f) {
                    return function(g) {
                        f._trigger("deactivate", g, this._uiHash(this))
                    }
                }.call(this,
                this.containers[e]));
                if (this.containers[e].containerCache.over) {
                    c.push(function(f) {
                        return function(g) {
                            f._trigger("out", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]));
                    this.containers[e].containerCache.over = 0
                }
            }
            this._storedCursor && d("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "": this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!b) {
                    this._trigger("beforeStop",
                    a, this._uiHash());
                    for (e = 0; e < c.length; e++) c[e].call(this, a);
                    this._trigger("stop", a, this._uiHash())
                }
                return false
            }
            b || this._trigger("beforeStop", a, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!b) {
                for (e = 0; e < c.length; e++) c[e].call(this, a);
                this._trigger("stop", a, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            d.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function(a) {
            var b = a || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || d([]),
                position: b.position,
                originalPosition: b.originalPosition,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: a ? a.element: null
            }
        }
    });
    d.extend(d.ui.sortable, {
        version: "1.8.12"
    })
})(jQuery);
