let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
    //alert("!");
  }, duration);
};

let slideDown = (target, duration = 500) => {
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;
  if (display === "none") display = "block";
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-duration");
    target.style.removeProperty("transition-property");
  }, duration);
};

var slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === "none") {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

const options = {
  linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup]), a[data-swup]',
};
const swup = new Swup(options);

swup.on("contentReplaced", function () {
  window.scrollTo(0, 0);
});

function init() {
  var pageID = document.querySelector("main").getAttribute("data-page-id");
  var menuLinks = document.querySelectorAll("header nav li");
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].classList.remove("active");
  }
  const newActive = document.querySelector("header nav li[data-page-id='" + pageID + "']");
  if (newActive) {
    newActive.classList.add("active");
  }

  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 71) {
      document.querySelector(".grid-overlay").classList.toggle("show");
    }
  });

  const introIllustration = document.querySelector(".intro-illustration");
  if (introIllustration) {
    const choices = introIllustration.getAttribute("data-choices").split(",");
    const randomIllustration = choices[Math.floor(Math.random() * choices.length)];
    const imgString = "/assets/img/illustrations/character-" + randomIllustration + "-flirt.svg";
    introIllustration.querySelector("img").src = imgString;
  }

  const footerIllustration = document.querySelector(".footer-illustration");
  if (footerIllustration) {
    const choices = footerIllustration.getAttribute("data-choices").split(",");
    const randomIllustration = choices[Math.floor(Math.random() * choices.length)];
    const imgString = "/assets/img/illustrations/character-" + randomIllustration + "-flirt.svg";
    footerIllustration.querySelector("img").src = imgString;
  }

  const people = document.querySelector(".people");
  if (people) {
    const random_boolean = Math.random() < 0.5;
    if (random_boolean === true) {
      people.classList.add("reverse");
    }
  }

  const videoControls = document.querySelectorAll(".video-controls");
  Array.from(videoControls).forEach(function (element) {
    element.addEventListener("click", function (e) {
      let video = element.parentNode.querySelector("video");
      if (video.paused) {
        video.play();
        element.parentNode.classList.remove("paused");
        element.parentNode.classList.add("playing");
      } else {
        video.pause();
        element.parentNode.classList.remove("playing");
        element.parentNode.classList.add("paused");
      }

      e.preventDefault();
      return false;
    });
  });

  function expandRow(el) {
    el.classList.toggle("open");
    slideToggle(el.querySelector(".expanded-content"), 200);
  }

  const expandingRows = document.querySelectorAll(".expanding-row");
  Array.from(expandingRows).forEach(function (element) {
    element.querySelector(".expanding-row-header").addEventListener("click", function (e) {
      console.log(e.target.tagName);
      if (e.target.tagName.toLowerCase() === "a" || e.target.tagName.toLowerCase() === "img") {
      } else {
        expandRow(element);
      }
      e.preventDefault();
      return false;
    });
  });

  var doc = document.documentElement;
  var w = window;

  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;

  var header = document.querySelector("header");
  var checkScroll = function () {
    curScroll = w.scrollY || doc.scrollTop;
    if (curScroll > prevScroll) {
      direction = 2;
    } else if (curScroll < prevScroll) {
      direction = 1;
    }
    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }
    prevScroll = curScroll;
  };
  var toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 10) {
      header.classList.add("hide");
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove("hide");
      prevDirection = direction;
    }
  };
  window.addEventListener("scroll", checkScroll);
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});

swup.on("contentReplaced", init);

swup.on("clickLink", function () {
  document.querySelector("header").classList.remove("hide");
});
