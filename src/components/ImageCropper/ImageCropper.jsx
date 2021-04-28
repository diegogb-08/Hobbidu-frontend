import React, { useRef, useState } from 'react';

import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

import getCroppedImg from '../../tools/cropImage.js'
import {dataURLtoFile} from '../../tools/dataURLtoFile'

const ImageCropper = (props) => {

    const inputRef = useRef();

    const triggerFileSelectPopup = () => inputRef.current.click();

    const [image, setImage] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};
    
    // Functions

    const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

    const onUpload = async () => {

        if (image){

            const canvas = await getCroppedImg(image, croppedArea);
            const canvasDataUrl = canvas.toDataURL('image/jpeg')
            const convertedUrlToFile = dataURLtoFile(canvasDataUrl, 'hobbidu-image.jpeg')
            
            const formData = new FormData();

            formData.append('croppedImage', convertedUrlToFile)
          
            props.onChange(formData)
        }
	};

    return (
        <div className="imageCropperComponent">
            <div className="cropperContainer">
                {
                    image ? (
                        <> 
                            <div className="cropper">
                                <Cropper 
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />

                            </div>

                            <div className="slider">
                                <Slider 
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e, zoom) => setZoom(zoom)}
                                />

                            </div>
                        </>
                        
                    ) : null
                }
            </div>
            <div className="buttonContainer">
                <input 
                    type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
                />
                <Button 
                    variant='contained'
					color='primary'
					style={{ marginRight: "10px" }}
                    onClick={()=>setImage(null)}
                >
                    Clear
                </Button>

                <Button 
                    variant='outlined'
					color='primary'
					onClick={triggerFileSelectPopup}
					style={{ marginRight: "10px" }}
                >
                    Choose
                </Button>
                <Button 
                    variant='outlined' 
                    color="secondary"
                    onClick={()=>onUpload()}
                >
                    Upload
                </Button>
            </div>
        </div>
    )
}

export default ImageCropper
