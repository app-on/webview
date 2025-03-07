if (!localStorage.getItem("ls-array-history")) {
  localStorage.setItem(
    "ls-array-history",
    JSON.stringify({
      id: Date.now(),
      url: "https://m-vnio.github.io/webview/",
    })
  );
}

const array = JSON.parse(localStorage.getItem("ls-array-history"));
let $focus = null;
let keydown = false;

const $ = function (query) {
  return document.querySelector(query);
};

document.querySelector(".form_v823x1l").addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    new URL(e.currentTarget.search.value);
    window.location.href = e.currentTarget.search.value;

    const array = JSON.parse(localStorage.getItem("ls-array-history"));
    localStorage.setItem(
      "ls-array-history",
      JSON.stringify(
        array.concat({
          id: Date.now(),
          url: e.currentTarget.search.value,
        })
      )
    );
  } catch (error) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
      e.currentTarget.search.value
    )}`;
  }
});

$("#itemTrue").addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const $a = e.target.closest("a");

  if ($a) {
    if (confirm("¿Eliminar?")) {
      const array = JSON.parse(localStorage.getItem("ls-array-history"));
      localStorage.setItem(
        "ls-array-history",
        JSON.stringify(array.filter((object) => object.id != $a.dataset.id))
      );

      $a.remove();
    }
  }
});

$("#itemTrue").innerHTML = array
  .map((object) => {
    const _ = {
      encodeUrl: `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
        object.url
      )}&sz=64`,
    };

    return `
      <a href="${object.url}" class="div_f97rdbt" data-id="${object.id}" data-key-focus>
          <img src="${_.encodeUrl}" alt="">
          <p>${object.url}</p>
      </a>
    `;
  })
  .join("");

addEventListener("keydown", (e) => {
  if (e.target.closest("[data-not-keydown]") != null && e.key != "ArrowDown") {
    return;
  }

  e.preventDefault();

  if (keydown) return;

  if (document.activeElement.getAttribute("data-key-focus") == null) {
    $focus.focus();

    return;
  }

  if (e.key == "Enter") {
    keydown = true;
    const $a = $focus;

    const timeout = setTimeout(() => {
      const array = JSON.parse(localStorage.getItem("ls-array-history"));
      localStorage.setItem(
        "ls-array-history",
        JSON.stringify(array.filter((object) => object.id != $a.dataset.id))
      );

      $a.remove();
    }, 300);

    const callback = () => {
      clearTimeout(timeout);
      keydown = false;

      if ($a.parentElement) e.target.click();
    };

    addEventListener("keyup", callback, { once: true });
  }

  const focus = Array.from(document.querySelectorAll("[data-key-focus]"));
  const index = focus.findIndex((focus) => focus == $focus);

  if (e.key == "ArrowRight") {
    if (focus[index + 1]) {
      focus[index + 1].focus();
    }
  }

  if (e.key == "ArrowLeft") {
    if (focus[index - 1]) {
      focus[index - 1].focus();
    }
  }

  if (e.key == "ArrowUp") {
    if (focus[index - 1]) {
      focus[index - 1].focus();
    }
  }

  if (e.key == "ArrowDown") {
    if (focus[index + 1]) {
      focus[index + 1].focus();
    }
  }
});

addEventListener("focusin", (e) => {
  if (e.target.closest("[data-key-focus]")) {
    $focus = e.target;
  }
});

document.querySelector("[data-key-focus]").focus();
