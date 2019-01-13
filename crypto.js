function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
function generateRandomCode() {
    var letters = [];
    for (var i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(i+65));
    }
    code = [];
    while (letters.length > 0) {
      var index = Math.floor(Math.random()*letters.length);
      var c = letters.splice(index, 1);
      code.push(c);
    }
    return code;
}
function translate(m, k) {
  var t = "";
  for (var i in m) {
    var j = (m.charCodeAt(i) - 65);
    var c = k[j];
    if (c == undefined) c = m[i];
    t = t.concat(c);
  }
  return t;
}
function sp(color=null, bgcolor=null) {
  if (color == null & bgcolor == null) {
    return "";
  }
  if (color != null & bgcolor == null) {
    return "<span style=\"color: " + color + "\">";
  }
  if (color == null & bgcolor != null) {
    return "<span style=\"background-color: " + bgcolor + "\">";
  }
  if (color != null & bgcolor != null) {
    return "<span style=\"color: " + color + "; background-color: " + bgcolor + "\">";
  }
}
function csp() {
  return "</span>";
}
function generateRandomMessageId() {
  var id = "";
  while (id.length < 8) {
    var j = (Math.round(Math.random()*36-0.5) + 48);
    if (j > 57) { j += 6; }
    id = id.concat(String.fromCharCode(j));
  }
  return id;
}
function updateScreen() {
  TRANSLATION = [];
  var i = 0; while (i < 9) { TRANSLATION.push(translate(CODEDMESSAGE[i], ANSWER)); i++; }

  // DEBUG: DRAW LEFT MENU
  var i = 3;
  while (i < 29) {
    var color = (i-3) == SELECTED_LETTER ? "#BFBFBF" : "#FFFFFF";
    SCREEN[i] = sp(color,color) + "- "
    + sp("#7F7FFF") + ANSWER[i-3] + csp() + " "
    + sp("#000000") + String.fromCharCode(i+62) + csp() + " "
    + sp("#FF0000") + " " + pad(LETTERCOUNT[i-3], 2) + csp() + " &nbsp" + csp() + "&nbsp;&nbsp;&nbsp;";
    i++;
  }

  // DEBUG: DRAW CODEDMESSAGE
  var i = 0;
  while (i < 9) {
    j = 3 + i*3;
    SCREEN[j] = SCREEN[j] + CODEDMESSAGE[i];
    i++;
  }

  // DEBUG: DRAW TRANSLATION
  var i = 0;
  while (i < 9) {
    j = 4 + i*3;
    SCREEN[j] = SCREEN[j] + sp("#7F7FFF") + TRANSLATION[i] + csp();
    i++;
  }

  document.getElementById("screen").innerHTML = SCREEN.join("<br>");
}


var listener = new window.keypress.Listener();

// NOTE: MESSAGE LIMIT - 9 LINES, 75 CHARACTERS PER LINE
SCREEN = [];
MESSAGE = [];
CODE = [];
CODEDMESSAGE = [];
ANSWER = [];
TRANSLATION = [];
LETTERCOUNT = [];
SELECTED_LETTER = null;

MESSAGE.push("ORIGINALLY DEVELOPED IN 1991 BY FINNISH PROGRAMMER LINUS TORVALDS, LINUX IS");
MESSAGE.push("AN EXCEPTIONALLY ROBUST AND RELIABLE KERNEL, WHICH COMBINED WITH THE GNU SY");
MESSAGE.push("STEM IS MOST COMMONLY USED FOR INTERNET SERVERS, MOBILE PHONES AND TABLETS.");
MESSAGE.push("ADDITIONALLY, THE USE OF LINUX AS AN ALTERNATIVE OPERATING SYSTEM FOR PERSO");
MESSAGE.push("NAL COMPUTERS, SUCH AS DESKTOPS AND LAPTOPS, HAS ALSO BEEN GROWING OVER THE");
MESSAGE.push("YEARS, WITH SEVERAL MILLION USERS HAVING ALREADY DISCOVERED ITS BENEFITS.");
MESSAGE.push("");
MESSAGE.push("");
MESSAGE.push("");

CODE = generateRandomCode();

var i = 0; while (i < 9) { CODEDMESSAGE.push(translate(MESSAGE[i], CODE)); i++; }

var i = 0; while (i < 26) { ANSWER.push("&nbsp;"); i++; }

var i = 0; while (i < 32) { SCREEN.push(""); i++; }

var i = 0; while (i < 26) { LETTERCOUNT.push(0); i++; }
var i = 0; while (i < 9) {
  for (c of CODEDMESSAGE[i]) {
    var j = (c.charCodeAt(0) - 65);
    if (j >= 0 && j < 26) LETTERCOUNT[j]++;
  }
  i++;
}

// DEBUG: DRAW STATIC STUFF
SCREEN[00] = sp(null,"#000000") +
">>>>>>>>>>>>>>> ARARA'S HIDDEN OPS - CRYPTO WORKBENCH - MESSAGE #"
+ generateRandomMessageId() + " <<<<<<<<<<<<<<<<<" + csp();
SCREEN[02] = sp("#FFFFFF","#FFFFFF") + "----------" + csp();
SCREEN[29] = sp("#FFFFFF","#FFFFFF") + "----------" + csp();
SCREEN[31] = sp(null,"#7F0000") +
"&nbsp;[C]LEAR | [H]INT | BUY [S]ID MEIER'S COVERT ACTION | ARARA ON [T]WITTER"
+ " | [Q]UACK.COM.BR&nbsp;&nbsp;" + csp();

updateScreen();

// ===========================================

function getLetter(e) {
  var keyCode = e.keyCode - 65;
  if (keyCode >= 0 && keyCode <= 26) {
    if (SELECTED_LETTER == null) {
      SELECTED_LETTER = keyCode;
    } else {
      ANSWER[SELECTED_LETTER] = e.key.toUpperCase();
      SELECTED_LETTER = null;
    }
  }
  else if (e.keyCode == 27 && SELECTED_LETTER != null) {
    SELECTED_LETTER = null;
  }
  else if ((e.keyCode == 46 || e.keyCode == 8) && SELECTED_LETTER != null) {
    ANSWER[SELECTED_LETTER] = "&nbsp;";
    SELECTED_LETTER = null;
  }
  updateScreen();
}

document.addEventListener('keydown', getLetter)

var kplistener = new window.keypress.Listener();
kplistener.simple_combo("meta c", function() {
    ANSWER = [];
    var i = 0; while (i < 26) { ANSWER.push("&nbsp;"); i++; }
    updateScreen();
});
kplistener.simple_combo("meta h", function() {
    window.alert("ONLY TRUST YOUR FISTS\nPOLICE WILL NEVER HELP YOU");
});
kplistener.simple_combo("meta t", function() {
    window.open("http://www.twitter.com/arara_");
});
kplistener.simple_combo("meta s", function() {
    window.open("https://store.steampowered.com/app/327390/Sid_Meiers_Covert_Action_Classic/");
});
kplistener.simple_combo("meta q", function() {
  window.open("http://quack.com.br/");
});
