"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICES } from "../data/servicos";
import { WHATSAPP_LINK, CONTACT_EMAIL } from "../lib/constants";

type FormState = "idle" | "submitting" | "success" | "error";

export function OrcamentoForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("servico");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(serviceParam || "");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (serviceParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setService(serviceParam);
    }
  }, [serviceParam]);

  const validate = () => {
    const next: Record<string, string> = {};

    if (!name.trim()) next.name = "Nome obrigatório";
    if (!email.trim()) {
      next.email = "Email obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Email inválido";
    }
    if (!phone.trim()) next.phone = "Telefone obrigatório";
    if (!service) next.service = "Seleccione um serviço";
    if (!description.trim()) next.description = "Descreva o projecto";
    if (description.trim().length < 10) next.description = "Muito curto, detalhe mais";

    return next;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys({
      name,
      email,
      phone,
      service,
      description,
    }).reduce<Record<string, boolean>>((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setFormState("submitting");

    await new Promise((resolve) => setTimeout(resolve, 800));

    const subject = encodeURIComponent(`Pedido de orçamento: ${service || "Sem serviço"}`);
    const body = encodeURIComponent(
      `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nEmpresa: ${company || "—"}\nServiço: ${service}\nPrazo desejado: ${deadline || "—"}\n\n${description}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormState("success");
  };

  const inputClasses = (field: string) =>
    `w-full rounded-sm border bg-white px-4 py-3 text-sm text-black outline-none transition-colors ${
      touched[field] && errors[field]
        ? "border-rose-600"
        : "border-black/10 focus:border-rose-600"
    }`;

  return (
    <div className="mx-auto max-w-3xl">
      {formState === "success" ? (
        <div className="rounded-sm bg-black/5 px-6 py-10 text-center">
          <p className="text-xl font-extrabold text-black sm:text-2xl">
            Recebemos o seu pedido
          </p>
          <p className="mt-3 text-sm text-black/60 sm:text-base">
            Vamos analisar a informação e responder em até um dia útil.
            Se for urgente, prefira o WhatsApp.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-black/70">
                nome *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
                className={inputClasses("name")}
                placeholder="o seu nome"
              />
              {touched.name && errors.name && (
                <p className="mt-2 text-xs text-rose-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-black/70">
                email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
                className={inputClasses("email")}
                placeholder="nome@empresa.ao"
              />
              {touched.email && errors.email && (
                <p className="mt-2 text-xs text-rose-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-black/70">
                telefone *
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => handleBlur("phone")}
                className={inputClasses("phone")}
                placeholder="+244 924 000 000"
              />
              {touched.phone && errors.phone && (
                <p className="mt-2 text-xs text-rose-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-black/70">
                empresa
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={inputClasses("company")}
                placeholder="nome da empresa (opcional)"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-black/70">
                serviço *
              </label>
              <div className="relative">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  onBlur={() => handleBlur("service")}
                  className={`${inputClasses("service")} appearance-none pr-10`}
                >
                  <option value="">seleccione um serviço</option>
                  {SERVICES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center px-4 text-black/40 pointer-events-none">
                  ▼
                </span>
              </div>
              {touched.service && errors.service && (
                <p className="mt-2 text-xs text-rose-600">{errors.service}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-black/70">
                prazo desejado
              </label>
              <input
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={inputClasses("deadline")}
                placeholder="ex: duas semanas"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-black/70">
                descrição do projecto *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur("description")}
                rows={5}
                className={inputClasses("description")}
                placeholder="conte-nos o que precisa: tipo de material, tiragem, acabamentos, referências."
              />
              {touched.description && errors.description && (
                <p className="mt-2 text-xs text-rose-600">{errors.description}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="inline-flex items-center gap-2 rounded-sm bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              {formState === "submitting" ? "a enviar..." : "enviar pedido"}
            </button>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-black/5 px-6 py-3 text-sm font-semibold text-black/80 transition-colors hover:bg-black/10"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
              falar pelo whatsapp
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
