import { TabsProps } from "./Tabs.type";
import styles from "./Tabs.module.scss";
import IconSvgMono from "@/app/components/Icon/SvgIconMono";
export const Tabs = ({ TabsOptions }: TabsProps) => {
  return (
    <div>
      <div className={styles.action}>
        {TabsOptions.map((t, index) => (
          <button
            className={`${styles.action_inner} ${t.isSelect ? styles.action_select : ""}`}
            key={index}
            onClick={() => {
              t.action?.();
            }}
          >
            {t.icon && (
              <IconSvgMono
                width={16}
                height={16}
                src={t.icon}
                alt={t.icon}
              ></IconSvgMono>
            )}
            <h2 className={styles.action_text}>{t.options}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};
