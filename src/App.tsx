import React from "react";
import "./App.css";
import "./index.css";
import Autocomplete from "./components/Autocomplete";

function App() {
  const suggestions = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Wonderland" },
  ];

  // Custom filter function for objects of type { id: number, name: string }
  const filterOptions = (
    input: string,
    option: { id: number; name: string }
  ) => {
    return option.name.toLowerCase().includes(input.toLowerCase());
  };

  const customInputChange = (input: string) => {
    console.log("custom input change:", input);
  };
  const handleOptionClick = (value: any) => {
    console.log("Selected value:", value);
  };
  return (
    <div className="flex flex-col bg-gray-600 min-h-screen w-full items-center justify-center">
      <Autocomplete
        label="Autocomplete for string array"
        disabled={false}
        options={[
          "Alpha",
          "Beta",
          "Charlie",
          "Delta",
          "Echo",
          "Foxtrot",
          "Gamma",
          "Hotel",
          "India",
        ]}
        onInputChange={customInputChange}
        onChange={handleOptionClick}
      />
      <Autocomplete
        label="Autocomplete for generic <T> array"
        disabled={false}
        options={suggestions}
        filterOptions={filterOptions}
        multiple={false}
        loading={false}
      />
    </div>
  );
}

export default App;
