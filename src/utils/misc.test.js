import misc from './miscs';

describe('misc functions', () =>
{
  it('returns today date', () =>
  {
    const todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    expect(misc.date()).toEqual(todayDate);
  });

  it('converts english digits to farsi digits', () =>
  {
    expect(misc.convertEnNumberToFa(1234567890, 'fa')).toEqual('۱۲۳۴۵۶۷۸۹۰');
  });

  it('returns english digits as it is', () =>
  {
    expect(misc.convertEnNumberToFa(1234567890)).toEqual('1234567890');
  });

  describe('message color', () =>
  {
    it('returns danger on error', () =>
    {
      expect(misc.mapMessageTypeToColor('error')).toEqual('danger');
    });

    it('returns success on success', () =>
    {
      expect(misc.mapMessageTypeToColor('success')).toEqual('success');
    });

    it('returns primary on general', () =>
    {
      expect(misc.mapMessageTypeToColor('general')).toEqual('primary');
    });
  });
});
