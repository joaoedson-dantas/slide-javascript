export default class Slide {
  constructor(slide, warapper) {
    this.slide = document.querySelector(slide);
    this.warapper = document.querySelector(warapper);
    this.dist = { finalPositio: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPositio - this.dist.movement;
  }

  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    this.warapper.addEventListener(moveType, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.warapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPositio = this.dist.movePosition;
  }

  addSlideEvents() {
    this.warapper.addEventListener("mousedown", this.onStart);
    this.warapper.addEventListener("touchstart", this.onStart);
    this.warapper.addEventListener("mouseup", this.onEnd);
    this.warapper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  // Slides config
  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidePosition(slide) {
    const margin = (this.warapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlid = this.slideArray[index];
    this.moveSlide(activeSlid.position);
    this.slidesIndexNav(index);
    this.dist.finalPositio = activeSlid.position;
  }

  init() {
    this.slidesConfig();
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
