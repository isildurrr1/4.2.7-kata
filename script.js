import {input, debounce, apiResponse} from './script/function.js'

const debouncedHandle = debounce((event) => apiResponse(event.target.value), 600)

input.addEventListener('keyup', event => debouncedHandle(event))

