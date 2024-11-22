import { ButtonProps } from "../../Props/buttonProps";

export default function GradientButton({ onClick, text, color }: ButtonProps) {
  return (
    <button className="relative p-[3px]" onClick={onClick}>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 to-cyan-600" />
      <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent">
        {text}
      </div>
    </button>
  );
}
