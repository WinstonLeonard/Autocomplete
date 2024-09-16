import React, { useState } from "react";
import { Select, Spin } from "antd";
import "antd/dist/reset.css";

interface AutocompleteProps<T> {
  description?: string;
  disabled?: boolean;
  options: string[] | T[]; // Can be an array of strings or T[]
  filterOptions?: (input: string, option: T) => boolean;
  onInputChange?: (input: string) => void;
  label?: string;
  loading?: boolean;
  multiple?: boolean;
  onChange?: (value: T | string) => void;
  value?: T[] | string[];
  placeHolder?: string;
}

function isStringArray(arr: any[]): arr is string[] {
  return typeof arr[0] === "string";
}

const Autocomplete = <T extends { [key: string]: any }>({
  description = "Description",
  placeHolder = "Search...",
  label = "Label",
  loading = false,
  disabled = false,
  options = [],
  multiple = true,
  onChange,
  onInputChange,
  filterOptions,
}: AutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");

  const valueMap = new Map<string, T>();

  const selectOptions = isStringArray(options)
    ? options.map((option) => ({
        label: option,
        value: option,
      }))
    : options.map((option, index) => {
        const valueKey = `option-${index}`;
        valueMap.set(valueKey, option);
        return {
          label: option.name ? option.name : String(option),
          value: valueKey,
        };
      });

  const customFilterOption = (input: string, option: any) => {
    if (filterOptions) {
      const originalValue = valueMap.get(option.value) || option.value;
      return filterOptions(input, originalValue);
    }

    return option.label.toLowerCase().includes(input.toLowerCase());
  };

  if (loading) {
    return (
      <div className="flex flex-col bg-white rounded-2xl h-48 w-2/5 justify-center p-4 m-5">
        <Spin />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl h-48 w-2/5 justify-center p-4 m-5">
      <p className="mb-3 text-sm text-gray-500">{label}</p>
      <Select
        options={selectOptions} // Use mapped options
        mode={multiple ? "multiple" : undefined}
        size="large"
        disabled={disabled}
        placeholder={placeHolder}
        allowClear={true}
        suffixIcon={null}
        showSearch
        onSearch={onInputChange}
        onChange={onChange}
        filterOption={customFilterOption}
      />
    </div>
  );
};

export default Autocomplete;
