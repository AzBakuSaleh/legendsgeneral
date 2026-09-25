"use client";
import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { phones, products } from "@/lib/content";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { ContactDetails } from "./shared";
export function ContactForm() {
  const params = useSearchParams();
  const id = params.get("mehsul");
  const initialProduct = products.some((p) => p.slug === id) ? id! : "general";
  return <InquiryForm key={initialProduct} initialProduct={initialProduct} />;
}
function InquiryForm({ initialProduct }: { initialProduct: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState(initialProduct);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState<{
    url: string;
    text: string;
  } | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prepared) previewRef.current?.focus();
  }, [prepared]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2)
      next.name = "Adınızı daxil edin (ən azı 2 hərf).";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15 || !/^[+\d\s()-]+$/.test(phone))
      next.phone = "Düzgün əlaqə nömrəsi daxil edin.";
    if (!phones.some((p) => p.number === recipient))
      next.recipient = "Müraciətin gedəcəyi şirkət nömrəsini seçin.";
    if (message.trim().length < 5)
      next.message = "Sualınızı bir qədər ətraflı yazın.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById("inquiry-" + Object.keys(next)[0])?.focus();
      return;
    }
    const selected =
      products.find((p) => p.slug === product)?.name ?? "Ümumi məlumat";
    const text = `Salam, Legends General!\n\nAd: ${name.trim()}\nƏlaqə nömrəsi: ${phone.trim()}\nMəhsul: ${selected}\n\nSual: ${message.trim()}`;
    setPrepared({
      text,
      url: `https://wa.me/${recipient}?text=${encodeURIComponent(text)}`,
    });
  }
  if (prepared)
    return (
      <div className="request-preview" ref={previewRef} tabIndex={-1}>
        <span className="success-icon">
          <Check />
        </span>
        <h3>Mesajınız hazırdır</h3>
        <p>
          Seçdiyiniz nömrə:{" "}
          <strong>{phones.find((p) => p.number === recipient)?.label}</strong>
        </p>
        <pre>{prepared.text}</pre>
        <p className="form-note">
          Mesaj hələ göndərilməyib. WhatsApp-ı açın və göndərməyi orada
          tamamlayın.
        </p>
        <a
          className="button"
          href={prepared.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp-ı aç <ArrowUpRight size={18} />
        </a>
        <button
          type="button"
          className="text-link back-edit"
          onClick={() => setPrepared(null)}
        >
          <ArrowLeft size={16} />
          Məlumatları dəyiş
        </button>
      </div>
    );
  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      <FieldGroup className="form-fields">
        <div className="form-row">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="inquiry-name">
              Adınız <span aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              id="inquiry-name"
              name="name"
              autoComplete="name"
              value={name}
              maxLength={80}
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "error-name" : undefined}
              placeholder="Ad və soyad"
            />
            {errors.name && (
              <p id="error-name" className="field-error">
                {errors.name}
              </p>
            )}
          </Field>
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="inquiry-phone">
              Telefon nömrəniz <span aria-hidden="true">*</span>
            </FieldLabel>
            <Input
              type="tel"
              id="inquiry-phone"
              name="phone"
              autoComplete="tel"
              value={phone}
              maxLength={24}
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "error-phone" : undefined}
              placeholder="+994 __ ___ __ __"
            />
            {errors.phone && (
              <p id="error-phone" className="field-error">
                {errors.phone}
              </p>
            )}
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="inquiry-product">
            Maraqlandığınız məhsul
          </FieldLabel>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger id="inquiry-product">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="general">Ümumi məlumat</SelectItem>
                {products.map((p) => (
                  <SelectItem key={p.slug} value={p.slug}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field data-invalid={!!errors.recipient}>
          <FieldLabel htmlFor="inquiry-recipient">
            Şirkətin əlaqə nömrəsi <span aria-hidden="true">*</span>
          </FieldLabel>
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger
              id="inquiry-recipient"
              aria-invalid={!!errors.recipient}
              aria-describedby={
                errors.recipient ? "error-recipient" : undefined
              }
            >
              <SelectValue placeholder="Müraciət üçün nömrə seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {phones.map((p) => (
                  <SelectItem key={p.number} value={p.number}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.recipient && (
            <p id="error-recipient" className="field-error">
              {errors.recipient}
            </p>
          )}
        </Field>
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="inquiry-message">
            Sualınız <span aria-hidden="true">*</span>
          </FieldLabel>
          <Textarea
            id="inquiry-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={1500}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "error-message" : undefined}
            placeholder="Məhsul, ölçü, say və ya digər sualınızı yazın..."
          />
          {errors.message && (
            <p id="error-message" className="field-error">
              {errors.message}
            </p>
          )}
        </Field>
        <button type="submit" className="button form-submit">
          Müraciəti hazırla <ArrowUpRight size={18} />
        </button>
        <p className="form-note">
          Məlumatlarınız WhatsApp mesajı kimi hazırlanır. Göndərməzdən əvvəl
          mesajı yoxlaya bilərsiniz.
        </p>
      </FieldGroup>
    </form>
  );
}
export function ContactSection() {
  return (
    <section className="contact-section" id="muraciet">
      <div className="container contact-grid">
        <div>
          <h2>
            Sualınız var?
            <br />
            Bizə yazın.
          </h2>
          <p className="contact-intro">
            Məhsul seçimi, ölçülər və sifarişlə bağlı suallarınızı
            cavablandırmağa hazırıq.
          </p>
          <ContactDetails />
        </div>
        <Suspense fallback={<p role="status">Müraciət forması yüklənir...</p>}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
