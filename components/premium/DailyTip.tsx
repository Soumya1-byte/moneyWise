interface DailyTipProps {
  tip: string;
}

export default function DailyTip({ tip }: DailyTipProps) {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-[#2FCF89]/5 to-[#2FCF89]/10 border border-[#2FCF89]/20 shadow-[0_8px_20px_rgba(47,207,137,0.1)] transition-all hover:shadow-[0_12px_30px_rgba(47,207,137,0.15)]">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#2FCF89]/10 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-[#2FCF89]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Daily Tip</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
        </div>
      </div>
    </div>
  );
}
