export default function containsInArray(values, value) {
	const isContainsInValues = values.some((eachValue) => {
		return eachValue === value;
	});

	if (!isContainsInValues) {
		throw new Error(`Value Error: value='${value}' must be in [${values}]`);
	}

	return isContainsInValues;
}

let x = containsInArray([1, 2, 3, 4], 4);

console.log(x);
