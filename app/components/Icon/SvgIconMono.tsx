"use client";

import React, { useEffect, useState } from "react";
import { Props } from "./Type";

/**
 * @brief โหลดหรือรับ raw SVG แล้วปรับแต่งสี/ขนาด
 *
 * @param size ถ้าใส่จะบังคับให้ svg เป็นสี่เหลี่ยมจัตุรัส (width=height=size)
 * ถ้าอยากได้สี่เหลี่ยมผืนผ้า ให้ใช้ width และ height แทน
 * @param color ใช้สำหรับ fix สีของ icon (fill/stroke) ให้เป็นค่าเดียวกัน
 * ถ้าไม่ fixColor จะใช้ currentColor เพื่อให้สืบทอดจาก CSS ได้
 * @param className ใส่ className ให้กับ <svg> เพื่อใช้ styling ภายนอก
 * @param alt คำอธิบายสำหรับ aria-label เพื่อการเข้าถึง (accessibility)
 * @param fixColor ถ้า true จะไม่เปลี่ยน fill/stroke เดิมของ svg
 *
 * @returns React component ที่ render เป็น:
 * <svg className={className} {...svgProps}
 * dangerouslySetInnerHTML={{ __html: svgInner }} />
 */
export default function SvgIconMono({
  svg,
  src,
  width = 24,
  height = 24,
  size,
  color,
  className,
  alt,
  fixColor = false,
  ...props
}: Props) {
  // เก็บไส้ใน SVG (Path, Rect, etc.)
  const [svgInner, setSvgInner] = useState<string | null>(null);
  // เก็บ Attribute เดิมของ SVG (viewBox, stroke-width, etc.)
  const [svgAttrs, setSvgAttrs] = useState<Record<string, string>>({});

  // คำนวณขนาดที่จะใช้จริง
  const finalWidth = size ? size : width;
  const finalHeight = size ? size : height;

  useEffect(() => {
    let cancelled = false;

    async function process(raw: string) {
      // 1. ลบ XML Header (ถ้ามี)
      let s = raw.replace(/<\?xml.*?\?>\s*/g, "");

      // 2. จัดการเรื่องสี (Replace string)
      const finalColor = color ?? "currentColor";
      if (!fixColor) {
        // รองรับทั้ง " และ ' ในการเขียน Attribute
        s = s.replace(/fill=["'](?!none)[^"']*["']/gi, `fill="${finalColor}"`);
        s = s.replace(/stroke=["'](?!none)[^"']*["']/gi, `stroke="${finalColor}"`);
      }

      // 3. แยก <svg ...attr...> และ เนื้อหาข้างใน
      // Regex นี้จับ Group 1 = Attributes, Group 2 = Inner Content
      const m = s.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
      
      if (m) {
        const attrsText = m[1];
        const inner = m[2];

        // 4. แปลง Attributes string เป็น Object
        const attrs: Record<string, string> = {};
        // Regex จับ key="value" หรือ key='value'
        const attrRegex = /([a-zA-Z0-9:-]+)\s*=\s*(["'])(.*?)\2/g;
        let match;
        while ((match = attrRegex.exec(attrsText)) !== null) {
            // แปลง key เป็นชื่อที่ React ชอบ (เช่น viewbox -> viewBox)
            let key = match[1];
            if (key.toLowerCase() === "viewbox") key = "viewBox"; 
            if (key.toLowerCase() === "class") key = "className"; 
            
            attrs[key] = match[3];
        }

        if (!cancelled) {
          setSvgInner(inner);
          setSvgAttrs(attrs);
        }
      } else {
        // กรณี Parse ไม่ผ่าน ให้ใส่ raw string ไปเลย (Fallback)
        if (!cancelled) {
             // วิธีนี้เสี่ยงหน่อย แต่ดีกว่าไม่ขึ้นเลย
             setSvgInner(null); 
        }
      }
    }

    // Logic การโหลดไฟล์
    (async () => {
      try {
        if (svg) {
          await process(svg);
        } else if (src) {
          const res = await fetch(src);
          if (res.ok) {
            const text = await res.text();
            await process(text);
          } else {
             console.warn("SvgIconMono: Fetch failed", src);
          }
        } else {
          setSvgInner(null);
        }
      } catch (e) {
        console.warn("SvgIconMono Error:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
    // *** สำคัญ: เอา width, height, size ออกจาก Dependency Array ***
    // เพื่อให้ตอนเปลี่ยนขนาด ไม่ต้อง Parse SVG ใหม่
  }, [svg, src, color, fixColor]);

  if (!svgInner && !src && !svg) return null;

  // ถ้า Parse ไม่ผ่าน หรือยังโหลดไม่เสร็จ
  if (!svgInner) return <span style={{ display: "inline-block", width: finalWidth, height: finalHeight }} />;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt}
      // 1. ใส่ Attribute เดิมจากไฟล์ SVG (เช่น viewBox)
      {...(svgAttrs as any)} 
      
      // 2. ทับด้วย Props ที่ส่งเข้ามา (Width/Height/Class)
      width={finalWidth}
      height={finalHeight}
      className={className}
      
      // 3. ใส่ไส้ใน
      dangerouslySetInnerHTML={{ __html: svgInner }}
      
      // 4. Props อื่นๆ (เช่น onClick)
      {...props}
    />
  );
}