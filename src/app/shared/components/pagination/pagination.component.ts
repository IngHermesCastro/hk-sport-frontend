import {
  Component,
  computed,
  input,
  linkedSignal,
  signal,
  effect,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  pages = input(0);
  currentPage = input<number>(1);
  maxVisiblePages = input<number>(7);
  showNavButtons = input<boolean>(true);
  showPageInfo = input<boolean>(true);

  activePage = linkedSignal(this.currentPage);

  // Compute visible pages with ellipsis logic
  getVisiblePages = computed(() => {
    const totalPages = this.pages();
    const current = this.activePage();
    const maxVisible = this.maxVisiblePages();

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  // Check if we need ellipsis
  showStartEllipsis = computed(() => {
    return this.getVisiblePages()[0] > 2;
  });

  showEndEllipsis = computed(() => {
    const visiblePages = this.getVisiblePages();
    return visiblePages[visiblePages.length - 1] < this.pages() - 1;
  });

  // Check if we need first/last page buttons
  showFirstPage = computed(() => {
    return this.getVisiblePages()[0] > 1;
  });

  showLastPage = computed(() => {
    const visiblePages = this.getVisiblePages();
    return visiblePages[visiblePages.length - 1] < this.pages();
  });

  setActivePage(page: number) {
    if (page >= 1 && page <= this.pages() && page !== this.activePage()) {
      this.activePage.set(page);
    }
  }

  goToPreviousPage() {
    this.setActivePage(this.activePage() - 1);
  }

  goToNextPage() {
    this.setActivePage(this.activePage() + 1);
  }

  isPreviousDisabled(): boolean {
    return this.activePage() === 1;
  }

  isNextDisabled(): boolean {
    return this.activePage() === this.pages();
  }
}
