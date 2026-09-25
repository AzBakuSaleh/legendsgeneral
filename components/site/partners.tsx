"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { partners } from "@/lib/content";

export function Partners() {
  const [playing, setPlaying] = useState(true);
  return (
    <aside className="partner-banner" aria-label="Əməkdaşlarımız">
      <div className="container partner-banner-inner">
        <p className="partner-caption">Əməkdaşlarımız</p>
        <div
          className="partner-window"
          tabIndex={0}
          aria-label="Əməkdaş şirkətlərin siyahısı"
        >
          <div className={`partner-track${playing ? "" : " is-paused"}`}>
            <ul className="partner-names">
              {partners.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <ul className="partner-names partner-copy" aria-hidden="true">
              {partners.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          className="icon-button partner-pause"
          onClick={() => setPlaying(!playing)}
          aria-label={
            playing
              ? "Əməkdaşlar bannerini dayandır"
              : "Əməkdaşlar bannerini hərəkət etdir"
          }
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </aside>
  );
}
