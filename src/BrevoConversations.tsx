import React, { useEffect } from 'react';

const BrevoConversations: React.FC = () => {
    useEffect(() => {
        (function (d, w, c) {
            (w as any).BrevoConversationsID = '6693a264632082398039cc8f';
            (w as any)[c] = (w as any)[c] || function () {
                ((w as any)[c].q = (w as any)[c].q || []).push(arguments);
            };
            const s = d.createElement('script');
            s.async = true;
            s.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
            if (d.head) d.head.appendChild(s);
        })(document, window, 'BrevoConversations');
    }, []);

    return null;
};

export default BrevoConversations;
