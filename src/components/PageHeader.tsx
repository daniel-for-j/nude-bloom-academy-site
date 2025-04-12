
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-nude-100 py-16 md:py-24">
      <div className="container-custom text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-4">{title}</h1>
        {subtitle && <p className="text-xl text-primary/70 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
