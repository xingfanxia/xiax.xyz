function FindProxyForURL(url, host) {
	if (host == 'music.163.com' || host == 'ip.ws.126.net') {
		return 'PROXY 2001:470:fc94:1779::163';
	} else if (host == 'music.httpdns.c.163.com') {
		return 'PROXY 127.0.0.1:9999';
	} else if (host == 'm10.music.126.net') {
		return 'PROXY 125.39.1.27';
	}
	return 'DIRECT';
}

