import createNumberMask from 'text-mask-addons/dist/createNumberMask';
export function decimalsNumberMask(decimalLimit: number, integerLimit: number) {
  return createNumberMask({
    prefix: '',
    allowDecimal: true,
    includeThousandsSeparator: false,
    decimalLimit: decimalLimit,
    integerLimit: integerLimit,
    requireDecimal: false
  });
}
export function integerNumberMask() {
  return createNumberMask({
    prefix: '',
    allowDecimal: false,
    includeThousandsSeparator: false,
    requireDecimal: false
  });
}
