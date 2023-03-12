interface NonMinifiedTextProps {
  text: string;
}

export function NonMinifiedText({ text }: NonMinifiedTextProps) {
  const isClient = !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: isClient
          ? text
          : `<!-- htmlmin:ignore -->${text}<!-- htmlmin:ignore -->`
      }}
    />
  );
}
