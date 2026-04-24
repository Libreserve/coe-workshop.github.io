import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
// removed unused forward-ref types; direct `displayName` assignment below
import { TagInputProps, TagItem } from "./TagInput.type";
import styles from "./TagInput.module.scss";
 
export const TagInput = forwardRef<unknown, TagInputProps>(({ placeholder, initialAssets = [] }, ref) => {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [Tag, setTag] = useState<TagItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [duplicateValue, setDuplicateValue] = useState<string | null>(null);
  const lastAddedIdRef = useRef<string | null>(null);
 
  useImperativeHandle(ref, () => ({
    getValues: () => Tag.map((t) => t.value),
  }));
 
  const onTagInput = (element: React.KeyboardEvent<HTMLInputElement>) => {
    if (currentInput === "") return;
 
    if (element.key === "Enter") {
      // ตรวจว่ามีซ้ำหรือไม่
      const newValue = currentInput.trim();
      const isDuplicate = Tag.some((t) => t.value === newValue);
      if (isDuplicate) {
        setDuplicateValue(newValue); // highlight tag ที่ซ้ำ
        setError(`AssetId "${newValue}" ถูกเพิ่มแล้ว`);
        return;
      }
      const newTag: TagItem = { id: crypto.randomUUID(), value: currentInput }; // collect tag id for scrolling
      setCurrentInput("");
      // sorting
      setTag((prev) => [...prev, newTag].sort((a, b) => a.value.localeCompare(b.value)));
      lastAddedIdRef.current = newTag.id; // เก็บ id ของ tag ที่เพิ่งเพิ่ม
      setDuplicateValue(null);
    }
  };
 
  const onDeleteTag = (idx: number): void => {
    const tagElement = document.querySelectorAll(`.${styles.tag_body}`)[idx];
    tagElement?.classList.add(styles.tag_removing);
 
    setTimeout(() => {
      setTag((prev) => prev.filter((_, i) => idx !== i));
    }, 150);
  };
 
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
 
    // duplicate effect
    if (duplicateValue) {
      const el = document.querySelector(`[data-tag-value="${duplicateValue}"]`) as HTMLElement;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      timer = setTimeout(() => {
        setDuplicateValue(null);
      }, 2000);
    }
 
    // create effect
    if (lastAddedIdRef.current) {
      const el = document.querySelector(
        `[data-tag-id="${lastAddedIdRef.current}"]`
      ) as HTMLElement;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.classList.add(styles.tag_enter);
      timer = setTimeout(() => {
        el?.classList.remove(styles.tag_enter); // reset class
        setDuplicateValue(null);
      }, 1000);
      lastAddedIdRef.current = null; // reset ref ไม่ trigger render
    }
 
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [Tag, initialAssets, duplicateValue, lastAddedIdRef]);
 
  return (
    <div className={styles.tagInput}>
      {/* {label && <label htmlFor="">{label}</label>} */}
      <div className={styles.tag_collection}>
        {Tag.map((t, index) => (
          <div className={`${styles.tag_body} ${duplicateValue === t.value ? styles.tag_duplicate : ""}`} 
          key={t.id} data-tag-id={t.id} data-tag-value={t.value}>
            {t.value}
            <button
              onClick={() => onDeleteTag(index)}
              type="button"
              className={styles.tag_delete}
            >
              x
            </button>
          </div>
        ))}
        <input
          className={`${styles.tag_input} ${error ? styles.error_input : ""}`}
          placeholder={placeholder}
          value={currentInput}
          type="text"
          onChange={(e) => {
            setCurrentInput(e.target.value); 
            setError(null);
          }}
          onKeyDown={onTagInput}
        />
      </div>
    </div>
  );
});
 
TagInput.displayName = "TagInput";
