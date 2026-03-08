export const currencyFormatter = (amount: string, currency: 'USD' | 'INR') => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:currency
    })

    return formatter.format(parseInt(amount))
}