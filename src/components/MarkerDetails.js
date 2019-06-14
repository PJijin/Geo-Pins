import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import LocationIcon from '@material-ui/icons/LocationOn';

const deleteItem = (id, markLocations, setMarkLocation) => {
	const newList = markLocations.filter((item, index) => index !== id);
	localStorage.setItem('markLocations', newList);
	setMarkLocation(newList);
};

export default function MarkerDetails({ markLocations, setmarkLocations }) {
	return (
		<>
			<h4>
				<LocationIcon /> Pin Location
			</h4>
			<ul>
				{markLocations.length === 0 ? <span className="text-muted">No Location added</span> : ''}
				{markLocations.map((data, index) => (
					<li key={data.title}>
						<div className="flex">
							<div>{data.img && <img width="150px" src={data.img} alt={data.title} />}</div>
							<div className="grow card-style">
								<h4>{data.title}</h4>
								<p>
									<IconButton
										className="right"
										onClick={e => {
											deleteItem(index, markLocations, setmarkLocations);
										}}
									>
										<DeleteIcon />
									</IconButton>
									{data.desc}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}
