import { Icon } from "./Icons";
import { skills } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" className="section wide">
      <h2 className="h2" data-reveal>My Skills and Development</h2>
      <ul className="skills">
        {skills.map((s, i) => (
          <li key={s.title} className="spot" data-reveal style={{ "--d": `${i * 90}ms` }}>
            <Icon name={s.icon} size={26} gradient />
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
