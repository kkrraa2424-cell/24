/* =================================
   ARCHIVE 24
   SECRET CODE SYSTEM
================================= */


/* ================================
   رموز الدخول
================================ */

const CONFIG = {

  accessCode: "246824",

  ownerCode: "240924"

};


/* ================================
   جدول الشفرة الخاص بك
================================ */

const codeTable = {

  "ا": "2324",
  "ب": "3745",
  "ت": "1417",
  "ث": "2633",
  "ج": "2034",
  "ح": "4556",
  "خ": "1721",
  "د": "3541",
  "ذ": "1112",
  "ر": "2935",
  "ز": "4256",
  "س": "1923",
  "ش": "2835",
  "ص": "2631",
  "ض": "4750",
  "ط": "1620",
  "ظ": "2932",
  "ع": "3841",
  "غ": "1115",
  "ف": "3944",
  "ق": "2326",
  "ك": "3136",
  "ل": "4550",
  "م": "1517",
  "ن": "3440",
  "هـ": "2124",
  "و": "4135",
  "ي": "2731"

};


/* ================================
   إنشاء جدول عكسي
   رقم → حرف
================================ */

const reverseTable = {};

for (const letter in codeTable) {

  reverseTable[codeTable[letter]] = letter;

}


/* ================================
   عناصر تسجيل الدخول
================================ */

const lockScreen =
  document.getElementById("lockScreen");

const site =
  document.getElementById("site");

const input =
  document.getElementById("accessCode");

const loginMsg =
  document.getElementById("loginMsg");


/* ================================
   تسجيل الدخول
================================ */

function enter() {

  const value =
    input.value.trim();


  if (
    value === CONFIG.accessCode ||
    value === CONFIG.ownerCode
  ) {

    lockScreen.classList.add("hidden");

    site.classList.remove("hidden");


    if (
      value === CONFIG.ownerCode
    ) {

      openOwner();

    }


    startTerminal();

  }

  else {

    loginMsg.textContent =
      "ACCESS DENIED // رمز غير صحيح";

    input.value = "";

    input.focus();

  }

}


document
  .getElementById("enterBtn")
  .onclick = enter;


input.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      enter();

    }

  }
);


/* ================================
   لوحة المالك
================================ */

function openOwner() {

  document
    .getElementById("ownerPanel")
    .classList
    .remove("hidden");

}


document
  .getElementById("ownerBtn")
  .onclick = openOwner;


document
  .getElementById("closeOwner")
  .onclick = function() {

    document
      .getElementById("ownerPanel")
      .classList
      .add("hidden");

  };


/* ================================
   الطرفية
================================ */

function startTerminal() {

  const lines = [

    "[OK] SECURE CHANNEL ESTABLISHED",

    "[OK] ARCHIVE 24 INITIALIZED",

    "[OK] SECRET CODE SYSTEM ONLINE",

    "[INFO] WAITING FOR AUTHORIZED OPERATOR"

  ];


  let index = 0;


  const box =
    document.getElementById("terminalText");


  function showLine() {

    if (
      index < lines.length
    ) {

      box.innerHTML +=
        "<div>> " +
        lines[index] +
        "</div>";

      index++;

      setTimeout(
        showLine,
        450
      );

    }

  }


  showLine();

}


/* ================================
   محول الشفرة
================================ */

const converterInput =
  document.getElementById(
    "converterInput"
  );

const converterOutput =
  document.getElementById(
    "converterOutput"
  );

const lettersToNumbers =
  document.getElementById(
    "lettersToNumbers"
  );

const numbersToLetters =
  document.getElementById(
    "numbersToLetters"
  );


let currentMode =
  "lettersToNumbers";


/* ================================
   تغيير الاتجاه
================================ */

lettersToNumbers.onclick =
  function() {

    currentMode =
      "lettersToNumbers";

    lettersToNumbers
      .classList
      .add("active");

    numbersToLetters
      .classList
      .remove("active");

    converterInput.placeholder =
      "اكتب الحروف هنا...";

  };


numbersToLetters.onclick =
  function() {

    currentMode =
      "numbersToLetters";

    numbersToLetters
      .classList
      .add("active");

    lettersToNumbers
      .classList
      .remove("active");

    converterInput.placeholder =
      "مثال: 2324 3745 1417";

  };


/* ================================
   تحويل الحروف → أرقام
================================ */

function lettersToCode(text) {

  let result = [];

  let i = 0;


  while (i < text.length) {

    /* هـ */

    if (
      text.substring(i, i + 2) === "هـ"
    ) {

      result.push(codeTable["هـ"]);

      i += 2;

      continue;

    }


    const letter =
      text[i];


    /* مسافة */

    if (
      letter === " "
    ) {

      result.push("/");

      i++;

      continue;

    }


    /* حرف موجود */

    if (
      codeTable[letter]
    ) {

      result.push(
        codeTable[letter]
      );

    }

    else {

      result.push(letter);

    }


    i++;

  }


  return result.join(" ");

}


/* ================================
   تحويل أرقام → حروف
================================ */

function codeToLetters(text) {

  const clean =
    text.trim();


  if (!clean) {

    return "";

  }


  /*
    المسافة بين الأكواد مهمة.

    مثال:

    2324 3745 1417

    تصبح:

    ا ب ت
  */

  const parts =
    clean.split(/\s+/);


  let result = "";


  for (
    const part of parts
  ) {

    if (
      part === "/"
    ) {

      result += " ";

      continue;

    }


    if (
      reverseTable[part]
    ) {

      result +=
        reverseTable[part];

    }

    else {

      result +=
        "❓";

    }

  }


  return result;

}


/* ================================
   زر التحويل
================================ */

document
  .getElementById("convertBtn")
  .onclick = function() {

    const text =
      converterInput.value;


    if (!text.trim()) {

      converterOutput.textContent =
        "بانتظار الإدخال...";

      return;

    }


    if (
      currentMode ===
      "lettersToNumbers"
    ) {

      converterOutput.textContent =
        lettersToCode(text);

    }

    else {

      converterOutput.textContent =
        codeToLetters(text);

    }

  };


/* ================================
   زر المسح
================================ */

document
  .getElementById("clearBtn")
  .onclick = function() {

    converterInput.value = "";

    converterOutput.textContent =
      "بانتظار الإدخال...";

  };


/* ================================
   زر النسخ
================================ */

document
  .getElementById("copyBtn")
  .onclick = async function() {

    const text =
      converterOutput.textContent;


    if (
      !text ||
      text === "بانتظار الإدخال..."
    ) {

      return;

    }


    try {

      await navigator.clipboard.writeText(
        text
      );

      this.textContent =
        "✓ تم النسخ";

      setTimeout(
        () => {

          this.textContent =
            "📋 نسخ النتيجة";

        },
        1500
      );

    }

    catch {

      alert(
        "انسخ النتيجة يدويًا"
      );

    }

  };


/* ================================
   فتح الملفات
================================ */

document
  .querySelectorAll(".open-file")
  .forEach(
    function(button) {

      button.onclick =
        function() {

          alert(
            "FILE OPENED // يمكنك تخصيص هذا القسم لاحقًا."
          );

        };

    }
  );


/* ================================
   الساعة
================================ */

function updateClock() {

  const date =
    new Date();


  document
    .getElementById("clock")
    .textContent =
      " // " +
      date.toLocaleTimeString(
        "en-GB"
      );

}


setInterval(
  updateClock,
  1000
);

updateClock();
