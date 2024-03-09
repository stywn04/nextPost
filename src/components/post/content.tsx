interface PostContentProps {
  image: string | null;
  content: string;
}
export function PostContent({ image, content }: PostContentProps) {
  return (
    <div className="py-5 whitespace-pre-line">
      {image ? (
        <img
          src={image}
          alt={content}
          className="w-full h-full rounded-md mb-2"
        />
      ) : null}
      <p>{content}</p>
    </div>
  );
}
