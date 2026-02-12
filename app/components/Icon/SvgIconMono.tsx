"use client";

import React, { useEffect, useState } from "react";
import { Props } from "./Type";

/**
 * @brief แปลง raw SVG string หรือโหลดจาก src แล้วปรับแต่งสี/ขนาด
 *
 * @param size ถ้าใส่จะบังคับให้ svg เป็นสี่เหลี่ยมจัตุรัส (width=height=size)
 *             ถ้าอยากได้สี่เหลี่ยมผืนผ้า ให้ใช้ width และ height แทน
 * @param color ใช้สำหรับ fix สีของ icon (fill/stroke) ให้เป็นค่าเดียวกัน
 *              ถ้าไม่ fixColor จะใช้ currentColor เพื่อให้สืบทอดจาก CSS ได้
 * @param className ใส่ className ให้กับ <svg> เพื่อใช้ styling ภายนอก
 * @param alt คำอธิบายสำหรับ aria-label เพื่อการเข้าถึง (accessibility)
 * @param fixColor ถ้า true จะไม่เปลี่ยน fill/stroke เดิมของ svg
 *
 * @returns React component ที่ render เป็น:
 *   <svg className={className} {...svgProps}
 *        dangerouslySetInnerHTML={{ __html: svgInner }} />
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
}: Props) {
    const [svgInner, setSvgInner] = useState<string | null>(null);
    const [svgAttrs, setSvgAttrs] = useState<Record<string, string>>({});
    
    useEffect(() => {
        let cancelled = false;
        
        async function process(raw: string) {
            // strip xml prolog
            let s = raw.replace(/<\?xml.*?\?>\s*/g, "");
            
            // default color = currentColor to allow CSS inheritance
            const finalColor = color ?? "currentColor";
            if (!fixColor) {
                s = s.replace(/fill="(?!none)[^"]*"/gi, `fill="${finalColor}"`);
                s = s.replace(/stroke="(?!none)[^"]*"/gi, `stroke="${finalColor}"`);
            }
            
            // extract <svg ...attrs...>inner</svg>
            const m = s.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
            let attrsText = "";
            let inner = s;
            if (m) {
                attrsText = m[1] || "";
                inner = m[2] || "";
            }
            
            // parse attributes into object (simple parser)
            const attrs: Record<string, string> = {};
            attrsText.replace(/([^\s=]+)\s*=\s*"([^"]*)"/g, (_, k, v) => {
                attrs[k] = v;
                return "";
            });
            
            // override width/height with props (size preferred)
            const finalSize = size ?? undefined;
            if (finalSize) {
                attrs.width = String(finalSize);
                attrs.height = String(finalSize);
            } else {
                attrs.width = String(width);
                attrs.height = String(height);
            }
            
            if (!cancelled) {
                setSvgInner(inner);
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
    
    // Build attribute props for <svg>
    const svgProps: React.SVGProps<SVGSVGElement> = {};
    for (const k in svgAttrs) {
        // React uses camelCase for some props (viewBox stays viewBox)
        const propName = k === "viewbox" ? "viewBox" : k;
        // assign as unknown instead any
        (svgProps as unknown as Record<string, string>)[propName] = svgAttrs[k];
    }
    
    // ensure role/aria
    svgProps.role = "img";
    if (alt) svgProps["aria-label"] = alt;
    
    return (
        <svg
        className={className}
        {...svgProps}
        // insert children HTML inside svg
        dangerouslySetInnerHTML={{ __html: svgInner }}
        />
    );
}