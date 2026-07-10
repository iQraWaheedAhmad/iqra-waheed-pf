export type HeroChip = {
  label: string;
  className: string;
};

export const heroChips: HeroChip[] = [
  { label: "<Navbar />", className: "float-a top-[14%] left-[4%] md:left-[8%]" },
  { label: "Button", className: "float-b top-[62%] left-[2%] md:left-[6%]" },
  { label: "{ props }", className: "float-c top-[8%] right-[4%] md:right-[10%]" },
  { label: "Card", className: "float-a top-[70%] right-[6%] md:right-[14%]" },
  { label: "useEffect()", className: "float-b top-[40%] right-[1%] md:right-[2%]" },
];
