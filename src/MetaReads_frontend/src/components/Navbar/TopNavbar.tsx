import { useState } from "react";
import SearchBar from "../Form/Input/TextField/SearchBar";
import NavbarProfile from "../Profile/NavbarProfile";

interface navbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function TopNavbar({ search, setSearch }: navbarProps) {
  const [query, setQuery] = useState<string>("");

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
  };
  return (
    <div className="h-[100px] w-full bg-[#14181E] text-white transition-all duration-300">
      {/* Set relative positioning on the parent to constrain the absolute div */}
      <div className="relative h-full w-full">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#d",
            opacity: "0.11",
            zIndex: 1,
          }}
        ></div>

        <div className="relative z-10 flex h-full w-full items-center gap-2 px-4">
          {/* SearchBar takes the remaining space */}
          <div className="flex-grow transition-all duration-300">
            <SearchBar
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>

          {/* NavbarProfile has a fixed width */}
          <div className="w-[200px]">
            <NavbarProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
