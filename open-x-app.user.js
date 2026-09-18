// ==UserScript==
// @name         Mở link bằng X
// @namespace    tin.openx
// @version      1.0
// @description  Mở link X/Twitter từ Safari bằng ứng dụng X
// @match        https://x.com/*
// @match        https://www.x.com/*
// @match        https://twitter.com/*
// @match        https://www.twitter.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const path = location.pathname;

    // Bài đăng
    const status = path.match(/^\/[^/]+\/status\/(\d+)/);
    if (status) {
        location.href = 'twitter://status?id=' + status[1];
        return;
    }

    // Trang cá nhân
    const profile = path.match(/^\/([^/]+)\/?$/);
    if (profile) {
        const username = profile[1];

        const ignore = [
            'home',
            'explore',
            'search',
            'notifications',
            'messages',
            'settings',
            'login',
            'signup',
            'i'
        ];

        if (!ignore.includes(username.toLowerCase())) {
            location.href =
                'twitter://user?screen_name=' +
                encodeURIComponent(username);
            return;
        }
    }

    // Trang chủ
    if (path === '/' || path === '/home') {
        location.href = 'twitter://timeline';
        return;
    }

    // Tìm kiếm
    if (path === '/search') {
        const q = new URLSearchParams(location.search).get('q');

        location.href = q
            ? 'twitter://search?query=' + encodeURIComponent(q)
            : 'twitter://explore';
        return;
    }

    // Tin nhắn
    if (path.startsWith('/messages')) {
        location.href = 'twitter://messages';
        return;
    }

    // Khám phá
    if (path.startsWith('/explore')) {
        location.href = 'twitter://explore';
    }
})();