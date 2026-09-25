"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Expand } from "lucide-react";
export function ProductPhoto({ src, name }: { src: string; name: string }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="detail-photo"
            aria-label={`${name} — şəkli böyüt`}
          >
            <img src={src} alt={name} width="512" height="512" />
            <span>
              <Expand size={19} />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="product-photo-dialog">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>Məhsulun nümunə görüntüsü</DialogDescription>
          <img src={src} alt={name} width="512" height="512" />
        </DialogContent>
      </Dialog>
      <p className="image-note">
        Məhsulun nümunə görüntüsü. Komplektasiya sifarişə uyğun dəqiqləşdirilir.
      </p>
    </div>
  );
}
