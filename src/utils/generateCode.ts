function zeroPad(number, width) {
  return String(number).padStart(width, '0');
}
export function genEmployeeCode(prefix, lastEmpCode?: string) {
  let empCode = '';

  if (!lastEmpCode) {
    empCode = prefix + '001';
  } else {
    const match = Number(lastEmpCode.match(/\d+/)) + 1;
    if (match.toString().length < 3) {
      empCode = prefix + zeroPad(match, 3);
    } else {
      empCode = prefix + match;
    }
  }
  return empCode;
}
