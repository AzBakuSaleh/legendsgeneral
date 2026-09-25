import { partners } from "@/lib/content";
export function Partners() {
  return (
    <aside className="partners" aria-labelledby="partners-title">
      <div className="container">
        <div className="partners-heading">
          <span aria-hidden="true" />
          <h2 id="partners-title">Əməkdaşlarımız</h2>
          <span aria-hidden="true" />
        </div>
        <ul className="partner-logos">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className={`partner-logo partner-${partner.id}`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                width="180"
                height="76"
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
