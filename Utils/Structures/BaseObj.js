module.exports = class BaseObj {
	constructor(opts = { success, status, statusMessage, data }) {
		this.success = opts.success;
		this.status = opts.status;
		this.statusMessage = opts.statusMessage;
		this.data = opts.data ? opts.data : null;
	}
};
