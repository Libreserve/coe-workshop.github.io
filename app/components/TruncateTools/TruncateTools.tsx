import styles from "@/app/components/TruncateTools/TruncateTools.module.scss";

interface Item {
    title:string,
    quantity: number
}
// type Items = Item[];
interface Items {
    items: Item[]
}


function truncateToolName(tool:Item[], max:number): string {
    let result = "";
    for (let i = 0; i < tool.length; i++) {
        const itemString = `${tool[i].title}*${tool[i].quantity}`;
        const separator = result.length === 0 ? "" : ", ";
        if (result.length + separator.length + itemString.length > max) {
            return result + "...";
        }
        result += separator + itemString;
    }

    return result;
}

function TruncateTools({items}:Items) {
    const max:number = 20;
  return(
    <>
        <div className={styles.tooltip}>
            {truncateToolName(items, max)}
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