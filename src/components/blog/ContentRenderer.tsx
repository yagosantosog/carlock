type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  text?: string;
};

type ContentRendererProps = {
  content: RichTextNode[];
};

export function ContentRenderer({ content }: ContentRendererProps) {
  if (!Array.isArray(content)) return null;

  return (
    <>
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="mb-6 leading-relaxed">
                {block.children?.map((child, i) => child.text).join("")}
              </p>
            );

          case "heading":
            return (
              <h2 key={index} className="mt-10 mb-4 text-2xl font-bold">
                {block.children?.map((child, i) => child.text).join("")}
              </h2>
            );

          case "list":
            return (
              <ul key={index} className="mb-6 list-disc pl-6">
                {block.children?.map((item, i) => (
                  <li key={i} className="mb-2">
                    {item.children?.map((child) => child.text).join("")}
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
