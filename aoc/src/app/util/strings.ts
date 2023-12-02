import { stringIsSetAndFilled } from './values';

export function capitalizeFirstLetter(str: string): string {
	if (!stringIsSetAndFilled(str)) {
		return null;
	}
	return (str.charAt(0)?.toUpperCase() ?? '') + (str.slice(1) ?? '');
}
