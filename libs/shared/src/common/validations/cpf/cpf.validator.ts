const ALL_DIGITS_EQUAL_PATTERN = /^(\d)\1{10}$/;
const NON_NUMERIC_PATTERN = /\D/g;

export class CpfValidator {
  validate(cpf: string) {
    const cleanCpf = this.cleanCpf(cpf);

    if (!this.hasValidLength(cleanCpf) || this.hasAllEqualDigits(cleanCpf)) {
      return false;
    }

    return this.hasValidDigits(cleanCpf);
  }

  private cleanCpf(cpf: string): string {
    return cpf.replace(NON_NUMERIC_PATTERN, '');
  }

  private hasValidLength(cpf: string): boolean {
    return cpf.length === 11;
  }

  private hasAllEqualDigits(cpf: string): boolean {
    return ALL_DIGITS_EQUAL_PATTERN.test(cpf);
  }

  private hasValidDigits(cpf: string): boolean {
    const calculateDigit = (base: string, factor: number): number => {
      const total = base
        .split('')
        .map((num, index) => parseInt(num) * (factor - index))
        .reduce((acc, curr) => acc + curr, 0);
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstNineDigits = cpf.substring(0, 9);
    const firstDigit = calculateDigit(firstNineDigits, 10);
    if (parseInt(cpf[9]) !== firstDigit) return false;

    const firstTenDigits = cpf.substring(0, 10);
    const secondDigit = calculateDigit(firstTenDigits, 11);
    if (parseInt(cpf[10]) !== secondDigit) return false;

    return true;
  }
}
