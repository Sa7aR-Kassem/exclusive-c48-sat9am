import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="sectionTitle">{title}</h2>
      <p className="sectionSubtitle">{subtitle}</p>
    </div>
  );
}
