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
