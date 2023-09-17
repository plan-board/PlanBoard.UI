export function fNWCommas(number) {
    // Round down the number to remove decimal values
    const integerPart = Math.trunc(number);

    // Convert the integer part to a string
    let numberString = integerPart.toString();

    // Use a regular expression to add commas as a thousands separator
    numberString = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return numberString;

}

export function GetPercent(firstVal, secondVal) {
    if (secondVal === 0) {
        return (
            <span className="red-percent">(0%)</span>
        );
    }

    const perVal = (firstVal / secondVal) * 100;
    return (
        <span className={`${perVal > 15 ? 'green-percent' : 'red-percent'}`}>
            ({perVal.toFixed(0)}%)
        </span>
    )
    // {((totalYTDValue / totalCYValue) * 100).toFixed(0)}%
}

export function getMoths() {
    const months = [
        "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"
    ];
    return months;
}