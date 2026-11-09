import { Icon } from "./Icons";
import { waLink } from "@/lib/whatsapp";

export default function WhatsAppFab() {
  const href = waLink();
  if (!href) return null;
  return (
    <a className="fab" href={href} target="_blank" rel="noreferrer" aria-label="Chat with me on WhatsApp">
      <span className="fab-pulse" aria-hidden="true" />
      <Icon name="whatsapp" size={26} />
      <span className="fab-label">Chat on WhatsApp</span>
    </a>
  );
}
