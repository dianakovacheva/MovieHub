import HeaderSection from "./header-section";

export default function MovieSuggestions({ movieSuggestions }) {
  const sectionName = "More like this";
  return (
    <div className="container">
      <HeaderSection sectionName={sectionName} data={0} />
    </div>
  );
}
