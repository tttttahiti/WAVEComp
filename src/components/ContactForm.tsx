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
    <div className="grid-6 mt-4 md:mt-[30px]">
      <div className="col-6 md:col-1 md:col-start-2 space-y-3 md:space-y-[18px] max-[400px]:text-[3.75pt] text-[10pt] md:text-[12pt] font-medium leading-[1.8] md:leading-[2] mb-4 md:mb-0">
        <p className="hidden md:block">
          お名前
        </p>
        <p className="hidden md:block">
          会社名
        </p>
        <p className="hidden md:block">
          メールアドレス
        </p>
        <p className="hidden md:block">
          内容
        </p>
      </div>
      <div className="col-6 md:col-start-3 md:col-span-3">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label className="block md:hidden max-[400px]:text-[4.5pt] text-[12pt] font-medium mb-1">お名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full h-[20px] bg-white text-black border border-black/20 px-3 md:px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-wave-blue transition-colors"
          />
        </div>

        <div>
          <label className="block md:hidden max-[400px]:text-[4.5pt] text-[12pt] font-medium mb-1">会社名</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full h-[20px] bg-white text-black border border-black/20 px-3 md:px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-wave-blue transition-colors"
          />
        </div>

        <div>
          <label className="block md:hidden max-[400px]:text-[4.5pt] text-[12pt] font-medium mb-1">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-[20px] bg-white text-black border border-black/20 px-3 md:px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-wave-blue transition-colors"
          />
        </div>

        <div>
          <label className="block md:hidden max-[400px]:text-[4.5pt] text-[12pt] font-medium mb-1">内容</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full h-[120px] md:h-[155px] bg-white text-black border border-black/20 px-3 md:px-4 py-3 text-xs md:text-sm focus:outline-none focus:border-wave-blue transition-colors resize-none"
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
