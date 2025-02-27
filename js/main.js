document.addEventListener("DOMContentLoaded", function () {
  initScrollEffects();
  initTextRevealAnimations();
  initAdvancedMissionSlider();
  initBackToTop();
  initLenis();
  initMenuToggle();
  initButtonAnimations();
  initParallaxEffects();
  initCustomCursor();
  initAnimation();
  initPreloader();

  document.body.style.overflow = "hidden";
});

function initPreloader() {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  gsap.to(".preloader__progress-ring", {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: "power2.out",
  });

  const preloaderTimeline = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      document.body.style.overflow = "auto";
      document.body.classList.add("loaded");

      animateHeaderElements();
    },
  });

  preloaderTimeline
    .to(preloader, {
      opacity: 0,
      duration: 0.8,
      delay: 1.5,
    })
    .set(preloader, { visibility: "hidden" });
}

function animateHeaderElements() {
  if (!window.gsap) return;

  const headerTimeline = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  const navLinks = document.querySelectorAll(".header__nav-link");
  const flagLine = document.querySelector(".header__flag-line");

  if (flagLine) {
    flagLine.style.visibility = "visible";
    headerTimeline.from(flagLine, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "expo.out",
    });
  }

  if (navLinks.length > 0) {
    headerTimeline.from(
      navLinks,
      {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.6",
    );
  }

  animateHeroElements();
}

