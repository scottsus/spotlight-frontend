// Mapping each site to its own checkout scraping method

const siteNames = [
    'seatgeek',
    'stubhub',
    'ticketmaster',
    'tickpick'
]

const seatgeekScrape:(string) => string[] = (text:string) => {
    const parts = parse(text);
    let sIdx = 0, rIdx = 0, pIdx = 0, dollarSignCount = 0;
    while (sIdx < parts.length && parts[sIdx] !== 'Section') {
        sIdx++;
    }
    while (rIdx < parts.length && parts[rIdx] !== 'Row') {
        rIdx++
    }
    while (pIdx < parts.length && dollarSignCount < 2) {
        pIdx++;
        if (parts[pIdx].charAt(0) === '$')
            dollarSignCount++;
    }
    const sectionNumber = truncate(parts[sIdx + 1]);
    const rowNumber = truncate(parts[rIdx + 1]);
    const price = truncate(parts[pIdx].substring(1));
    const quantity = parts[pIdx + 2];
    check(parts, sectionNumber, rowNumber, parseFloat(price) * quantity, quantity);
    return [sectionNumber, rowNumber, parseFloat(price) * quantity, quantity]
}

const ticketmasterScrape:(string) => string[] = (text:string) => {
    const parts = parse(text);
    let sIdx = 0, rIdx = 0, pIdx = 0, qIdx = 0;
    while (sIdx < parts.length && parts[sIdx] !== 'Tickets-Sec') {
        sIdx++;
    }
    while (rIdx < parts.length && parts[rIdx] !== 'Row') {
        rIdx++;
    }
    while (pIdx < parts.length && parts[pIdx].charAt(0) !== '$') {
        pIdx++;
    }
    while (qIdx < parts.length && parts[qIdx] !== 'x') {
        qIdx++;
    }
    const sectionNumber = truncate(parts[sIdx + 1]);
    const rowNumber = truncate(parts[rIdx + 1]);
    const totalPrice = truncate(parts[pIdx].substring(1));
    const quantity = parts[qIdx + 1];
    check(parts, sectionNumber, rowNumber, totalPrice, quantity);
    return [sectionNumber, rowNumber, totalPrice, quantity]
}

const parse = (text:string) => {
    const spaces = text.split(' ')
    let parts = []
    for (const space of spaces) {
        const newlines = space.split('\n')
        for (const newline of newlines)
        if (newline !== '')
            parts.push(newline)
    }
    return parts;
}

const truncate = (text:string) => {
    const withoutEndline = text.replace('\n', '')
    const withoutSpaces = withoutEndline.replace(' ', '')
    const withoutCommas = withoutSpaces.replace(',', '')
    return withoutCommas
}

const check = (parts:string[], sectionNumber:string, rowNumber:string, totalPrice:string | number, quantity:string) => {
    // console.log(parts);
    console.log('Section:', sectionNumber);
    console.log('Row:', rowNumber);
    console.log('Price:', totalPrice);
    console.log('Quantity:', quantity);
}

export const getNameFromURL = (url:string) => {
    for (const siteName of siteNames) {
        if (url.includes(siteName))
            return siteName;
    }
    return "";
}

const siteMap = {
    'seatgeek': seatgeekScrape,
    'ticketmaster': ticketmasterScrape,
}

export default siteMap