// Setting up currID and data, if not found
if (!localStorage.currID && !localStorage.data) {
	localStorage.setItem('data', '[]');

	const getData = JSON.parse(localStorage.getItem('data'));
	localStorage.setItem('currID', getData[getData.length - 1] || 1);
}

export default function getData() {
	const getLocalStorageData = JSON.parse(localStorage.getItem('data'));

	const result = [];

	// Appending each data from localStorage to result array (of Object) with `selected: false`
	getLocalStorageData.forEach((each) => {
		result.push({
			selected: false,
			...each,
		});
	});

	return result;
}
