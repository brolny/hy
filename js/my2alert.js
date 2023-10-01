/* nav menu on/off*/
function openNav() {
    document.getElementById("toc").style.width = "360px";
}
function closeNav() {
    document.getElementById("toc").style.width = "0";
}

/* open wiki page */
function getSelectedText() {
    var txt = '';
    if (window.getSelection) {
        txt = window.getSelection();
    } else if (window.document.getSelection) {
        txt = window.document.getSelection();
    } else if (window.document.selection) {
        txt = window.document.selection.createRange().text;
    }
    return txt;
}
$(function () {
    $(document.body).bind('mouseup', function () {
        var a = getSelectedText();
        a = a.toString().split('\n').join(' ').split(' ')[0];
        if (a !== '') {
            a = a.replace(/[^ա-և -]/gi, '').split(' ').join('').toLowerCase();
            a = a.replace(/ը$/, '');
            a = a.replace(/նն$/, 'ն');
            if (a !== '') {
                window.open('https://wiktionary.org/wiki/' + a, '_blank');
            }
        }
    });
})

/* to next and prev page links and set audio =OGG dir= */
function arrow() {
    var url = window.location.pathname,
        fn = Number(url.substring(url.lastIndexOf('/') + 1).replace('u', '').replace('.html', '')),
        fn1 = fn - 1,
        st1 = fn1.toString().padStart(2, '0'),
        fn2 = fn + 1,
        st2 = fn2.toString().padStart(2, '0'),
        navFile = '<a href="..\/ogg\/u' + st1 + '.html" title="Previous page">&emsp;⇚&emsp;<\/a>&emsp;';
    if (fn !== 108) {
        navFile = navFile + '&emsp;<a href="..\/ogg\/u' + st2 + '.html" title="Next page">&emsp;⇛&emsp;<\/a>';
    }
    navFile = '<hr \/><p class="c">' + navFile + '<\/p><hr \/>';
    document.getElementById("id02").innerHTML = navFile;
/* scroll to audio control */
    document.getElementById("my_ogg").currentTime = 10;
    $(document).ready(function () {
        $('html, body').animate({
            scrollTop: $('#my_ogg').offset().top
        }, 600);
    });
}

/* underline and IPA on/of */
function toggleShow2() {
    var i,
        x = document.querySelectorAll(".m"),
        l = x.length,
        xx = document.querySelectorAll(".i"),
        ll = xx.length,
        xxx = document.querySelectorAll(".d"),
        lll = xxx.length;
    for (i = 0; i < l; i++) {
        if (x[i].style["text-decoration"] == "none") {
            styleElement(x[i], "text-decoration", "underline firebrick");
        } else {
            styleElement(x[i], "text-decoration", "none");
        }
    }
    for (i = 0; i < ll; i++) {
        if (xx[i].style["text-decoration"] == "none") {
            styleElement(xx[i], "text-decoration", "double underline red");
        } else {
            styleElement(xx[i], "text-decoration", "none");
        }
    }
    for (i = 0; i < lll; i++) {
       if (xxx[i].style["text-decoration"] == "none") {
            styleElement(xxx[i], "text-decoration", "double underline DarkSlateGray");
        } else {
           styleElement(xxx[i], "text-decoration", "none");
        }
    }
}
function toggleShow() {
    var i,
        x = document.querySelectorAll(".zxx"),
        l = x.length;
    for (i = 0; i < l; i++) {
    if (x[i].style.display == "none") {
        styleElement(x[i], "display", "inline");
        } else {
            styleElement(x[i], "display", "none");
        }
    }
}
function styleElement(element, prop, val) {
    element.style.setProperty(prop, val);
}

