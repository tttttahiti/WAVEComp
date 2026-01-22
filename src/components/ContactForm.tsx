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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm mb-2">
          お名前
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm mb-2">
          会社名
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-2">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm mb-2">
          内容
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full bg-white text-black border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-wave-blue transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "送信中..." : "送信 / SEND"}
      </button>
    </form>
  );
}
