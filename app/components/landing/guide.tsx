import React from "react";

interface StepBlogProps {
  Index?: number;
  Cover: string;
  Title: string;
  Description: string;
}

function StepBlog({ Index, Cover, Title, Description }: StepBlogProps) {
  return (
    <div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function Guide() {
  const stepBlog: StepBlogProps[] = [
    {
      Cover: "/landing/01_printer.png",
      Title: "Title",
      Description: "Description",
    },
    {
      Cover: "/landing/01_printer.png",
      Title: "Title",
      Description: "Description",
    },
    {
      Cover: "/landing/01_printer.png",
      Title: "Title",
      Description: "Description",
    },
  ];

  return (
    <div>
      <div></div>
      <div>
        {stepBlog.map((item, index) => (
          <StepBlog
            key={index}
            Index={index}
            Cover={item.Cover}
            Title={item.Title}
            Description={item.Description}
          ></StepBlog>
        ))}
      </div>
    </div>
  );
}

export default Guide;