function animateHeroElements() {
  if (!window.gsap) return;

  const heroTl = gsap.timeline({
    defaults: { ease: "power3.out" },
  });

  heroTl
    .to(".hero__subtitle", {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
    })
    .to(
      ".hero__title",
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        rotationX: 0,
        transformPerspective: 800,
        transformOrigin: "center center",
      },
      "-=0.6",
    )
    .to(
      ".hero__tagline",
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
      "-=0.6",
    )
    .to(
      ".hero__btn",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        onComplete: () => {
          gsap.to(".hero__btn", {
            scale: 1.03,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      },
      "-=0.6",
    );
}

function initMenuToggle() {
  const menuToggle = document.querySelector(".header__menu-toggle");
  const mobileMenu = document.querySelector(".header__mobile-menu");
  const mobileLinks = document.querySelectorAll(".header__mobile-link");

  if (menuToggle && mobileMenu) {
    const updateMenuOrigin = () => {
      const toggleRect = menuToggle.getBoundingClientRect();
      const centerX = toggleRect.left + toggleRect.width / 2;
      const centerY = toggleRect.top + toggleRect.height / 2;

      const viewportX = (centerX / window.innerWidth) * 100;
      const viewportY = (centerY / window.innerHeight) * 100;

      mobileMenu.style.setProperty("--originX", `${viewportX}%`);
      mobileMenu.style.setProperty("--originY", `${viewportY}%`);
    };

    window.addEventListener("resize", updateMenuOrigin);
    updateMenuOrigin();

    menuToggle.addEventListener("click", function () {
      updateMenuOrigin();
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");

      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";

        gsap.fromTo(
          ".header__mobile-link",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      } else {
        document.body.style.overflow = "auto";
      }
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuToggle) menuToggle.classList.remove("active");
      if (mobileMenu) mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}

function initScrollEffects() {
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".header__nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      if (header) {
        header.classList.add("scrolled");

        gsap.to(header, {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else if (header) {
      header.classList.remove("scrolled");
      gsap.to(header, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    updateActiveNavigation(scrollY);
    checkBackToTopVisibility(scrollY);
  });

  if (window.scrollY <= 50) {
    if (header) header.classList.remove("scrolled");
  } else if (header) {
    header.classList.add("scrolled");
  }

  function updateActiveNavigation(scrollPosition) {
    scrollPosition = scrollPosition || window.scrollY;
    const offset = 300;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition + offset >= sectionTop &&
        scrollPosition + offset < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  updateActiveNavigation();
}

function initTextRevealAnimations() {
  const headings = document.querySelectorAll("section h2, section h3");
  headings.forEach((heading) => {
    heading.classList.add("text-reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-10% 0px -10% 0px",
    },
  );

  document.querySelectorAll(".text-reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  document
    .querySelectorAll("section span + h2, section span + h3")
    .forEach((heading) => {
      heading.classList.add("section-title");
    });
}

function initAdvancedMissionSlider() {
  if (!window.Swiper) return;

  const missionSwiper = document.querySelector(".mission__swiper");
  if (!missionSwiper) return;

  const swiper = new Swiper(".mission__swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    grabCursor: true,
    loop: true,
    autoHeight: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: [0, 0, -100],
        opacity: 0,
      },
      next: {
        translate: [0, 0, -100],
        opacity: 0,
      },
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".mission__pagination",
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
    navigation: {
      nextEl: ".mission__btn-next",
      prevEl: ".mission__btn-prev",
    },
    on: {
      slideChangeTransitionStart: function () {
        gsap.fromTo(
          ".swiper-slide-active .mission__card-content",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3 },
        );

        gsap.fromTo(
          ".swiper-slide-active .mission__card-number",
          { x: -10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 },
        );
      },
    },
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      swiper.update();
    }, 300);
  });
}

function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top");

  if (!backToTopButton) return;

  backToTopButton.addEventListener("mouseenter", function () {
    gsap.to(this, {
      y: -3,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  backToTopButton.addEventListener("mouseleave", function () {
    gsap.to(this, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  backToTopButton.addEventListener("click", function () {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  checkBackToTopVisibility();
}

function checkBackToTopVisibility(scrollY) {
  const backToTopButton = document.getElementById("back-to-top");
  if (!backToTopButton) return;

  scrollY = scrollY || window.scrollY;

  if (scrollY > 500) {
    if (!backToTopButton.classList.contains("visible")) {
      backToTopButton.classList.add("visible");
      gsap.fromTo(
        backToTopButton,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      );
    }
  } else if (backToTopButton.classList.contains("visible")) {
    gsap.to(backToTopButton, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => backToTopButton.classList.remove("visible"),
    });
  }
}

function initButtonAnimations() {
  const buttons = document.querySelectorAll(
    ".btn-secondary, .cta__btn, .hero__btn",
  );

  buttons.forEach((button) => {
    button.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxMove = 10;

      const moveX = ((x - centerX) / centerX) * maxMove;
      const moveY = ((y - centerY) / centerY) * maxMove;

      gsap.to(this, {
        x: moveX * 0.5,
        y: moveY * 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", function () {
      gsap.to(this, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });

  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: ".cta h2",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          ".cta h2",
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
          },
        );
      },
      once: false,
    });

    ScrollTrigger.create({
      trigger: ".vision__card",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          ".vision__card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
        );
      },
      once: true,
    });
  }
}

function initParallaxEffects() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.utils
    .toArray(
      ".about__image img, .journey__image, .vision__image, .mission__bg-image, .quote__image",
    )
    .forEach((image) => {
      gsap.from(image, {
        scale: 1.1,
      });
      gsap.to(image, {
        y: () => -50,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

  gsap.utils
    .toArray(
      ".about__image-outline, .vision__image-accent, .mission__image-accent",
    )
    .forEach((element) => {
      gsap.to(element, {
        y: () => 30,
        x: () => 15,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

  gsap.to(".quote__mark--opening", {
    x: -20,
    y: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".quote__container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".quote__mark--closing", {
    x: 20,
    y: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".quote__container",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  gsap.to(".cta", {
    backgroundPosition: "100% 50%",
    ease: "none",
    scrollTrigger: {
      trigger: ".cta",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

function initCustomCursor() {
  if (!document.querySelector(".custom-cursor")) {
    const cursorOuter = document.createElement("div");
    cursorOuter.classList.add("custom-cursor", "cursor-outer");

    const cursorInner = document.createElement("div");
    cursorInner.classList.add("custom-cursor", "cursor-inner");

    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);

    const style = document.createElement("style");
    style.textContent = `
      .custom-cursor {
        pointer-events: none;
        position: fixed;
        z-index: 9999;
        border-radius: 50%;
        transition: transform, opacity;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
        mix-blend-mode: difference;
      }
      .cursor-outer {
        width: 40px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
      }
      .cursor-inner {
        width: 8px;
        height: 8px;
        background-color: white;
        transform: translate(-50%, -50%);
      }
      .grow {
        transform: translate(-50%, -50%) scale(1.5);
        border-color: var(--primary);
        background-color: rgba(222, 27, 37, 0.1);
        backdrop-filter: blur(1px);
        mix-blend-mode: normal;
      }
      .grow-inner {
        background-color: var(--primary);
        transform: translate(-50%, -50%) scale(0.8);
        mix-blend-mode: normal;
      }
      @media (max-width: 768px) {
        .custom-cursor {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);

    document.addEventListener("mousemove", (e) => {
      gsap.to(".cursor-outer", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      gsap.to(".cursor-inner", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.01,
      });
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, .btn-secondary, .cta__btn, .hero__btn, .vision__card, .mission__card, .journey__card",
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        document.querySelector(".cursor-outer").classList.add("grow");
        document.querySelector(".cursor-inner").classList.add("grow-inner");
      });

      el.addEventListener("mouseleave", () => {
        document.querySelector(".cursor-outer").classList.remove("grow");
        document.querySelector(".cursor-inner").classList.remove("grow-inner");
      });
    });

    document.addEventListener("mouseleave", () => {
      gsap.to([".cursor-outer", ".cursor-inner"], {
        opacity: 0,
        duration: 0.2,
      });
    });

    document.addEventListener("mouseenter", () => {
      gsap.to([".cursor-outer", ".cursor-inner"], {
        opacity: 1,
        duration: 0.2,
      });
    });
  }
}

function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    lerp: 0.1,
    smoothWheel: true,
    WheelMultiplier: 1,
    smoothTouch: true,
    touchMultiplier: 2,
  });

  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      lenis.scrollTo(targetElement, {
        offset: -10,
        duration: 1.5,
      });

      const menuToggle = document.querySelector(".header__menu-toggle");
      const mobileMenu = document.querySelector(".header__mobile-menu");
      if (menuToggle?.classList.contains("active")) {
        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
      lenis.scrollTo(0, { duration: 1.2 });
    });
  }

  document.documentElement.classList.add("lenis");
}

function initAnimation() {
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 100,
    });
  }
}
