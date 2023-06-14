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
    event.preventDefault();
    this.dist.startX = event.clientX;
    console.log(this.dist.startX);
    this.warapper.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    this.warapper.removeEventListener("mousemove", this.onMove);
    this.dist.finalPositio = this.dist.movePosition;
  }

  addSlideEvents() {
    this.warapper.addEventListener("mousedown", this.onStart);
    this.warapper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
