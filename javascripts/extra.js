function isMob(Iphone = false) {
  var toMatch = [/Android/i, /webOS/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  if (Iphone) toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function copyMode(bookmarklet, mainButton, target) {
  if (mainButton) {
    bookmarklets_code = bookmarklet.parentNode.parentNode.querySelector("code");
    bookmarklets_id = bookmarklet.getAttribute("bookmarklets");
    if (bookmarklets_code && bookmarklets_id) {
      bookmarklets_code.parentNode.parentNode.classList.remove("hide");
      bookmarklet.classList.add("content-copy");
      bookmarklet.dataset.clipboardTarget = `#${target} > code`;
    }
  } else {
    var bookmarklets_copy = document.createElement("a");
    bookmarklets_copy.style = "margin-left: 6px;";
    bookmarklets_copy.className = "md-button md-button content-copy";
    bookmarklets_copy.innerText = "Copier";
    bookmarklets_copy.dataset.clipboardTarget = `#${target} > code`;
    bookmarklet.parentNode.appendChild(bookmarklets_copy);
  }
}

fetch("/bookmarklets.json")
  .then((response) => {
    return response.json();
  })
  .then((bookmarklets_json) => {
    document.querySelectorAll("[bookmarklets]").forEach((bookmarklet) => {
      bookmarklets_code = bookmarklet.parentNode.parentNode.querySelector("code");
      bookmarklets_id = bookmarklet.getAttribute("bookmarklets");

      if (bookmarklets_code && bookmarklets_id && bookmarklets_json[bookmarklets_id]) {
        bookmarklet.querySelector("span").innerHTML = bookmarklets_json[bookmarklets_id]["title"];
        bookmarklet.href = bookmarklets_json[bookmarklets_id]["script"];
        bookmarklets_code.parentNode.parentNode.classList.add("hide");
        bookmarklets_code.innerText = bookmarklets_json[bookmarklets_id]["script"];
        copyMode(bookmarklet, isMob(), bookmarklets_code.parentNode.id);
      } else {
        bookmarklet.classList.add("content-indisponible");
      }

      bookmarklet.classList.remove("content-loading");
    });
  });
