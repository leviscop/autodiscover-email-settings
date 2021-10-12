module.exports = {
	info: {
		name: process.env.AD_COMPANY_NAME,
		url: process.env.AD_SUPPORT_URL
	},
	domain: process.env.AD_DOMAIN,
	imap: {
		host: process.env.AD_IMAP_HOST,
		port: process.env.AD_IMAP_PORT,
		socket: process.env.AD_IMAP_SOCKET
	},
	imaps: {
		host: process.env.AD_IMAPS_HOST,
		port: process.env.AD_IMAPS_PORT,
		socket: process.env.AD_IMAPS_SOCKET
	},
	pop: {
		host: process.env.AD_POP_HOST,
		port: process.env.AD_POP_PORT,
		socket: process.env.AD_POP_SOCKET
	},
	pops: {
		host: process.env.AD_POPS_HOST,
		port: process.env.AD_POPS_PORT,
		socket: process.env.AD_POPS_SOCKET
	},
	smtp: {
		host: process.env.AD_SMTP_HOST,
		port: process.env.AD_SMTP_PORT,
		socket: process.env.AD_SMTP_SOCKET
	},
	smtps: {
		host: process.env.AD_SMTPS_HOST,
		port: process.env.AD_SMTPS_PORT,
		socket: process.env.AD_SMTPS_SOCKET
	},
	submission: {
		host: process.env.AD_SUBMISSION_HOST,
		port: process.env.AD_SUBMISSION_PORT,
		socket: process.env.AD_SUBMISSION_SOCKET
	},
	mobilesync: {
		url: process.env.AD_MOBILESYNC_URL,
		name: process.env.AD_MOBILESYNC_NAME
	},
	ldap: {
		host: process.env.AD_LDAP_HOST,
		port: process.env.AD_LDAP_PORT,
		socket: process.env.AD_LDAP_SOCKET,
		base: process.env.AD_LDAP_BASE,
		userfield: process.env.AD_LDAP_USER_FIELD,
		usersbase: process.env.AD_LDAP_USER_BASE,
		searchfilter: process.env.AD_LDAP_SEARCH
	},
	mobile: {
		identifier: process.env.AD_PROFILE_IDENTIFIER,
		uuid: process.env.AD_PROFILE_UUID,
		mail: {
			uuid: process.env.AD_MAIL_UUID,
		},
		ldap: {
			uuid: process.env.AD_LDAP_UUID,
		}
	}
};
