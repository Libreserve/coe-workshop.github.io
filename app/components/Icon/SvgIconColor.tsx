"use client";

import React, { useEffect, useState } from "react";
import { Props } from "./Type";

/**
 * เพิ่ม className ให้กับทุก element ที่มี fill/stroke
 * รองรับ path, circle, rect, polygon, ellipse, line, polyline
 */
function addColorClasses(svgString: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  const selectors = ["path", "circle", "rect", "polygon", "ellipse", "line", "polyline"];
  let counter = 1;

  selectors.forEach(sel => {
    doc.querySelectorAll(sel).forEach(el => {
      if (el.hasAttribute("fill") || el.hasAttribute("stroke")) {
        el.setAttribute("class", `color${counter++}`);
      }
    });
  });

  return new XMLSerializer().serializeToString(doc.documentElement);
}

/**
 * @brief โหลดหรือรับ raw SVG แล้วปรับแต่งสี/ขนาด พร้อมเพิ่ม className ให้ element ที่มี fill/stroke
 *
 * @param size ถ้าใส่จะบังคับให้ svg เป็นสี่เหลี่ยมจัตุรัส (width=height=size)
 *             ถ้าอยากได้สี่เหลี่ยมผืนผ้า ให้ใช้ width และ height แทน
 * @param color ใช้สำหรับ fix สีของ icon (fill/stroke) ให้เป็นค่าเดียวกัน
 *              ถ้าไม่ fixColor จะใช้ currentColor เพื่อให้สืบทอดจาก CSS ได้
 * @param className ใส่ className ให้กับ <svg> เพื่อใช้ styling ภายนอก
 *                  และทุก element ภายในที่มี fill/stroke จะถูกเพิ่ม className เป็น color1, color2, color3...
 * @param alt คำอธิบายสำหรับ aria-label เพื่อการเข้าถึง (accessibility)
 * @param fixColor ถ้า true จะไม่เปลี่ยน fill/stroke เดิมของ svg
 *
 * @returns React component ที่ render เป็น:
 *   <svg className={className} {...svgProps}
 *        dangerouslySetInnerHTML={{ __html: svgInner }} />
 *
 * ### การใช้ร่วมกับ SCSS Modules
 * - เนื่องจาก SCSS Modules จะเปลี่ยนชื่อ className ของแม่ (เช่น `.logo` → `.login-module-scss-module__XXX__logo`)
 *   แต่ class ย่อยที่ inject เข้าไป (`color1`, `color2`) เป็น global class ธรรมดา
 * - ถ้าเขียน SCSS แบบ `.logo .color1 { fill: red; }` จะไม่ match กับ DOM จริง
 * - วิธีแก้คือใช้ `:global` เพื่อให้ class ย่อยเป็น global selector:
 *
 * ```scss
 * .logo {
 *   :global(.color1) { color: red; }
 *   :global(.color2) { color: blue; }
 * }
 * ```
 *
 * ผลลัพธ์ที่ compile ออกมา:
 * ```css
 * .login-module-scss-module__XXX__logo .color1 { color: red; }
 * .login-module-scss-module__XXX__logo .color2 { color: blue; }
 * ```
 *
 * แบบนี้จะทำให้ CSS ของคุณ match กับ DOM ที่มี `<svg class="login-module-scss-module__XXX__logo">`
 * และภายในมี `<path class="color1">`, `<path class="color2">` ได้อย่างถูกต้อง
 */
export default function SvgIconColor({
  svg,
  src,
  width = 24,
  height = 24,
  size,
  color,
  className,
  alt,
  fixColor = false,
}: Props) {
  const [svgInner, setSvgInner] = useState<string | null>(null);
  const [svgAttrs, setSvgAttrs] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;

    async function process(raw: string) {
      let s = raw.replace(/<\?xml.*?\?>\s*/g, "");

      const finalColor = color ?? "currentColor";
      if (!fixColor) {
        s = s.replace(/fill="(?!none)[^"]*"/gi, `fill="${finalColor}"`);
        s = s.replace(/stroke="(?!none)[^"]*"/gi, `stroke="${finalColor}"`);
      }

      const m = s.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
      let attrsText = "";
      let inner = s;
      if (m) {
        attrsText = m[1] || "";
        inner = m[2] || "";
      }

      const attrs: Record<string, string> = {};
      attrsText.replace(/([^\s=]+)\s*=\s*"([^"]*)"/g, (_, k, v) => {
        attrs[k] = v;
        return "";
      });

      const finalSize = size ?? undefined;
      if (finalSize) {
        attrs.width = String(finalSize);
        attrs.height = String(finalSize);
      } else {
        attrs.width = String(width);
        attrs.height = String(height);
      }

      // ครอบ svg แล้วส่งเข้า addColorClasses
      const wrappedSvg = `<svg${attrsText}>${inner}</svg>`;
      const modifiedSvg = addColorClasses(wrappedSvg);

      const innerMatch = modifiedSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
      const newInner = innerMatch ? innerMatch[1] : modifiedSvg;

      if (!cancelled) {
        setSvgInner(newInner);
        setSvgAttrs(attrs);
      }
    }

    (async () => {
      try {
        if (svg) {
          await process(svg);
        } else if (src) {
          const res = await fetch(src);
          if (!res.ok) {
            console.warn("Failed to fetch svg:", src, res.status);
            return;
          }
          const text = await res.text();
          await process(text);
        } else {
          setSvgInner(null);
          setSvgAttrs({});
        }
      } catch (e) {
        console.warn("Error processing svg:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [svg, src, width, height, size, color, fixColor]);

  if (!svgInner) return null;

  const svgProps: React.SVGProps<SVGSVGElement> = {};
  for (const k in svgAttrs) {
    const propName = k === "viewbox" ? "viewBox" : k;
    (svgProps as unknown as Record<string, string>)[propName] = svgAttrs[k];
  }

  svgProps.role = "img";
  if (alt) svgProps["aria-label"] = alt;

  return (
    <svg
      className={className}
      {...svgProps}
      dangerouslySetInnerHTML={{ __html: svgInner }}
    />
  );
}