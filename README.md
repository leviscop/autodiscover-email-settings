# ![Autodiscover](icon.svg) Autodiscover Email Settings

[![Build Status](https://travis-ci.org/Monogramm/autodiscover-email-settings.svg)](https://travis-ci.org/Monogramm/autodiscover-email-settings)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f471992f0aa348b791c9ed17ccea344d)](https://www.codacy.com/gh/Monogramm/autodiscover-email-settings?utm_source=github.com&utm_medium=referral&utm_content=Monogramm/autodiscover-email-settings&utm_campaign=Badge_Grade)
[![Docker Pulls](https://img.shields.io/docker/pulls/monogramm/autodiscover-email-settings.svg)](https://hub.docker.com/r/monogramm/autodiscover-email-settings/)
[![](https://images.microbadger.com/badges/version/monogramm/autodiscover-email-settings.svg)](https://microbadger.com/images/monogramm/autodiscover-email-settings)
[![Docker layers](https://images.microbadger.com/badges/image/monogramm/autodiscover-email-settings.svg)](https://microbadger.com/images/monogramm/autodiscover-email-settings)

This service is created to autodiscover your provider email settings.

It provides IMAP/POP/SMTP/LDAP Autodiscover capabilities on Microsoft Outlook/Apple Mail, Autoconfig capabilities for Thunderbird, and Configuration Profiles for iOS/Apple Mail.

**A simple support page is also available at the root of the autodiscover domain.**

![General settings](docs/screenshot_01.png)

![General settings](docs/screenshot_02.png)

## DNS settings

    autoconfig              IN      A      {{$AUTODISCOVER_IP}}
    autodiscover            IN      A      {{$AUTODISCOVER_IP}}
    mail                    IN      CNAME  {{$DOMAIN}}.
    @                       IN      MX 10  {{$MX_DOMAIN}}.
    @                       IN      TXT    "mailconf=https://autoconfig.{{$DOMAIN}}/mail/config-v1.1.xml"
    _imap._tcp              IN      SRV    0 0 {{IMAP_PORT}} {{MX_DOMAIN}}.
	_imaps._tcp             IN      SRV    0 0 {{IMAPS_PORT}} {{MX_DOMAIN}}.
    _pop3._tcp              IN      SRV    0 0 {{POP_PORT}} {{MX_DOMAIN}}.
    _pop3s._tcp             IN      SRV    0 0 {{POPS_PORT}} {{MX_DOMAIN}}.
    _submission._tcp        IN      SRV    0 0 {{SUBMISSION_PORT}} {{MX_DOMAIN}}.
    _autodiscover._tcp      IN      SRV    0 0 443 autodiscover.{{$DOMAIN}}.
    _ldap._tcp              IN      SRV    0 0 {{LDAP_PORT}} {{LDAP_HOST}}.

Replace above variables with data according to this table

| Variable        | Description                         |
| --------------- | ----------------------------------- |
| MX_DOMAIN       | The hostname name of your MX server |
| DOMAIN          | Your apex/bare/naked Domain         |
| AUTODISCOVER_IP | IP of the Autoconfig HTTP           |
| IMAP_PORT       | Port for your IMAP server           |
| IMAPS_PORT      | Port for your IMAPS server          |
| POP_PORT        | Port for your POP server            |
| POPS_PORT       | Port for your POPS server           |
| SUBMISSION_PORT | Port for your SUBMISSION server     |
| LDAP_HOST       | The hostname of your LDAP server    |
| LDAP_PORT       | Port for your LDAP server           |

* * *

## Usage

[traefik](https://github.com/containous/traefik) can proxy your containers on docker, on docker swarm, and on a wide range of orchestrators.
You can also achieve this with another proxy like [Nginx](https://www.nginx.com/) for instance.

### docker

```yaml
version: '2'

services:
  autodiscover:
    image: ghcr.io/leviscop/autodiscover-email-settings:main
    container_name: mailserver-autodiscover
    environment:
      - AD_COMPANY_NAME=Company
      - AD_SUPPORT_URL=https://autodiscover.example.com
      - AD_DOMAIN=example.com
      # IMAP configuration (host mandatory to enable)
      - AD_IMAP_HOST=mail.example.com
      - AD_IMAP_PORT=143
      - AD_IMAP_SOCKET=STARTTLS
      # IMAPS configuration (host mandatory to enable)
      - AD_IMAPS_HOST=mail.example.com
      - AD_IMAPS_PORT=993
      - AD_IMAPS_SOCKET=SSL
      # POP configuration (host mandatory to enable)
      - AD_POP_HOST=mail.example.com
      - AD_POP_PORT=110
      - AD_POP_SOCKET=STARTTLS
      # POPS configuration (host mandatory to enable)
      - AD_POPS_HOST=mail.example.com
      - AD_POPS_PORT=995
      - AD_POPS_SOCKET=SSL
      # SMTP configuration (host mandatory to enable)
      - AD_SMTP_HOST=mail.example.com
      - AD_SMTP_PORT=25
      - AD_SMTP_SOCKET=STARTTLS
      # SMTPS configuration (host mandatory to enable)
      - AD_SMTPS_HOST=mail.example.com
      - AD_SMTPS_PORT=465
      - AD_SMTPS_SOCKET=SSL
      # SUBMISSION configuration (host mandatory to enable)
      - AD_SUBMISSION_HOST=mail.example.com
      - AD_SUBMISSION_PORT=587
      - AD_SUBMISSION_SOCKET=STARTTLS
      # MobileSync/ActiveSync configuration (url mandatory to enable)
      - AD_MOBILESYNC_URL=https://sync.example.com
      - AD_MOBILESYNC_NAME=sync.example.com
      # LDAP configuration (host mandatory to enable)
      - AD_LDAP_HOST=ldap.example.com
      - AD_LDAP_PORT=636
      - AD_LDAP_SOCKET=SSL
      - AD_LDAP_BASE=dc=ldap,dc=example,dc=com
      - AD_LDAP_USER_FIELD=uid
      - AD_LDAP_USER_BASE=ou=People,dc=ldap,dc=example,dc=com
      - AD_LDAP_SEARCH=(|(objectClass=PostfixBookMailAccount))
      # Apple mobile config identifiers (identifier mandatory to enable)
      - AD_PROFILE_IDENTIFIER=com.example.autodiscover
      - AD_PROFILE_UUID=92943D26-CAB3-4086-897D-DC6C0D8B1E86
      - AD_MAIL_UUID=7A981A9E-D5D0-4EF8-87FE-39FD6A506FAC
      - AD_LDAP_UUID=6ECB6BA9-2208-4ABF-9E60-4E9F4CD7309E
    labels:
      - "traefik.port=8000"
      - "traefik.frontend.rule=Host:autoconfig.example.com,autodiscover.example.com"
```

### docker swarm

```yaml
version: '3'

services:
  autodiscover:
    image: ghcr.io/leviscop/autodiscover-email-settings:main
    container_name: mailserver-autodiscover
    environment:
      - AD_COMPANY_NAME=Company
      - AD_SUPPORT_URL=https://autodiscover.example.com
      - AD_DOMAIN=example.com
      # IMAP configuration (host mandatory to enable)
      - AD_IMAP_HOST=mail.example.com
      - AD_IMAP_PORT=143
      - AD_IMAP_SOCKET=STARTTLS
      # IMAPS configuration (host mandatory to enable)
      - AD_IMAPS_HOST=mail.example.com
      - AD_IMAPS_PORT=993
      - AD_IMAPS_SOCKET=SSL
      # POP configuration (host mandatory to enable)
      - AD_POP_HOST=mail.example.com
      - AD_POP_PORT=110
      - AD_POP_SOCKET=STARTTLS
      # POPS configuration (host mandatory to enable)
      - AD_POPS_HOST=mail.example.com
      - AD_POPS_PORT=995
      - AD_POPS_SOCKET=SSL
      # SMTP configuration (host mandatory to enable)
      - AD_SMTP_HOST=mail.example.com
      - AD_SMTP_PORT=25
      - AD_SMTP_SOCKET=STARTTLS
      # SMTPS configuration (host mandatory to enable)
      - AD_SMTPS_HOST=mail.example.com
      - AD_SMTPS_PORT=465
      - AD_SMTPS_SOCKET=SSL
      # SUBMISSION configuration (host mandatory to enable)
      - AD_SUBMISSION_HOST=mail.example.com
      - AD_SUBMISSION_PORT=587
      - AD_SUBMISSION_SOCKET=STARTTLS
      # MobileSync/ActiveSync configuration (url mandatory to enable)
      - AD_MOBILESYNC_URL=https://sync.example.com
      - AD_MOBILESYNC_NAME=sync.example.com
      # LDAP configuration (host mandatory to enable)
      - AD_LDAP_HOST=ldap.example.com
      - AD_LDAP_PORT=636
      - AD_LDAP_SOCKET=SSL
      - AD_LDAP_BASE=dc=ldap,dc=example,dc=com
      - AD_LDAP_USER_FIELD=uid
      - AD_LDAP_USER_BASE=ou=People,dc=ldap,dc=example,dc=com
      - AD_LDAP_SEARCH=(|(objectClass=PostfixBookMailAccount))
      # Apple mobile config identifiers (identifier mandatory to enable)
      - AD_PROFILE_IDENTIFIER=com.example.autodiscover
      - AD_PROFILE_UUID=92943D26-CAB3-4086-897D-DC6C0D8B1E86
      - AD_MAIL_UUID=7A981A9E-D5D0-4EF8-87FE-39FD6A506FAC
      - AD_LDAP_UUID=6ECB6BA9-2208-4ABF-9E60-4E9F4CD7309E
    deploy:
      replicas: 1
      labels:
        - "traefik.port=8000"
        - "traefik.frontend.rule=Host:autoconfig.example.com,autodiscover.example.com"
```

## Credits

Inspired from <https://github.com/sylvaindumont/autodiscover.xml>, but without the few restrictions mentioned in the original project notes and with a simple support page to allow manual setup and iOS profile download.

The original project was inspired from <https://github.com/johansmitsnl/docker-email-autodiscover>, but with <https://github.com/Tiliq/autodiscover.xml> instead of <https://github.com/gronke/email-autodiscover> to allow a much lighter ([![](https://images.microbadger.com/badges/image/weboaks/autodiscover-email-settings.svg)](https://microbadger.com/images/weboaks/autodiscover-email-settings)) image based of node on alpine instead of apache on debian ([![](https://images.microbadger.com/badges/image/jsmitsnl/docker-email-autodiscover.svg)](https://microbadger.com/images/jsmitsnl/docker-email-autodiscover))

## Notes

The above autoconfiguration methods assume the following:

-   If username does not contain `@`, full email address will be generated based on domain settings

## Links

-   Mozilla [Autoconfig configuration](https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Autoconfiguration/FileFormat/HowTo)

-   Microsoft [Exchange Command Reference](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-ascmd/1a3490f1-afe1-418a-aa92-6f630036d65a)

-   Apple [ConfigurationProfile reference](https://developer.apple.com/library/archive/featuredarticles/iPhoneConfigurationProfileRef/index.html)

-   [DNS SRV Records for LDAP](https://github.com/doctorjbeam/LDAPAutoDiscover)

-   [Bootstrap](https://getbootstrap.com/), [jQuery](https://jquery.com/) and [Popper.js](https://popper.js.org/) used for default support page

## License

This project is distributed under the [MIT License](LICENSE)
