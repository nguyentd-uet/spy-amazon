import { useState, useCallback} from "react";

const useInputValue = (initialValue) => {
  let [value, setValue] = useState(initialValue);
  // usecallback in here to prevent setState multiple
  // Only setState when change second paramatter
  // Detail in https://reactjs.org/docs/hooks-reference.html#usecallback
  let onChange = useCallback(function(event) {
    setValue(event.currentTarget.value);
  }, []);
  return {
    value,
    onChange
  };
};

console.log(typeof(useInputValue))
export default useInputValue;