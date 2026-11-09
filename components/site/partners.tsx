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
        <div className="partner-collaboration" aria-label="Korporativ əməkdaşlıq — METAK">
          <span>KORPORATİV ƏMƏKDAŞLIQ</span>
          <a href="https://metak.az/az" target="_blank" rel="noopener noreferrer" aria-label="METAK rəsmi saytı">
            <img
              src="https://metak.az/template/front/assets/images/logo.svg"
              width="170"
              height="62"
              alt="METAK"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
      </div>
    </aside>
  );
}