/* menu */
$(document).ready(
    function () {
        $("body")
            .on('click', '[href*="#"]', function (e) {
                var fixed_offset = $("body > nav.menu")
                    .outerHeight(true);
                $('html,body')
                    .stop()
                    .animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 1000);
                e.preventDefault();
            });
        $(function () {
            var curlvl,
                startlvl = 0,
                prevlvl = startlvl,
                lst = $("#toc"),
                tmp2 = $("<p class='r'><a class='inl' href='javascript:void(0)' title='Закрыть меню' onclick='closeNav()'>&thinsp;✖&thinsp;</a></p><p class='c'><a class='inl' href='u00.html' title='all units of book'>&thinsp;⇚&thinsp;</a> <a class='inl' href='#top' title='top of page'>&thinsp;⇑&thinsp;</a> <a class='inl' href='javascript:void(0)' title='pronunciation' onclick=\"toggleShow()\">[ ]</a> <a class='inl' href='javascript:void(0)' title='subject + predicate' onclick=\"toggleShow2()\">&thinsp;≡&thinsp;</a><hr class='h' />"),
                href1 = window.location.href,
                href2 = href1.replace(window.location.hash, "");
            lst.append(tmp2);
            if (typeof lst !== "undefined") {
                $(".text_read h2, .text_read h3")
                    .each(function (i) {
                        var current = $(this);
                        current.attr("id", "title" + i);
                        for (curlvl = parseInt(current.prop("tagName")
                                .substring(1), 10) - 1; curlvl > prevlvl; prevlvl++) {
                            var tmp = $("<ul></ul>");
                            if (prevlvl == startlvl) {
                                lst.append(tmp);
                            } else {
                                var last_li = $("#toc li")
                                    .last();
                                last_li.append(tmp);
                            }
                            if (curlvl > prevlvl + 1) {
                                tmp.append("<li></li>");
                            }
                            lst = tmp;
                        }
                        while (curlvl < prevlvl) {
                            lst = lst.parent()
                                .parent();
                            prevlvl--;
                        }
                        curder = current.html();
                        if (curder.charAt(curder.length - 1) == ':') {
                            curder = curder.substr(0, curder.length - 1);
                        }
                        curder = curder.replace("•", "Текст для чтения");
                        curder = curder.replace("<br>", "@@@").replace("<br />", "@@@").replace("<br/>", "@@@");
                        if (curder.indexOf('@@@') > 0) {
                            curder = curder.substr(0, curder.indexOf('@@@'));
                        }
                        lst.append("<li><a id='link" + i + "' itemprop='url' href='" + href2 + "#title" + i + "'>" + curder.trim() + "</a></li>");
                    });
            }
        });
    }
);

