import { email, length, required } from './validators';

describe('Validators', () =>
{
  describe('email', () =>
  {
    it('returns false on string with invalid email format', () =>
    {
      const string = 'ahmad@ahmad';
      expect(email(string)).toBe(false);
    });

    it('returns true on string with valid email format', () =>
    {
      const string = 'ahmad@ahmad.yadegari';
      expect(email(string)).toBe(true);
    });
  });

  describe('length', () =>
  {
    it('returns false on string with short length', () =>
    {
      const string = 'Ahmad';
      expect(length({ min: 6 })(string)).toBe(false);
    });

    it('returns true on string with enough length', () =>
    {
      const string = 'Ahmad';
      expect(length({ min: 5 })(string)).toBe(true);
    });

    it('returns false on string with long length', () =>
    {
      const string = 'Ahmad';
      expect(length({ max: 4 })(string)).toBe(false);
    });

    it('returns true on string with enough length', () =>
    {
      const string = 'Ahmad';
      expect(length({ max: 5 })(string)).toBe(true);
    });
  });

  describe('required', () =>
  {
    it('returns false on empty string', () =>
    {
      const string = '';
      expect(required(string)).toBe(false);
    });

    it('returns true on not empty string', () =>
    {
      const string = 'ahmad@ahmad.yadegari';
      expect(required(string)).toBe(true);
    });
  });
});
