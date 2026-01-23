"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission
    console.log("Form submitted:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    alert("お問い合わせを送信しました。");
    setFormData({ name: "", company: "", email: "", content: "" });
  };

  return (
    <div className="grid-6 mt-[30px]">
      <div className="col-1 col-start-2 space-y-[18px] text-[12pt] height-[20px] font-medium leading-[2]">
        <p>
          お名前
        </p>
        <p>
          会社名
        </p>
        <p>
          メールアドレス
        </p>
        <p>
          内容
        </p>
      </div>
      <div className="col-start-3 col-span-3">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full h-[20px] bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors"
          />
        </div>

        <div>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full h-[20px] bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors"
          />
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-[20px] bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors"
          />
        </div>

        <div>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full h-[155px] bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "SENDING..." : "SEND"}
        </button>
      </form>
      </div>
    </div>
  );
}
