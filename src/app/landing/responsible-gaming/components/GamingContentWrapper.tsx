export default function GamingContentWrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="bg-[#1c222b] rounded-xl p-6 md:p-8 text-gray-200 leading-relaxed">
        {children}
      </div>
    );
  }
  