import styles from "./pagination.module.scss";
import { PaginationProps } from "./types";
function Pagination({
  total,
  currentPage,
  onChange,
  siblings = 1,
  boundaries = 1,
}: PaginationProps) {
  const createPagination = () => {
    const pages: (number | "...")[] = [];

    const startPages = Array.from({ length: boundaries }, (_, i) => i + 1);
    const endPages = Array.from(
      { length: boundaries },
      (_, i) => total - boundaries + 1 + i
    );

    const leftSibling = Math.max(currentPage - siblings, boundaries + 1);
    const rightSibling = Math.min(currentPage + siblings, total - boundaries);

    pages.push(...startPages);

    if (leftSibling > boundaries + 1) {
      pages.push("...");
    }

    for (let i = leftSibling; i <= rightSibling; i++) {
      pages.push(i);
    }

    if (rightSibling < total - boundaries) {
      pages.push("...");
    }

    pages.push(...endPages);

    return pages;
  };

  const pageList = createPagination();

  return (
    <div className={styles.pagination_wrapper}>
      {pageList.map((p, index) =>
        p === "..." ? (
          <span key={index} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`${styles.page_button} ${
              currentPage === p ? styles.active : ""
            }`}
            onClick={() => onChange(Number(p))}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}

export default Pagination;
