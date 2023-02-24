export const seatAlphabetToNumber = (part: string) => {
  if (isAlphabetic(part)) {
    switch (part.toUpperCase()) {
      case 'A':
        return 0;
      case 'B':
        return -1;
      case 'C':
        return -2;
      case 'D':
        return -3;
      case 'E':
        return -4;
      case 'F':
        return -5;
      case 'G':
        return -6;
      case 'H':
        return -7;
      case 'I':
        return -8;
      case 'J':
        return -9;
      case 'K':
        return -10;
      case 'L':
        return -11;
      case 'M':
        return -12;
    }
  }
  return parseInt(truncate(part.replace(/^\D+/g, '')));
};

export const seatNumberToAlphabet = (seatNumberStr: string) => {
  if (parseInt(seatNumberStr) > 0) return seatNumberStr;
  switch (seatNumberStr) {
    case '0':
      return 'A';
    case '-1':
      return 'B';
    case '-2':
      return 'C';
    case '-3':
      return 'D';
    case '-4':
      return 'E';
    case '-5':
      return 'F';
    case '-6':
      return 'G';
    case '-7':
      return 'H';
    case '-8':
      return 'I';
    case '-9':
      return 'J';
    case '-10':
      return 'K';
    case '-11':
      return 'L';
    case '-12':
      return 'M';
  }
};

export const isAlphabetic = (unclearString: string) => {
  return unclearString.length === 1 && unclearString.match(/[a-z]/i);
};

const truncate = (text: string) => {
  const withoutEndline = text.replace('\n', '');
  const withoutSpaces = withoutEndline.replace(' ', '');
  const withoutCommas = withoutSpaces.replace(',', '');
  return withoutCommas;
};
