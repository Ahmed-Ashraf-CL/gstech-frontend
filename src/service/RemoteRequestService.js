import axios from 'utils/axios';

export function sendAsyncRequest(
	url,
	method,
	data,
	onSuccessCallback,
	onFailureCallback
) {
    console.log(axios.defaults.headers.common.Authorization)
	axios({
		method,
		url,
		data,
		headers: {
			'Accept': 'application/json', // Ensure the request expects JSON
			'Content-Type': 'application/json' // Ensure the request sends JSON
		}
	})
		.then(function (response) {
			onSuccessCallback(response)
		})
		.catch(function (error) {
			onFailureCallback(error)
		})
}

export function sendAuthenticatedAsyncRequestWithResponseType(
	url,
	method,
	data,
	onSuccessCallback,
	onFailureCallback,
	responseType
) {
	const authorizationToken = localStorage.getItem('authorization_token')

	if (authorizationToken !== null) {
		axios({
			method,
			url,
			data,
			headers: { Authorization: authorizationToken },
			responseType
		})
			.then(function (response) {
				onSuccessCallback(response)
			})
			.catch(function (error) {
				onFailureCallback(error)
			})
	} else {
		LoggingUtil.logMessage(
			'User is not authenticated. Redirect to Sign in.'
		)
		// redirect to sign in path
	}
}

export function sendAuthenticatedAsyncRequest(
	uri,
	method,
	data,
	onSuccessCallback,
	onFailureCallback
) {
	sendAuthenticatedAsyncRequestWithResponseType(
		uri,
		method,
		data,
		onSuccessCallback,
		onFailureCallback,
		null
	)
}
