import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { productImagePipe } from "../../pipes/product-image.pipe";

@Component({
  selector: 'carrusel-image',
  imports: [productImagePipe],
  templateUrl: './carrusel-image.component.html',
  styleUrls: ['./carrusel-image.component.css'],
})
export class CarruselImageComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() carouselTitle: string = '';
  @Input() autoPlay: boolean = false;
  @Input() autoPlayInterval: number = 4000;

  currentIndex = 0;
  isTransitioning = false;
  private autoPlayTimer?: NodeJS.Timeout;
  private touchStartX = 0;
  private touchEndX = 0;

  ngOnInit() {
    if (this.autoPlay && this.images.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private startAutoPlay() {
    this.autoPlayTimer = setInterval(() => {
      if (!this.isTransitioning) {
        this.nextImage();
      }
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  nextImage() {
    if (this.isTransitioning || this.images.length <= 1) return;

    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;

    // Reset transition lock after animation completes
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600); // Match CSS transition duration
  }

  prevImage() {
    if (this.isTransitioning || this.images.length <= 1) return;

    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  goToImage(index: number) {
    if (this.isTransitioning || index === this.currentIndex) return;

    this.isTransitioning = true;
    this.currentIndex = index;

    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  getCardClass(index: number): string {
    if (this.images.length === 0) return '';

    const totalImages = this.images.length;
    let position = (index - this.currentIndex + totalImages) % totalImages;

    switch (totalImages) {
      case 1:
        return 'center';
      case 2:
        switch (position) {
          case 0: return 'center';
          case 1: return 'right-1';
          default: return 'hidden';
        }
      case 3:
        switch (position) {
          case 0: return 'center';
          case 1: return 'right-1';
          case 2: return 'left-1';
          default: return 'hidden';
        }
      default:
        // Handling for 4+ images
        switch (position) {
          case 0: return 'center';
          case 1: return 'right-1';
          case 2: return 'right-2';
          case totalImages - 1: return 'left-1';
          case totalImages - 2: return 'left-2';
          default: return 'hidden';
        }
    }
  }

  // Keyboard navigation
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextImage();
    }
  }

  // Touch events for mobile
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.stopAutoPlay(); // Stop auto-play on user interaction
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();

    if (this.autoPlay) {
      this.startAutoPlay(); // Restart auto-play after interaction
    }
  }

  private handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextImage(); // Swipe left - next image
      } else {
        this.prevImage(); // Swipe right - previous image
      }
    }
  }

  onMouseEnter() {
    this.stopAutoPlay();
  }

  onMouseLeave() {
    if (this.autoPlay && this.images.length > 1) {
      this.startAutoPlay();
    }
  }
}
