export default function LitupButton({
  text,
  className,
  onClick,
}: {
  text?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button className="relative p-[3px]">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#efaf21] to-[#efaf21]" />
      <div
        className={`group relative rounded-[6px] bg-black px-6 py-3 uppercase text-white transition duration-200 ${className}`}
      >
        {text}
      </div>
    </button>
  );
}
