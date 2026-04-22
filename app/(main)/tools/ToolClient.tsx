"use client";

import SearchBar from "@/app/components/SearchBar/SearchBar";
import styles from "./tools.module.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetToolsQuery } from "@/app/lib/features/tools/toolsApiSlice";
import { ToolCategories } from "@/app/lib/features/tools/tools.type";

const ToolsClient = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || "",
  );
  const [category, setCategory] = useState<ToolCategories | undefined>(
    searchParams.get("category") as ToolCategories | undefined,
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentCategory = searchParams.get("category") as ToolCategories | undefined;
    setSearch(currentSearch);
    setCategory(currentCategory);
  }, [searchParams]);

  const { data: tools, isLoading, isError, error } = useGetToolsQuery({
    category: category,
    search: search || undefined,
  });

  return (
    <div className={styles.tools}>
      <section className={styles.header}>
        <h1 className={styles.header_title}>รายการอุปกรณ์</h1>
        <SearchBar
          borderFocus={true}
          placeholder="ค้นหาอุปกรณ์ที่คุณต้องการ"
          value={search}
          setValue={setSearch}
        ></SearchBar>
      </section>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.toString()}</p>}
      {tools && tools.length === 0 && <p>No tools found</p>}
      {tools && tools.length > 0 && (
        <ul>
          {tools.map((tool) => (
            <li key={tool.id}>{tool.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToolsClient;
