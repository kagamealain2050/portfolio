const P = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.7 };

export function Icon({ name, size = 24, gradient = false, className }) {
  const stroke = gradient ? "url(#grad-icon)" : "currentColor";
  const common = { width: size, height: size, viewBox: "0 0 24 24", stroke, className, "aria-hidden": true, ...P };
  switch (name) {
    case "github":
      return (<svg {...common}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>);
    case "linkedin":
      return (<svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>);
    case "arrow":
      return (<svg {...common}><path d="M7 17 17 7M8 7h9v9" /></svg>);
    case "web":
      return (<svg {...common}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>);
    case "code":
      return (<svg {...common}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>);
    case "gear":
      return (<svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>);
    case "monitor":
      return (<svg {...common}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>);
    case "bulb":
      return (<svg {...common}><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2z" /></svg>);
    case "rocket":
      return (<svg {...common}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>);
    case "whatsapp":
      return (<svg {...common}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /><path d="M9 10c.5 2 2 3.5 4 4l1.2-1.2a.8.8 0 0 1 .9-.1l1.6.8a.8.8 0 0 1 .4.9c-.3 1-1.2 1.6-2.2 1.6-3.3 0-6.5-3.2-6.5-6.5 0-1 .6-1.9 1.6-2.2a.8.8 0 0 1 .9.4l.8 1.6a.8.8 0 0 1-.1.9z" /></svg>);
    case "clock":
      return (<svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
    case "users":
      return (<svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
    case "whatsapp":
      return (<svg {...common}><path d="M3 21l1.65-4.8A9 9 0 1 1 8.1 19.4z" /><path d="M9 8.6c0 3.5 2.9 6.4 6.4 6.4l1.1-1.5-2-1-.9.8c-1-.4-1.9-1.3-2.3-2.3l.8-.9-1-2z" /></svg>);
    case "menu":
      return (<svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
    case "close":
      return (<svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>);
    case "users":
      return (<svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
    case "eye":
      return (<svg {...common}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>);
    case "mail":
      return (<svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>);
    default:
      return null;
  }
}

export function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 26 26" aria-hidden="true">
      <path d="M3 6l10 7 10-7-3 9-7 6-7-6z" fill="#fff" />
      <path d="M8 14l5 4 5-4" stroke="#0a0a0a" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
