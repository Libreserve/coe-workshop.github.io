"use client";

import React, { useEffect, useState } from "react";

type Props = {
  svg?: string;          // raw svg string (preferred)
  src?: string;          // url to fetch (public/)
  width?: number;
  height?: number;
  size?: number;
  color?: string;        // color to embed or omit to use "currentColor"
  className?: string;
  alt?: string;
};

/**
 * @brief for get svg and modify it but it so slow af
 * @param size if want completely squre, if want retangle just use width and height
 * @param color for fixing color icon. can't change
 * @returns <svg className={className} {...svgProps} dangerouslySetInnerHTML={{ __html: svgInner }}
    />
 */
export default function IconSvgMono({
    svg,
    src,
    width = 24,
    height = 24,
    size,
    color,
    className,
    alt,
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
            s = s.replace(/fill="(?!none)[^"]*"/gi, `fill="${finalColor}"`);
            s = s.replace(/stroke="(?!none)[^"]*"/gi, `stroke="${finalColor}"`);
            
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
    }, [svg, src, width, height, size, color]);
    
    if (!svgInner) return null;
    
    // Build attribute props for <svg>
    const svgProps: React.SVGProps<SVGSVGElement> = {};
    for (const k in svgAttrs) {
        // React uses camelCase for some props (viewBox stays viewBox)
        const propName = k === "viewbox" ? "viewBox" : k;
        // assign as any
        (svgProps as any)[propName] = svgAttrs[k];
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

export const searchSvg = `<svg viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.884 23.992l-5.287-5.289a10.255 10.255 0 10-1.893 1.893l5.291 5.292a1.337 1.337 0 101.893-1.892l-.004-.004zM4.899 12.47a7.57 7.57 0 117.57 7.57 7.578 7.578 0 01-7.57-7.57z" 
fill="currentColor"/>
</svg>`
export const basketSvg = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28 8h-6V7a3 3 0 00-3-3h-6a3 3 0 00-3 3v1H4a2 2 0 00-2 2v14a2 2 0 002 2h24a2 2 0 002-2V10a2 2 0 00-2-2zM12 7a1 1 0 011-1h6a1 1 0 011 1v1h-8V7zm16 3v4h-4v-1a1 1 0 00-2 0v1H10v-1a1 1 0 10-2 0v1H4v-4h24zm0 14H4v-8h4v1a1 1 0 102 0v-1h12v1a1 1 0 002 0v-1h4v8z" 
fill="currentColor"/>
</svg>`