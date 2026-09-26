"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Expand } from "lucide-react";
import { ServiceAnnotation } from "./service-annotation";
export function ProductPhoto({
  src,
  name,
  real = false,
  category,
}: {
  src: string;
  name: string;
  real?: boolean;
  category?: string;
}) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className={`detail-photo${category ? " service-photo" : ""}`}
            aria-label={`${name} — şəkli böyüt`}
          >
            <img src={src} alt={name} width="512" height="512" />
            {category && <ServiceAnnotation category={category} />}
            <span className="photo-zoom">
              <Expand size={19} />
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="product-photo-dialog">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            {real
              ? "Legends General-ın görülən işlərindən"
              : "İstiqaməti göstərən nümunə görüntü"}
          </DialogDescription>
          <div className="enlarged-service-photo">
            <img src={src} alt={name} width="512" height="512" />
            {category && <ServiceAnnotation category={category} />}
          </div>
        </DialogContent>
      </Dialog>
      <p className="image-note">
        {real
          ? "Legends General-ın görülən işlərindən. Ölçü və komplektasiya sifarişə uyğun dəqiqləşdirilir."
          : "Nümunə görüntü. Görünüş və texniki tələblər sifarişə uyğun dəqiqləşdirilir."}
      </p>
    </div>
  );
}
