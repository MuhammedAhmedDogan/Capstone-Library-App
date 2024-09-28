import * as React from 'react';
import { useEffect } from 'react';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
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

export default function BookSelector({ newBooks, borrow, setBorrow }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'book-selector',
    multiple: false,
    options: newBooks,
    value: borrow.book,
    getOptionLabel: (option) => option.name,
    isOptionEqualToValue: (option, value) => option.id === value.id,
    onChange: (event, newValue) => {
      if (newValue && newValue.stock === 0) {
        setBorrow(prevState => ({
          ...prevState,
          book: { id: 0, name: '', stock: 0 },
          bookForBorrowingRequest: { id: 0, name: '', stock: 0 }
        }));
        return;
      }
      setBorrow(prevState => ({
        ...prevState,
        book: newValue,
        bookForBorrowingRequest: newValue
      }));
    },
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}></Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          <input placeholder={'Select Book'} {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            if (option.id === 0) {
              return null;
            }
            if (option.stock === 0) {
              return (
                <li key={key}
                  {...optionProps}
                  onClick={(e) => option.stock === 0 && e.preventDefault()}
                  style={{ cursor: 'not-allowed' }} >
                  <span style={{ color: '#FF2400' }}>{option.name} - Out of stock</span>
                  <NotInterestedIcon fontSize="small" />
                </li>
              );
            }
            return (
              <li key={key} {...optionProps}>
                <span>{option.name} - Stock: {option.stock}</span>
                <CheckIcon fontSize="small" />
              </li>
            );
          })}
        </Listbox>
      ) : null}
    </Root>
  );
}