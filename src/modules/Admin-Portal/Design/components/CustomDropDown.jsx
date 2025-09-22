import { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  width: fit-content;
  flex-grow: 1;
`;

const DropdownButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  width: 100%;
  max-height: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
  padding: 1% 2%;
`;

const SearchBar = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
  align-self: center;
  border-radius: 5px;
  outline: none;
`;


const DropdownList = styled.ul`
    list-style: none;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 255px;
    overflow: auto;
    
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background-color: transparent; 
  }
`

const DropdownItem = styled.div`
  padding: 8px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const CustomDropdown = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        console.log('Selected item:', item);
        setIsOpen(false);
    };

    return (
        <DropdownContainer>
            <DropdownButton onClick={handleToggleDropdown}>
                --- Select ---
            </DropdownButton>
            <DropdownContent isOpen={isOpen}>
                <SearchBar
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <DropdownList> {filteredOptions.map((item, index) => (
                    <DropdownItem key={index} onClick={() => handleItemClick(item)}>
                        {item}
                    </DropdownItem>
                ))}</DropdownList>
            </DropdownContent>
        </DropdownContainer>
    );
};
export default CustomDropdown;
