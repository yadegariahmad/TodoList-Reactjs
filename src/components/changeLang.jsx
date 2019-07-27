import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import
{
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ChangeLang = ({ i18n, btnColor }) =>
{
  const [dropdownOpen, toggle] = useState(false);

  const changeLanguage = (lng) =>
  {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonDropdown
      isOpen={dropdownOpen}
      toggle={() => { toggle(!dropdownOpen); }}
      color={btnColor}
    >
      <DropdownToggle caret>
        <i className="fas fa-language" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => { changeLanguage('fa'); }}>فارسی</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={() => { changeLanguage('en'); }}>English</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

ChangeLang.propTypes = {
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func.isRequired,
  }).isRequired,
  btnColor: PropTypes.string,
};

ChangeLang.defaultProps = {
  btnColor: 'light',
};

export default withTranslation()(ChangeLang);
