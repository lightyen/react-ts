import React from "react"
import axios from "axios"

// custom hook sample: axios fetch data

export function useData() {
	const [data, setData] = React.useState()
	React.useEffect(() => {
		const source = axios.CancelToken.source()
		axios
			.get(`https://api.github.com/repos/facebook/react/issues?state=all&page=1`, { cancelToken: source.token })
			.then(resp => {
				setData(resp.data)
			})
			.catch()
		return () => source.cancel()
	}, [])
	return { data }
}
