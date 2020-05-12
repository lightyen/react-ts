export function keys<T>(instance: T): (keyof T)[] {
	return Object.keys(instance) as (keyof T)[]
}

export function entries<T>(instance: T): [keyof T, T[keyof T]][] {
	return Object.entries(instance) as [keyof T, T[keyof T]][]
}
