import styles from "@/app/components/TruncateTools/TruncateTools.module.scss";

interface Item {
    title:string,
    quantity: number
}
// type Items = Item[];
interface Items {
    items: Item[]
}

function truncateString(str: string, max: number ) {
    if (str.length <= max) return str;
    return str.slice(0, max) + "...";
}

function TruncateTools({items}:Items) {
    const itemString = items.map((item:Item) => `${item.title}*${item.quantity}`).join(", ");
  return(
    <>
        <div className={styles.tooltip}>
            {truncateString(itemString, 20)}
            <div className={styles.tooltip_text} >
                {   
                    items.map((item, index) => 
                        {   
                            return (
                            <div key={`${index}-${item.title}`}>
                                {`${item.title}*${item.quantity}`}
                            </div>
                        )}
                    )
                }
            </div>
        </div>
    </>
  );  
};

export default TruncateTools;