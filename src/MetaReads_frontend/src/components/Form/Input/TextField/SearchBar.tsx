import SearchLogo from "../../../../../public/assets/Search Logo.png";
import { InputProps } from "../../../Props/inputFieldProps";

export default function SearchBar({ value: query, onChange }: InputProps) {
  return (
    <div
      style={{
        padding: "9px 12px",
        borderRadius: "8px",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        gap: "0.5em",
        alignItems: "center",
        backgroundColor: "#1F2329", 
      }}
    >
      <img src={SearchLogo} alt="looking-glass" height={24} width={24} />
      <div className="flex items-center justify-center">
        <div
          style={{
            borderLeft: "2px solid #DDE6ED", 
            height: "30px", 
            margin: "0 10px", 
          }}
        />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e)}
        style={{
          width: "100%",
          border: "none",
          zIndex: "1",
          backgroundColor: "#1F2329",
          color: "white",
          padding: "4px",
          outline: "none",
        }}
        placeholder="Search..."
      />
    </div>
  );
}
