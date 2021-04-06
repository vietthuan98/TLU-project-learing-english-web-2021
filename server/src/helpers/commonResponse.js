export default class Response {
    constructor(code = 500, message = 'System errors', data = []) {
        return {
            code,
            message,
            data,
        };
    }
}
