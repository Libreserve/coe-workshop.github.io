// its a grave ard bro 💀💀💀💀💀

"use client";

type Props = {
  svg: string;            // raw svg text
  size?: number;
  width?: number;
  height?: number;
  color?: string;        // optional: if provided, will embed this color into SVG before encoding
  className?: string;
  alt?: string;
};

const defaultColor = "currentColor"

export default function IconImg({ svg, size, width = 24, height = 24, color, className, alt }: Props) {
  // copy raw svg and optionally replace fill/stroke with provided color
  let svgText = svg.replace(/<\?xml.*?\?>\s*/g, "");
  if (color) {
    svgText = svgText.replace(/fill="(?!none)[^"]*"/gi, `fill="${color}"`);
    svgText = svgText.replace(/stroke="(?!none)[^"]*"/gi, `stroke="${color}"`);
} else {
    // กันแตก
    svgText = svgText.replace(/fill="(?!none)[^"]*"/gi, `fill="${defaultColor}"`);
    svgText = svgText.replace(/stroke="(?!none)[^"]*"/gi, `stroke="${defaultColor}"`);
  }
  // ensure width/height attributes (optional)
  const finalSize = size ?? undefined;
  if (finalSize) {
    svgText = svgText.replace(/<svg([^>]*)>/i, `<svg$1 width="${finalSize}" height="${finalSize}">`);
  } else {
    svgText = svgText.replace(/<svg([^>]*)>/i, `<svg$1 width="${width}" height="${height}">`);
  }

  const encoded = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
  return <img className={className} src={encoded} width={size ?? width} height={size ?? height} alt={alt ?? ""} />;
}

export const searchSvg = `<svg viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.884 23.992l-5.287-5.289a10.255 10.255 0 10-1.893 1.893l5.291 5.292a1.337 1.337 0 101.893-1.892l-.004-.004zM4.899 12.47a7.57 7.57 0 117.57 7.57 7.578 7.578 0 01-7.57-7.57z" 
fill="currentColor"/>
</svg>`
export const basketSvg = `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28 8h-6V7a3 3 0 00-3-3h-6a3 3 0 00-3 3v1H4a2 2 0 00-2 2v14a2 2 0 002 2h24a2 2 0 002-2V10a2 2 0 00-2-2zM12 7a1 1 0 011-1h6a1 1 0 011 1v1h-8V7zm16 3v4h-4v-1a1 1 0 00-2 0v1H10v-1a1 1 0 10-2 0v1H4v-4h24zm0 14H4v-8h4v1a1 1 0 102 0v-1h12v1a1 1 0 002 0v-1h4v8z" 
fill="currentColor"/>
</svg>`