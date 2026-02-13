import { useState, useEffect, useCallback, RefObject } from "react";

export const useTextOverflow = (ref: RefObject<HTMLInputElement | null>) => {
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const updateFadeStates = useCallback(() => {
    const el = ref.current;
    if (el) {
      // ใช้ Math.ceil เพื่อปัดเศษขึ้น ป้องกันปัญหา Sub-pixel ใน Chrome/Edge
      const scrollLeft = Math.ceil(el.scrollLeft);
      const scrollWidth = el.scrollWidth;
      const clientWidth = el.clientWidth;

      // เพิ่ม Tolerance (ค่าเผื่อ) 2px เพื่อไม่ให้เงาโผล่มาก่อนล้นจริง
      const tolerance = 2;

      // มีส่วนเกินด้านซ้าย: เมื่อ Scroll ไปแล้วมากกว่าค่าเผื่อ
      setShowLeftFade(scrollLeft > tolerance);

      // มีส่วนเกินด้านขวา: เมื่อความกว้างทั้งหมด ลบด้วยตำแหน่งที่เลื่อนไป มากกว่าความกว้างที่มองเห็น + ค่าเผื่อ
      setShowRightFade(scrollWidth > scrollLeft + clientWidth + tolerance);
    }
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // ตรวจสอบทันทีที่ Value เปลี่ยนแปลง (สำหรับกรณีพิมพ์ตัวอักษร)
    const observer = new MutationObserver(updateFadeStates);
    observer.observe(el, { attributes: true, childList: true, characterData: true });

    updateFadeStates();
    window.addEventListener("resize", updateFadeStates);
    
    return () => {
      window.removeEventListener("resize", updateFadeStates);
      observer.disconnect();
    };
  }, [updateFadeStates, ref]);

  return {
    showLeftFade,
    showRightFade,
    updateFadeStates,
  };
};