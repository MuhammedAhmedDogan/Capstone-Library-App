import * as React from 'react';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
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

export default function ItemSelector({ itemKey, items, item, setItem }) {
  const newItems = [...items, { id: 0, name: '' }];
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
    id: `${itemKey.toLowerCase()}-selector`,
    multiple: false,
    options: newItems,
    value: item[itemKey.toLowerCase()],
    getOptionLabel: (option) => option.name,
    isOptionEqualToValue: (option, value) => option.id === value.id,
    onChange: (event, newValue) => {
      setItem(prevState => ({
        ...prevState,
        [itemKey.toLowerCase()]: newValue
      }));
    },
  });

  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}></Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          <input placeholder={`Select ${itemKey}`} {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => {
            const { key, ...optionProps } = getOptionProps({ option, index });
            if (option.id === 0) {
              return null;
            }
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