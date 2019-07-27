const date = () => new Date().toJSON().slice(0, 10).replace(/-/g, '/');

const mapMessageTypeToColor = (type) =>
{
  let retVal = '';
  switch (type)
  {
    case 'error':
      retVal = 'danger';
      break;

    case 'success':
      retVal = 'success';
      break;

    case 'general':
    default:
      retVal = 'primary ';
      break;
  }

  return retVal;
};

const convertEnNumberToFa = (number) =>
{
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const lang = document.querySelector('html').getAttribute('lang');
  let retVal = number;

  if (typeof number === 'number')
  {
    retVal = retVal.toString();
  }

  switch (lang)
  {
    case 'fa':
      retVal = retVal.replace(/[0-9]/g, i => farsiDigits[i]);
      break;

    case 'en':
    default:
      break;
  }

  return retVal;
};

export default {
  date,
  mapMessageTypeToColor,
  convertEnNumberToFa,
};
