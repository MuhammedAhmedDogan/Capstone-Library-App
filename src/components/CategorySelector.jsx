import * as React from 'react';
import PropTypes from 'prop-types';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const Root = styled('div')`
  color: rgba(0,0,0,1);
  font-size: 1rem;
  width: 70%;
  transition: all 0.3s ease;
  position: relative;
`;

const Label = styled('label')`
  padding: 0;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled('div')`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.87);
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  padding: 4px;
  background-color: #FFFFFF;
  color: rgba(0, 0, 0, 1);
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s ease;

  &.focused {
    border-color: #F37C22;
    box-shadow: inset 0 0 3px #F37C22;
    outline: none;
  }

  & input {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    height: 40px;
    background-color: #FFFFFF;
    color: rgba(0, 0, 0, 1);
    border-radius: 30px;
    box-sizing: border-box;
    padding: 5px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)`
  display: flex;
  align-items: center;
  height: 34px;
  margin: 2px;
  line-height: 22px;
  background-color: #F0F0F0;
  border: 1px solid rgba(0, 0, 0, 0.87);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.87);
  border-radius: 10px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: #F37C22;
    box-shadow: 0 0 2px #F37C22;
  }

  & span {
    font-weight: 500;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 13px;
    cursor: pointer;
    padding: 4px;
    transition: all 0.3s ease;
  }
  & svg:hover {
    color: #FF2400;
  }
`;

const Listbox = styled('ul')`
  width: 100%;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #FFFFFF;
  overflow: auto;
  max-height: 250px;
  border: 1px solid #F37C22;
  box-shadow: inset 0 0 3px #F37C22;
  box-sizing: border-box;
  border-radius: 10px;
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: rgba(0, 0, 0, 0.05);;
    font-weight: 600;

    & svg {
      color: rgba(0, 0, 0, 1);
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: #F37C2230;
    cursor: pointer;

    & svg {
      color: #F37C22;
    }
  }
`;

export default function CategorySelector({ categories, book, setBook }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook',
    defaultValue: [],
    value: book.categories,
    multiple: true,
    options: categories,
    getOptionLabel: (option) => option.name,
    isOptionEqualToValue: (option, value) => option.id === value.id,
    onChange: (event, newValue) => {
      setBook(prevState => ({
        ...prevState,
        categories: newValue
      }));
    },
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}></Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return <StyledTag key={key} {...tagProps} label={option.name} />;
          })}
          <input placeholder={value.length === 0 ? 'Select Categories' : ''} {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            return (
              <li key={key} {...optionProps}>
                <span>{option.name}</span>
                <CheckIcon fontSize="small" />
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}