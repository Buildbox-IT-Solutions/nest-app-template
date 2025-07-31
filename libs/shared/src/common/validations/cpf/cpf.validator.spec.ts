import { CpfValidator } from './cpf.validator';

describe('CpfValidator', () => {
  let validator: CpfValidator;

  beforeEach(() => {
    validator = new CpfValidator();
  });

  describe('hasValidDigits', () => {
    it('should return false when first verification digit is invalid', () => {
      const cpfWithInvalidFirstDigit = '52998224745';
      expect(validator.validate(cpfWithInvalidFirstDigit)).toBe(false);
    });

    it('should return false when second verification digit is invalid', () => {
      const cpfWithInvalidSecondDigit = '52998224736';
      expect(validator.validate(cpfWithInvalidSecondDigit)).toBe(false);
    });

    it('should return true when both verification digits are valid', () => {
      const validCpf = '35713797309';
      expect(validator.validate(validCpf)).toBe(true);
    });

    it('should return true for valid CPF with verification digits where remainder < 2', () => {
      const cpfWithRemainderLessThanTwo = '19845418708';
      expect(validator.validate(cpfWithRemainderLessThanTwo)).toBe(true);
    });
  });
});
