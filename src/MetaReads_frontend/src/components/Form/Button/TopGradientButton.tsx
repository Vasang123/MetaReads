import { ButtonProps } from "../../Props/buttonProps";

export default function TopGradientButton({ onClick, text }: ButtonProps) {
    return (
        <button className="px-8 py-2 rounded-md relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600" onClick={onClick}>
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <span className="relative z-20">
                {text}
            </span>
        </button>

    );
}

