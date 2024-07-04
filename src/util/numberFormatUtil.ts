function formatNumberWithSuffix(num: number): string {
  // Define the suffixes
  const suffixes = ["", "K", "M", "B"];
  
  // Determine the appropriate suffix index based on the number of digits
  const suffixIndex = Math.floor(Math.log10(Math.abs(num)) / 3);
  
  // Calculate the scaled number
  const scaledNum = num / Math.pow(10, suffixIndex * 3);
  
  // Round the scaled number to two decimal places
  const roundedNum = scaledNum.toFixed(2);
  
  // Append the suffix to the rounded number
  return roundedNum + suffixes[suffixIndex];
}

export default formatNumberWithSuffix;