/* prepare data for small quize */
Array.prototype.shuffle = function () {
    var i = this.length,
        j,
        t;
    while (i) {
        j = Math.floor((i--) * Math.random());
        t = this[i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function unique(a) {
    var obj = {},
        i,
        str;
    for (i = 0; i < a.length; i++) {
        str = a[i];
        obj[str] = true;
    }
    return Object.keys(obj)
}

function ran(max) {
    return Math.floor(Math.random() * max);
}

function MakeList(arr, aLL, ii, ital, ord) {
    var i2 = "<\/span><\/button>",
        i1,
        d1,
        d2,
        d3,
        d4,
        d5,
        b;
    if (ital != "") {
        i1 = "<span lang='hy' class='n'>";
    } else {
        i1 = "<span lang='en'>";
    }
    d1 = ran(aLL);
    if (d1 == ii) {d1 = 0; }
    d2 = ran(aLL);
    if (d2 == ii) {d2 = 0; }
    d3 = ran(aLL);
    if (d3 == ii) {d3 = 0; }
    d4 = ran(aLL);
    if (d4 == ii) {d4 = 0; }
    d5 = ran(aLL);
    if (d5 == ii) {d5 = 0; }
    b = ["<button onclick='z(\"" + arr[ii][ord] + "\")'>" + i1 +  arr[ii][ord].split('*').join('') + i2, "<button onclick='g(\"" + arr[ii][ord] + "\",\"" + arr[d1] + "\",\"" + arr[ii] + "\")'>" + i1 + arr[d1][ord].split('*').join('') + i2,  "<button onclick='g(\"" + arr[ii][ord] + "\",\"" + arr[d2] + "\",\"" + arr[ii] + "\")'>" + i1 + arr[d2][ord].split('*').join('') + i2,  "<button onclick='g(\"" + arr[ii][ord] + "\",\"" + arr[d3] + "\",\"" + arr[ii] + "\")'>" + i1 + arr[d3][ord].split('*').join('') + i2,  "<button onclick='g(\"" + arr[ii][ord] + "\",\"" + arr[d4] + "\",\"" + arr[ii] + "\")'>" + i1 + arr[d4][ord].split('*').join('') + i2,  "<button onclick='g(\"" + arr[ii][ord] + "\",\"" + arr[d5] + "\",\"" + arr[ii] + "\")'>" + i1 + arr[d5][ord].split('*').join('') + i2];
    b.shuffle();
    b = unique(b);
    return b;
}

/* array of errors in quiz */
var erro = [];
var ernu = 0;
function g(evt, a, aa) {
    erro.push(a);
    erro.push(aa);
    document.getElementById(evt).style.backgroundColor = "#ffd1dc";
}

function z(a) {
    if (document.getElementById(a) !== null) {
        document.getElementById(a).parentNode.removeChild(document.getElementById(a));
        ernu = ernu - 1;
    }
    if (ernu == 0) {
        var yy = '',
            vv = '',
            i,
            k = [];
        erro = unique(erro);
        for (i = 0; i < erro.length; i++) {
            k = erro[i].split(",");
            yy = yy + "<p><span lang='hy'>" + k[0] + "<\/span>" + k[1] + "<\/p>";
            vv = vv + "<p>" + k[1] + " – <span lang='hy' class='n'>" + k[0] + "<\/span><\/p>";
        }
        if (yy != '') {
            yy = "<h4><span lang='ru'>Ошибки</span><br><span lang='en'>Errors<\/span><br><span lang='hy' class='n'>Սխալներ<\/span><\/h4><p class='z'><span lang='en'>HY<\/span><\/p>" + yy + "<\/p><hr \/>" + vv;
        }
    document.getElementById("id01").innerHTML = yy;
    document.body.scrollIntoView(false);
    }
}

/* quiz short*/
function tt() {
    if (typeof u == 'undefined') {
        alert("Quiz not possible.");
        return;
    }
    var aL = u.length,
        s = "",
        ss = "",
        i,
        j,
        bbb;
    ernu = aL - 1;
    erro = [];
    u.shuffle();
    for (i = 1; i < aL; i++) {
        bbb = MakeList(u, aL, i, "", 1);
        ss = "";
        for (j = 0; j < bbb.length; j++) {
            ss += bbb[j];
        }
        s += "<div class='sh' id='" + u[i][1] + "'><p><span lang='hy'>" + u[i][0].split('*').join('') + "<\/span><span class='zxx' lang='zxx'>" + u[i][2] + "</span><\/p><p class='bu'>" + ss + "<\/p><\/div>";
    }
    document.getElementById("id01").innerHTML = s;
    document.body.scrollIntoView(false);
}

function tttt() {
    if (typeof u == 'undefined') {
        alert("Quiz not possible.");
        return;
    }
    var aL = u.length,
        ss = "",
        s = "",
        i,
        j,
        bbb;
    ernu = aL - 1;
    erro = []
    u.shuffle();
    for (i = 1; i < aL; i++) {
        bbb = MakeList(u, aL, i, "i", 0);
        ss = "";
        for (j = 0; j < bbb.length; j++) {
            ss += bbb[j];
        }
        s += "<div class='sh' id='" + u[i][0] + "'><p>" + u[i][1].split('*').join('') + "<\/p><p class='bu'>" + ss + "<\/p><\/div>";
    }
    document.getElementById("id01").innerHTML = s;
    document.body.scrollIntoView(false);
}

/* quiz long */
function dd() {
    if (typeof uu == 'undefined') {
        alert("Quiz not possible.");
        return;
    }
    var aL = uu.length,
        s = "",
        j,
        i,
        bbb,
        ss = "";
    ernu = aL - 1;
    erro = []
    uu.shuffle();
    for (i = 1; i < aL; i++) {
        bbb = MakeList(uu, aL, i, "", 1);
        ss = "";
        for (j = 0; j < bbb.length; j++) {
            ss += bbb[j];
        }
        s += "<div class='sh' id='" + uu[i][1] + "'><p><span lang='hy' class='n'>" + uu[i][0].split('*').join('') + "<\/span><p\/><p class='bu'>" + ss + "<\/p><\/div>";
    }
    document.getElementById("id01").innerHTML = s;
    document.body.scrollIntoView(false);
}

function dddd() {
    if (typeof uu == 'undefined') {
        alert("Quiz not possible.");
        return;
    }
    var aL = uu.length,
        s = "",
        i,
        j,
        bbb,
        ss = "";
    ernu = aL - 1;
    erro = []
    uu.shuffle();
    for (i = 1; i < aL; i++) {
        bbb = MakeList(uu, aL, i, "i", 0);
        ss = "";
        for (j = 0; j < bbb.length; j++) {
            ss += bbb[j];
        }
        s += "<div class='sh' id='" + uu[i][0] + "'><p>" + uu[i][1].split('*').join('') + "<p\/><p class='bu'>" + ss + "<\/p><\/div>";
    }
    document.getElementById("id01").innerHTML = s;
    document.body.scrollIntoView(false);
}