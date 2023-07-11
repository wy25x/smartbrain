import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img id="inputimage" width="500px" height="auto" src={imageUrl} />
				{
					boxes.map(box => {
						return (<div style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} className="bounding-box"></div>)
					})
				}
			</div>
		</div>
	)
}

export default FaceRecognition;
