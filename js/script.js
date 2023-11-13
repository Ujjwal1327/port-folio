function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
// init();

// js from here
function revealFunction() {
  const reveal = document.querySelectorAll(".reveal");
  reveal.forEach((elem) => {
    console.log("(((((((((((((((((");
    var parent = document.createElement("span");
    var child = document.createElement("span");
    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}
revealFunction();

// gsap , scolltrigger and locomotive...
const tl = gsap.timeline();
tl.from(".reveal .parent .child span", {
  x: 100,
  duration: 1,
  stagger: 0.1,
  ease: Power3.easeInOut,
})
  .to(".reveal .parent .child", {
    y: "-100%",
    duration: 1,
    ease: Circ.easeInOut,
  })
  .to(".loader", {
    height: "0vh",
    duration: 0.7,
    ease: Circ.easeInOut,
  })
  .to(".green", {
    height: "100%",
    top: 0,
    duration: 1,
    delay: -1,
    ease: Circ.easeInOut,
  })
  .to(".green", {
    height: "0%",

    duration: 1,
    delay: -0.4,
    ease: Expo.easeInOut,
  });
