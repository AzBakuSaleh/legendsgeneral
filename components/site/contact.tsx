"use client";
import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp-icon";
import {
  whatsappNumber,
  inquiryOptions,
  divisions,
  categoryMatches,
} from "@/lib/content";
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
  SelectLabel,
} from "@/components/ui/select";
import { ContactDetails } from "./shared";
import { tr, label, type Locale } from "@/lib/i18n";
export function ContactForm({ locale = "az" }: { locale?: Locale }) {
  const params = useSearchParams();
  const id = params.get("mehsul");
  const initialProduct = inquiryOptions.some((p) => p.id === id)
    ? id!
    : "general";
  return <InquiryForm key={initialProduct} initialProduct={initialProduct} locale={locale} />;
}
function InquiryForm({ initialProduct, locale }: { initialProduct: string; locale: Locale }) {
  const t = (s: string) => tr(locale, s);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState(initialProduct);
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
      next.name = locale === "ru" ? "Укажите имя (не менее 2 символов)." : locale === "en" ? "Enter your name (at least 2 characters)." : "Adınızı daxil edin (ən azı 2 hərf).";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15 || !/^[+\d\s()-]+$/.test(phone))
      next.phone = locale === "ru" ? "Укажите корректный телефон." : locale === "en" ? "Enter a valid phone number." : "Düzgün əlaqə nömrəsi daxil edin.";
    if (message.trim().length < 5)
      next.message = locale === "ru" ? "Пожалуйста, уточните ваш вопрос." : locale === "en" ? "Please describe your enquiry in more detail." : "Sualınızı bir qədər ətraflı yazın.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById("inquiry-" + Object.keys(next)[0])?.focus();
      return;
    }
    const selected =
      t(inquiryOptions.find((p) => p.id === product)?.name ?? "Ümumi məlumat");
    const text = locale === "ru" ? `Здравствуйте, Legends General!\n\nИмя: ${name.trim()}\nТелефон: ${phone.trim()}\nТовар / услуга: ${selected}\n\nВопрос: ${message.trim()}` : locale === "en" ? `Hello, Legends General!\n\nName: ${name.trim()}\nPhone: ${phone.trim()}\nProduct / service: ${selected}\n\nEnquiry: ${message.trim()}` : `Salam, Legends General!\n\nAd: ${name.trim()}\nƏlaqə nömrəsi: ${phone.trim()}\nMəhsul / xidmət: ${selected}\n\nSual: ${message.trim()}`;
    setPrepared({
      text,
      url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
    });
  }
  if (prepared)
    return (
      <div className="request-preview" ref={previewRef} tabIndex={-1}>
        <span className="success-icon">
          <Check />
        </span>
        <h3>{label(locale, "messageReady")}</h3>
        <p>
          {label(locale, "phone")}:{" "}
          <strong>+994 50 299 10 22</strong>
        </p>
        <pre>{prepared.text}</pre>
        <p className="form-note">
          {locale === "ru" ? "Сообщение ещё не отправлено. Откройте WhatsApp и подтвердите отправку." : locale === "en" ? "Your message has not been sent yet. Open WhatsApp and send it there." : "Mesaj hələ göndərilməyib. WhatsApp-ı açın və göndərməyi orada tamamlayın."}
        </p>
        <a
          className="button"
          href={prepared.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} /> {label(locale, "openWhatsApp")}
        </a>
        <button
          type="button"
          className="text-link back-edit"
          onClick={() => setPrepared(null)}
        >
          <ArrowLeft size={16} />
          {label(locale, "editDetails")}
        </button>
      </div>
    );
  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      <FieldGroup className="form-fields">
        <div className="form-row">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="inquiry-name">
              {label(locale, "yourName")} <span aria-hidden="true">*</span>
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
              placeholder={locale === "ru" ? "Имя и фамилия" : locale === "en" ? "Name and surname" : "Ad və soyad"}
            />
            {errors.name && (
              <p id="error-name" className="field-error">
                {errors.name}
              </p>
            )}
          </Field>
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="inquiry-phone">
              {label(locale, "yourPhone")} <span aria-hidden="true">*</span>
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
            {locale === "ru" ? "Интересующий товар или услуга" : locale === "en" ? "Product or service of interest" : "Maraqlandığınız məhsul və ya xidmət"}
          </FieldLabel>
          <Select value={product} onValueChange={setProduct}>
            <SelectTrigger id="inquiry-product">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="general">{label(locale,"generalInfo")}</SelectItem>
              </SelectGroup>
              {divisions.map((area) => (
                <SelectGroup key={area.id}>
                  <SelectLabel>{t(area.name)}</SelectLabel>
                  {inquiryOptions
                    .filter((p) => categoryMatches(p.category, area.id) &&
                      (area.id !== "metal-mebel" || !["refler", "dolablar", "arxiv"].includes(p.category)))
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {t(p.name)}
                      </SelectItem>
                    ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>{label(locale,"phone")}</FieldLabel>
          <p className="form-note">+994 50 299 10 22</p>
        </Field>
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="inquiry-message">
            {label(locale,"yourMessage")} <span aria-hidden="true">*</span>
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
            placeholder={locale === "ru" ? "Опишите товар или услугу, размеры, количество и другие требования..." : locale === "en" ? "Describe the item or service, dimensions, quantity and any other requirements..." : "Məhsul və ya xidmət, ölçü, say və digər tələblərinizi yazın..."}
          />
          {errors.message && (
            <p id="error-message" className="field-error">
              {errors.message}
            </p>
          )}
        </Field>
        <button type="submit" className="button form-submit">
          {label(locale, "submitRequest")} <ArrowUpRight size={18} />
        </button>
        <p className="form-note">
          {locale === "ru" ? "Мы подготовим сообщение для WhatsApp. Вы сможете проверить его перед отправкой." : locale === "en" ? "We will prepare your WhatsApp message for review before you send it." : "Məlumatlarınız WhatsApp mesajı kimi hazırlanır. Göndərməzdən əvvəl mesajı yoxlaya bilərsiniz."}
        </p>
      </FieldGroup>
    </form>
  );
}
export function ContactSection({ locale = "az" }: { locale?: Locale }) {
  return (
    <section className="contact-section" id="muraciet">
      <div className="container contact-grid">
        <div>
          <h2>
            {locale === "ru" ? <>Есть вопросы?<br />Напишите нам.</> : locale === "en" ? <>Questions?<br />Get in touch.</> : <>Sualınız var?<br />Bizə yazın.</>}
          </h2>
          <p className="contact-intro">
            {locale === "ru" ? "Мы поможем с выбором продукции и услуг, размерами и оформлением заказа." : locale === "en" ? "We can help you choose products and services and discuss dimensions and orders." : "Məhsul və xidmət seçimi, ölçülər və sifarişlə bağlı suallarınızı cavablandırmağa hazırıq."}
          </p>
          <ContactDetails locale={locale} />
        </div>
        <Suspense fallback={<p role="status">{locale === "ru" ? "Загрузка формы..." : locale === "en" ? "Loading contact form..." : "Müraciət forması yüklənir..."}</p>}>
          <ContactForm locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
