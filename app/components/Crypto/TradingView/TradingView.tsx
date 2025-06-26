// TradingViewWidget.tsx
import React, { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
  symbol: string;
  theme?: string;
}

function TradingViewWidget({ symbol, theme }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      timezone: "Etc/UTC",
      theme: theme || "light",
      style: "2",
      locale: "en",
      withdateranges: true,
      range: "YTD",
      hide_side_toolbar: false,
      allow_symbol_change: true,
      details: true,
      hotlist: true,
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "1000",
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ height: "100%", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
