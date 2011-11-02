var edButtons = new Array(),
edLinks = new Array(),
edOpenTags = new Array(),
now = new Date(),
datetime;
function edButton(f, e, c, b, a, d) {
    this.id = f;
    this.display = e;
    this.tagStart = c;
    this.tagEnd = b;
    this.access = a;
    this.open = d
}
function zeroise(b, a) {
    var c = b.toString();
    if (b < 0) {
        c = c.substr(1, c.length)
    }
    while (c.length < a) {
        c = "0" + c
    }
    if (b < 0) {
        c = "-" + c
    }
    return c
}
datetime = now.getUTCFullYear() + "-" + zeroise(now.getUTCMonth() + 1, 2) + "-" + zeroise(now.getUTCDate(), 2) + "T" + zeroise(now.getUTCHours(), 2) + ":" + zeroise(now.getUTCMinutes(), 2) + ":" + zeroise(now.getUTCSeconds(), 2) + "+00:00";
edButtons[edButtons.length] = new edButton("ed_strong", "b", "<strong>", "</strong>", "b");
edButtons[edButtons.length] = new edButton("ed_em", "i", "<em>", "</em>", "i");
edButtons[edButtons.length] = new edButton("ed_link", "link", "", "</a>", "a");
edButtons[edButtons.length] = new edButton("ed_block", "b-quote", "\n\n<blockquote>", "</blockquote>\n\n", "q");
edButtons[edButtons.length] = new edButton("ed_del", "del", '<del datetime="' + datetime + '">', "</del>", "d");
edButtons[edButtons.length] = new edButton("ed_ins", "ins", '<ins datetime="' + datetime + '">', "</ins>", "s");
edButtons[edButtons.length] = new edButton("ed_img", "img", "", "", "m", -1);
edButtons[edButtons.length] = new edButton("ed_ul", "ul", "<ul>\n", "</ul>\n\n", "u");
edButtons[edButtons.length] = new edButton("ed_ol", "ol", "<ol>\n", "</ol>\n\n", "o");
edButtons[edButtons.length] = new edButton("ed_li", "li", "\t<li>", "</li>\n", "l");
edButtons[edButtons.length] = new edButton("ed_code", "code", "<code>", "</code>", "c");
edButtons[edButtons.length] = new edButton("ed_more", "more", "<!--more-->", "", "t", -1);
function edLink() {
    this.display = "";
    this.URL = "";
    this.newWin = 0
}
edLinks[edLinks.length] = new edLink("WordPress", "http://wordpress.org/");
edLinks[edLinks.length] = new edLink("alexking.org", "http://www.alexking.org/");
function edShowButton(b, a) {
    if (b.id == "ed_img") {
        document.write('<input type="button" id="' + b.id + '" accesskey="' + b.access + '" class="ed_button" onclick="edInsertImage(edCanvas);" value="' + b.display + '" />')
    } else {
        if (b.id == "ed_link") {
            document.write('<input type="button" id="' + b.id + '" accesskey="' + b.access + '" class="ed_button" onclick="edInsertLink(edCanvas, ' + a + ');" value="' + b.display + '" />')
        } else {
            document.write('<input type="button" id="' + b.id + '" accesskey="' + b.access + '" class="ed_button" onclick="edInsertTag(edCanvas, ' + a + ');" value="' + b.display + '"  />')
        }
    }
}
function edShowLinks() {
    var a = '<select onchange="edQuickLink(this.options[this.selectedIndex].value, this);"><option value="-1" selected>' + quicktagsL10n.quickLinks + "</option>",
    b;
    for (b = 0; b < edLinks.length; b++) {
        a += '<option value="' + b + '">' + edLinks[b].display + "</option>"
    }
    a += "</select>";
    document.write(a)
}
function edAddTag(a) {
    if (edButtons[a].tagEnd != "") {
        edOpenTags[edOpenTags.length] = a;
        document.getElementById(edButtons[a].id).value = "/" + document.getElementById(edButtons[a].id).value
    }
}
function edRemoveTag(b) {
    for (var a = 0; a < edOpenTags.length; a++) {
        if (edOpenTags[a] == b) {
            edOpenTags.splice(a, 1);
            document.getElementById(edButtons[b].id).value = document.getElementById(edButtons[b].id).value.replace("/", "")
        }
    }
}
function edCheckOpenTags(c) {
    var a = 0,
    b;
    for (b = 0; b < edOpenTags.length; b++) {
        if (edOpenTags[b] == c) {
            a++
        }
    }
    if (a > 0) {
        return true
    } else {
        return false
    }
}
function edCloseAllTags() {
    var a = edOpenTags.length,
    b;
    for (b = 0; b < a; b++) {
        edInsertTag(edCanvas, edOpenTags[edOpenTags.length - 1])
    }
}
function edQuickLink(c, d) {
    if (c > -1) {
        var b = "",
        a;
        if (edLinks[c].newWin == 1) {
            b = ' target="_blank"'
        }
        a = '<a href="' + edLinks[c].URL + '"' + b + ">" + edLinks[c].display + "</a>";
        d.selectedIndex = 0;
        edInsertContent(edCanvas, a)
    } else {
        d.selectedIndex = 0
    }
}
function edSpell(c) {
    var e = "",
    d,
    b,
    a;
    if (document.selection) {
        c.focus();
        d = document.selection.createRange();
        if (d.text.length > 0) {
            e = d.text
        }
    } else {
        if (c.selectionStart || c.selectionStart == "0") {
            b = c.selectionStart;
            a = c.selectionEnd;
            if (b != a) {
                e = c.value.substring(b, a)
            }
        }
    }
    if (e == "") {
        e = prompt(quicktagsL10n.wordLookup, "")
    }
    if (e !== null && /^\w[\w ]*$/.test(e)) {
        window.open("http://www.answers.com/" + escape(e))
    }
}
function edToolbar() {
    document.write('<div id="ed_toolbar">');
    for (var a = 0; a < edButtons.length; a++) {
        edShowButton(edButtons[a], a)
    }
    document.write('<input type="button" id="ed_spell" class="ed_button" onclick="edSpell(edCanvas);" title="' + quicktagsL10n.dictionaryLookup + '" value="' + quicktagsL10n.lookup + '" />');
    document.write('<input type="button" id="ed_close" class="ed_button" onclick="edCloseAllTags();" title="' + quicktagsL10n.closeAllOpenTags + '" value="' + quicktagsL10n.closeTags + '" />');
    document.write('<input type="button" id="ed_fullscreen" class="ed_button" onclick="fullscreen.on();" title="' + quicktagsL10n.toggleFullscreen + '" value="' + quicktagsL10n.fullscreen + '" />');
    document.write("</div>")
}
function edInsertTag(d, c) {
    if (document.selection) {
        d.focus();
        var e = document.selection.createRange();
        if (e.text.length > 0) {
            e.text = edButtons[c].tagStart + e.text + edButtons[c].tagEnd
        } else {
            if (!edCheckOpenTags(c) || edButtons[c].tagEnd == "") {
                e.text = edButtons[c].tagStart;
                edAddTag(c)
            } else {
                e.text = edButtons[c].tagEnd;
                edRemoveTag(c)
            }
        }
        d.focus()
    } else {
        if (d.selectionStart || d.selectionStart == "0") {
            var b = d.selectionStart,
            a = d.selectionEnd,
            g = a,
            f = d.scrollTop;
            if (b != a) {
                d.value = d.value.substring(0, b) + edButtons[c].tagStart + d.value.substring(b, a) + edButtons[c].tagEnd + d.value.substring(a, d.value.length);
                g += edButtons[c].tagStart.length + edButtons[c].tagEnd.length
            } else {
                if (!edCheckOpenTags(c) || edButtons[c].tagEnd == "") {
                    d.value = d.value.substring(0, b) + edButtons[c].tagStart + d.value.substring(a, d.value.length);
                    edAddTag(c);
                    g = b + edButtons[c].tagStart.length
                } else {
                    d.value = d.value.substring(0, b) + edButtons[c].tagEnd + d.value.substring(a, d.value.length);
                    edRemoveTag(c);
                    g = b + edButtons[c].tagEnd.length
                }
            }
            d.focus();
            d.selectionStart = g;
            d.selectionEnd = g;
            d.scrollTop = f
        } else {
            if (!edCheckOpenTags(c) || edButtons[c].tagEnd == "") {
                d.value += edButtons[c].tagStart;
                edAddTag(c)
            } else {
                d.value += edButtons[c].tagEnd;
                edRemoveTag(c)
            }
            d.focus()
        }
    }
}
function edInsertContent(d, c) {
    var e,
    b,
    a,
    f;
    if (document.selection) {
        d.focus();
        e = document.selection.createRange();
        e.text = c;
        d.focus()
    } else {
        if (d.selectionStart || d.selectionStart == "0") {
            b = d.selectionStart;
            a = d.selectionEnd;
            f = d.scrollTop;
            d.value = d.value.substring(0, b) + c + d.value.substring(a, d.value.length);
            d.focus();
            d.selectionStart = b + c.length;
            d.selectionEnd = b + c.length;
            d.scrollTop = f
        } else {
            d.value += c;
            d.focus()
        }
    }
}
function edInsertLink(d, c, b) {
    if ("object" == typeof(wpLink)) {
        wpLink.open()
    } else {
        if (!b) {
            b = "http://"
        }
        if (!edCheckOpenTags(c)) {
            var a = prompt(quicktagsL10n.enterURL, b);
            if (a) {
                edButtons[c].tagStart = '<a href="' + a + '">';
                edInsertTag(d, c)
            }
        } else {
            edInsertTag(d, c)
        }
    }
}
function edInsertImage(b) {
    var a = prompt(quicktagsL10n.enterImageURL, "http://");
    if (a) {
        a = '<img src="' + a + '" alt="' + prompt(quicktagsL10n.enterImageDescription, "") + '" />';
        edInsertContent(b, a)
    }
}
var QTags = function(a, c, b, f) {
    var j = this,
    k = document.getElementById(b),
    g,
    l,
    e,
    h,
    d;
    j.Buttons = [];
    j.Links = [];
    j.OpenTags = [];
    j.Canvas = document.getElementById(c);
    if (!j.Canvas || !k) {
        return
    }
    f = (typeof f != "undefined") ? "," + f + ",": "";
    j.edShowButton = function(n, m) {
        if (f && (f.indexOf("," + n.display + ",") != -1)) {
            return ""
        } else {
            if (n.id == a + "_img") {
                return '<input type="button" id="' + n.id + '" accesskey="' + n.access + '" class="ed_button" onclick="edInsertImage(' + a + '.Canvas);" value="' + n.display + '" />'
            } else {
                if (n.id == a + "_link") {
                    return '<input type="button" id="' + n.id + '" accesskey="' + n.access + '" class="ed_button" onclick="' + a + ".edInsertLink(" + m + ');" value="' + n.display + '" />'
                } else {
                    return '<input type="button" id="' + n.id + '" accesskey="' + n.access + '" class="ed_button" onclick="' + a + ".edInsertTag(" + m + ');" value="' + n.display + '" />'
                }
            }
        }
    };
    j.edAddTag = function(i) {
        if (j.Buttons[i].tagEnd != "") {
            j.OpenTags[j.OpenTags.length] = i;
            document.getElementById(j.Buttons[i].id).value = "/" + document.getElementById(j.Buttons[i].id).value
        }
    };
    j.edRemoveTag = function(i) {
        for (g = 0; g < j.OpenTags.length; g++) {
            if (j.OpenTags[g] == i) {
                j.OpenTags.splice(g, 1);
                document.getElementById(j.Buttons[i].id).value = document.getElementById(j.Buttons[i].id).value.replace("/", "")
            }
        }
    };
    j.edCheckOpenTags = function(n) {
        l = 0;
        for (var m = 0; m < j.OpenTags.length; m++) {
            if (j.OpenTags[m] == n) {
                l++
            }
        }
        if (l > 0) {
            return true
        } else {
            return false
        }
    };
    this.edCloseAllTags = function() {
        var i = j.OpenTags.length;
        for (var m = 0; m < i; m++) {
            j.edInsertTag(j.OpenTags[j.OpenTags.length - 1])
        }
    };
    this.edQuickLink = function(o, p) {
        if (o > -1) {
            var n = "",
            m;
            if (Links[o].newWin == 1) {
                n = ' target="_blank"'
            }
            m = '<a href="' + Links[o].URL + '"' + n + ">" + Links[o].display + "</a>";
            p.selectedIndex = 0;
            edInsertContent(j.Canvas, m)
        } else {
            p.selectedIndex = 0
        }
    };
    j.edInsertTag = function(o) {
        if (document.selection) {
            j.Canvas.focus();
            d = document.selection.createRange();
            if (d.text.length > 0) {
                d.text = j.Buttons[o].tagStart + d.text + j.Buttons[o].tagEnd
            } else {
                if (!j.edCheckOpenTags(o) || j.Buttons[o].tagEnd == "") {
                    d.text = j.Buttons[o].tagStart;
                    j.edAddTag(o)
                } else {
                    d.text = j.Buttons[o].tagEnd;
                    j.edRemoveTag(o)
                }
            }
            j.Canvas.focus()
        } else {
            if (j.Canvas.selectionStart || j.Canvas.selectionStart == "0") {
                var n = j.Canvas.selectionStart,
                m = j.Canvas.selectionEnd,
                q = m,
                p = j.Canvas.scrollTop;
                if (n != m) {
                    j.Canvas.value = j.Canvas.value.substring(0, n) + j.Buttons[o].tagStart + j.Canvas.value.substring(n, m) + j.Buttons[o].tagEnd + j.Canvas.value.substring(m, j.Canvas.value.length);
                    q += j.Buttons[o].tagStart.length + j.Buttons[o].tagEnd.length
                } else {
                    if (!j.edCheckOpenTags(o) || j.Buttons[o].tagEnd == "") {
                        j.Canvas.value = j.Canvas.value.substring(0, n) + j.Buttons[o].tagStart + j.Canvas.value.substring(m, j.Canvas.value.length);
                        j.edAddTag(o);
                        q = n + j.Buttons[o].tagStart.length
                    } else {
                        j.Canvas.value = j.Canvas.value.substring(0, n) + j.Buttons[o].tagEnd + j.Canvas.value.substring(m, j.Canvas.value.length);
                        j.edRemoveTag(o);
                        q = n + j.Buttons[o].tagEnd.length
                    }
                }
                j.Canvas.focus();
                j.Canvas.selectionStart = q;
                j.Canvas.selectionEnd = q;
                j.Canvas.scrollTop = p
            } else {
                if (!j.edCheckOpenTags(o) || j.Buttons[o].tagEnd == "") {
                    j.Canvas.value += Buttons[o].tagStart;
                    j.edAddTag(o)
                } else {
                    j.Canvas.value += Buttons[o].tagEnd;
                    j.edRemoveTag(o)
                }
                j.Canvas.focus()
            }
        }
    };
    this.edInsertLink = function(o, n) {
        if (!n) {
            n = "http://"
        }
        if (!j.edCheckOpenTags(o)) {
            var m = prompt(quicktagsL10n.enterURL, n);
            if (m) {
                j.Buttons[o].tagStart = '<a href="' + m + '">';
                j.edInsertTag(o)
            }
        } else {
            j.edInsertTag(o)
        }
    };
    this.edInsertImage = function() {
        var i = prompt(quicktagsL10n.enterImageURL, "http://");
        if (i) {
            i = '<img src="' + i + '" alt="' + prompt(quicktagsL10n.enterImageDescription, "") + '" />';
            edInsertContent(j.Canvas, i)
        }
    };
    j.Buttons[j.Buttons.length] = new edButton(a + "_strong", "b", "<strong>", "</strong>", "b");
    j.Buttons[j.Buttons.length] = new edButton(a + "_em", "i", "<em>", "</em>", "i");
    j.Buttons[j.Buttons.length] = new edButton(a + "_link", "link", "", "</a>", "a");
    j.Buttons[j.Buttons.length] = new edButton(a + "_block", "b-quote", "\n\n<blockquote>", "</blockquote>\n\n", "q");
    j.Buttons[j.Buttons.length] = new edButton(a + "_del", "del", '<del datetime="' + datetime + '">', "</del>", "d");
    j.Buttons[j.Buttons.length] = new edButton(a + "_ins", "ins", '<ins datetime="' + datetime + '">', "</ins>", "s");
    j.Buttons[j.Buttons.length] = new edButton(a + "_img", "img", "", "", "m", -1);
    j.Buttons[j.Buttons.length] = new edButton(a + "_ul", "ul", "<ul>\n", "</ul>\n\n", "u");
    j.Buttons[j.Buttons.length] = new edButton(a + "_ol", "ol", "<ol>\n", "</ol>\n\n", "o");
    j.Buttons[j.Buttons.length] = new edButton(a + "_li", "li", "\t<li>", "</li>\n", "l");
    j.Buttons[j.Buttons.length] = new edButton(a + "_code", "code", "<code>", "</code>", "c");
    j.Buttons[j.Buttons.length] = new edButton(a + "_more", "more", "<!--more-->", "", "t", -1);
    e = document.createElement("div");
    e.id = a + "_qtags";
    h = '<div id="' + a + '_toolbar">';
    for (g = 0; g < j.Buttons.length; g++) {
        h += j.edShowButton(j.Buttons[g], g)
    }
    h += '<input type="button" id="' + a + '_ed_spell" class="ed_button" onclick="edSpell(' + a + '.Canvas);" title="' + quicktagsL10n.dictionaryLookup + '" value="' + quicktagsL10n.lookup + '" />';
    h += '<input type="button" id="' + a + '_ed_close" class="ed_button" onclick="' + a + '.edCloseAllTags();" title="' + quicktagsL10n.closeAllOpenTags + '" value="' + quicktagsL10n.closeTags + '" /></div>';
    e.innerHTML = h;
    k.parentNode.insertBefore(e, k)
};
﻿