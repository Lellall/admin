export function formatCurrency(
  amount: any,
  currencySymbol = "₦",
  decimalDigits = 2,
  decimalSeparator = ".",
  thousandSeparator = ","
) {
  if (amount === undefined || amount === null) {
    return `${currencySymbol}0.00`
  }

  const fixedAmount = parseFloat(amount).toFixed(decimalDigits)
  const parts = fixedAmount.split(".")
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
  const decimalPart = parts[1] ? decimalSeparator + parts[1] : ""
  return currencySymbol + integerPart + decimalPart
}

export const formatDateTime = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hour = String(date.getHours()).padStart(2, "0")
  const minute = String(date.getMinutes()).padStart(2, "0")
  const second = String(date.getSeconds()).padStart(2, "0")
  const millisecond = String(date.getMilliseconds()).padStart(3, "0")

  const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`

  return formattedDateTime
}

export const thousandFormatter = (num: number) => new Intl.NumberFormat().format(num)

export const capitalizeFirstLetter = (input: string): string => {
  return input.length > 0 ? input.charAt(0).toUpperCase() + input.slice(1).toLowerCase() : input
}
const exceptions: string[] = ["and", "in", "of"]
export const capitalizeFirstLetterOFEachWord = (input: string): string => {
  if (!input) {
    return ""
  }
  return input
    .split(" ")
    .map((word) => {
      const lowerCasedWord = word.toLowerCase()
      return exceptions.includes(lowerCasedWord)
        ? lowerCasedWord
        : lowerCasedWord.charAt(0).toUpperCase() + lowerCasedWord.slice(1)
    })
    .join(" ")
}
