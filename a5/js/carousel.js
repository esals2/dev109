// carousel js implementation by Franklin

// function that deals w all of the carousel logic
function carousel() {
  let container = null;
  let images = [];
  let leftArrow = null;
  let rightArrow = null;
  let currentIndex = 0;
  let autoScrollInterval = null;
  let countdownInterval = null;
  let countdown = 4;
  let timerDisplay = null;
  let captionBoxes = document.querySelectorAll(".carousel-caption");
  let slides = document.querySelectorAll(".carousel-slide");

  // if no container return (still solving that weird race condition bug)
  container = document.querySelector(".carousel-container");
  if (!container) {
    return;
  }

  images = container.querySelectorAll(".carousel-image");
  leftArrow = container.querySelector(".carousel-arrow-left");
  rightArrow = container.querySelector(".carousel-arrow-right");
  timerDisplay = document.querySelector(".carousel-timer");

  // init everything, including showing the first image, and setting up event listeners
  showImage(0);
  setupEventListeners();
  startAutoScroll();

  // setting up event listeners so that the prev/next image buttons work and the dots work
  function setupEventListeners() {
    // Arrow navigation
    if (leftArrow) {
      leftArrow.addEventListener("click", previousImage);
    }
    if (rightArrow) {
      rightArrow.addEventListener("click", nextImage);
    }

    // if hovering over the container, pause the auto scroll
    container.addEventListener("mouseenter", pauseAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);
  }

  // show image for whatever input index, by removing all active states and readding active onto the new image index
  function showImage(index) {
    slides.forEach((slide) => {
        slides.classList.remove("active");
    });

    if (slides[index]) {
        slides[index].classList.add("active");
    }

    currentIndex = index;
  }

  // dealing w going to the next or previous image
  function nextImage() {
    const nextIndex = (currentIndex + 1) % images.length;
    showImage(nextIndex);
  }

  function previousImage() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex);
  }

  // starting the auto scroll with interval which triggers every 3000ms (3s)
  function startAutoScroll() {
    pauseAutoScroll();
    updateTimerDisplay();
    countdownInterval = setInterval(() => {
        countdown--;
        updateTimerDisplay();
        if (countdown < 0) {
            nextImage();
            countdown = 4;
        }
    }, 1000);
  }

  // pause the auto interval function to stop auto scrolling
  function pauseAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
  }
}

// only initialize carousel if the dom is loaded (bandage solution to solve weird race condition bug)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", carousel);
} else {
  carousel();
}