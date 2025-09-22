import React, { useRef, useState } from 'react';
import Button from '../../common/Button';
import Icon from '../../common/Icon';
import { isBlockActive } from '../../utils/SlateUtilityFunctions';
import usePopup from '../../utils/usePopup';
import { insertEmbed } from '../../utils/embed.js';

const Embed = ({ editor, format }) => {
    const fileInputRef = useRef();
    const [showInput, setShowInput] = usePopup(fileInputRef);
    const [formData, setFormData] = useState({
        file: '',
        width: '',
        height: '',
    });

    const handleButtonClick = (e) => {
        e.preventDefault();
        setShowInput((prev) => !prev);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, file }));
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        insertEmbed(editor, { ...formData }, format);
        setShowInput(false);
        setFormData({
            file: '',
            width: '',
            height: '',
        });
    };

    return (
        <div ref={fileInputRef} className='popup-wrapper'>
            <Button
                active={isBlockActive(editor, format)}
                style={{ border: showInput ? '1px solid lightgray' : '', borderBottom: 'none' }}
                format={format}
                onClick={handleButtonClick}
            >
                <Icon icon={format} />
            </Button>
            {showInput && (
                <div className='popup' style={{borderRadius:'3px'}}>
                    <form onSubmit={handleFormSubmit} style={{display:'flex',flexDirection:'column'}}>
                        <input
                            style={{marginBottom:'5px',borderRadius:'3px',width:'200px'}}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}                            
                        />
                        <input
                            style={{marginBottom:'5px',borderRadius:'3px',width:'fit-content',border:'1px solid'}}
                            type="text"
                            placeholder='Enter width of frame'
                            value={formData.width}
                            onChange={(e) => setFormData((prev) => ({ ...prev, width: e.target.value }))}
                        />
                        <input
                            style={{marginBottom:'5px',borderRadius:'3px',width:'fit-content',border:'1px solid'}}
                            type="text"
                            placeholder='Enter height of frame'
                            value={formData.height}
                            onChange={(e) => setFormData((prev) => ({ ...prev, height: e.target.value }))}
                        />
                        
                        <button  type='submit' style={{padding:'2px',textAlign:'right',width:'fit-content',alignSelf:'flex-end',backgroundColor:'#dee2e6'}}>Save</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Embed;
