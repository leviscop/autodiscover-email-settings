module.exports = {
	info: {
		name: process.env.COMPANY_NAME,
		url: process.env.SUPPORT_URL
	},
	domain: process.env.DOMAIN,
	imap: {
		host: process.env.IMAP_HOST,
		port: process.env.IMAP_PORT,
		socket: process.env.IMAP_SOCKET
	},
	imaps: {
		host: process.env.IMAPS_HOST,
		port: process.env.IMAPS_PORT,
		socket: process.env.IMAPS_SOCKET
	},
	pop: {
		host: process.env.POP_HOST,
		port: process.env.POP_PORT,
		socket: process.env.POP_SOCKET
	},
	pops: {
		host: process.env.POPS_HOST,
		port: process.env.POPS_PORT,
		socket: process.env.POPS_SOCKET
	},
	smtp: {
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		socket: process.env.SMTP_SOCKET
	},
	smtps: {
		host: process.env.SMTPS_HOST,
		port: process.env.SMTPS_PORT,
		socket: process.env.SMTPS_SOCKET
	},
	submission: {
		host: process.env.SUBMISSION_HOST,
		port: process.env.SUBMISSION_PORT,
		socket: process.env.SUBMISSION_SOCKET
	},
	mobilesync: {
		url: process.env.MOBILESYNC_URL,
		name: process.env.MOBILESYNC_NAME
	},
	ldap: {
		host: process.env.LDAP_HOST,
		port: process.env.LDAP_PORT,
		socket: process.env.LDAP_SOCKET,
		base: process.env.LDAP_BASE,
		userfield: process.env.LDAP_USER_FIELD,
		usersbase: process.env.LDAP_USER_BASE,
		searchfilter: process.env.LDAP_SEARCH
	},
	mobile: {
		identifier: process.env.PROFILE_IDENTIFIER,
		uuid: process.env.PROFILE_UUID,
		mail: {
			uuid: process.env.MAIL_UUID,
		},
		ldap: {
			uuid: process.env.LDAP_UUID,
		}
	}
};
