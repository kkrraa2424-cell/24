/*
====================================
   ARCHIVE 24 - ACCESS SYSTEM
====================================

رمز الزوار:
246824

رمز المالك:
240924

غيّر الرموز من هنا.
*/


const CONFIG = {

  accessCode: "246824",

  ownerCode: "240924"

};



const lockScreen =
  document.getElementById("lockScreen");

const site =
  document.getElementById("site");

const input =
  document.getElementById("accessCode");

const msg =
  document.getElementById("loginMsg");



/*
=========================
      تسجيل الدخول
=========================
*/


function enter() {

  const value =
    input.value.trim();


  // رمز الزوار أو المالك

  if (
    value === CONFIG.accessCode ||
    value === CONFIG.ownerCode
  ) {

    lockScreen.classList.add("hidden");

    site.classList.remove("hidden");


    // إذا كان رمز المالك

    if (
      value === CONFIG.ownerCode
    ) {

      openOwner();

    }


    startTerminal();

  }

  else {

    msg.textContent =
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

    if (
      event.key === "Enter"
    ) {

      enter();

    }

  }
);



/*
=========================
       لوحة المالك
=========================
*/


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



/*
=========================
       فتح الملفات
=========================
*/


document
  .querySelectorAll(".open-file")
  .forEach(function(button) {

    button.onclick = function() {

      alert(
        "FILE OPENED // يمكنك استبدال هذا القسم بالمحتوى الذي تريده."
      );

    };

  });



/*
=========================
      شاشة الطرفية
=========================
*/


function startTerminal() {

  const lines = [

    "[OK] SECURE CHANNEL ESTABLISHED",

    "[OK] ARCHIVE 24 INITIALIZED",

    "[OK] ENCRYPTED INTERFACE ONLINE",

    "[INFO] WAITING FOR AUTHORIZED OPERATOR"

  ];


  let index = 0;


  const box =
    document.getElementById(
      "terminalText"
    );


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



/*
=========================
          الساعة
=========================
*/


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
