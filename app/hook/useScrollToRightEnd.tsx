import { useState, useRef, useEffect, useCallback } from "react";

export const useScrollToRightEnd = <T extends HTMLElement>(dependencies: unknown[] = []) => {
  const [isScrolledToRightEnd, setIsScrolledToRightEnd] = useState(false);
  const scrollRef = useRef<T>(null);

  // ห่อฟังก์ชันด้วย useCallback เพื่อไม่ให้ถูกสร้างใหม่พร่ำเพรื่อ
  const checkScrollPosition = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const tolerance = 2 * rootFontSize; // ปรับ tolerance ที่นี่ (หน่วย rem)
      // เช็คว่าระยะเลื่อน + ความกว้างมองเห็น >= ความกว้างทั้งหมด (เผื่อบั๊กด้วย tolerance)
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - tolerance) {
        setIsScrolledToRightEnd(true);
      } else {
        setIsScrolledToRightEnd(false);
      }
    }
  }, []);

  useEffect(() => {
    // เช็คครั้งแรกเมื่อ Component โหลด หรือเมื่อ dependencies (เช่น ข้อมูล) เปลี่ยนแปลง
    checkScrollPosition();
    
    // ดักจับเวลาผู้ใช้ย่อขยายหน้าต่างเบราว์เซอร์
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkScrollPosition, ...dependencies]);

  return { scrollRef, isScrolledToRightEnd, handleScroll: checkScrollPosition };
};