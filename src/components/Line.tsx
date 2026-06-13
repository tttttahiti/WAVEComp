interface LineProps {
  className?: string;
}

/**
 * 横方向の区切り線（旧 /svg/line.svg をインライン化したもの）。
 * 見た目は BorderLine と似ているが目盛りが1本だけで、WORKS 一覧で使用する。
 * preserveAspectRatio="none" なので、親の幅いっぱい × 高さ10px に引き伸ばして表示される。
 * SVG をインライン化することで <img>/Next Image を使わずに描画し、HTTP フェッチも避ける。
 * ※ Next/Image は dangerouslyAllowSVG 未設定だと SVG を配信できないため使わない。
 */
export function Line({ className = "" }: LineProps) {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 9260 95"
      aria-hidden
      className={`block w-full h-[10px] ${className}`}
    >
      <g transform="matrix(1,0,0,1,-370.13019,-8979.538999)">
        <g transform="matrix(8.333333,0,0,8.333333,0,0)">
          <g transform="matrix(1,0,0,1,600,-1843.870943)">
            <path
              d="M-555,2922L555,2922"
              fill="none"
              stroke="black"
              strokeWidth="0.28px"
            />
          </g>
        </g>
        <g transform="matrix(8.333333,0,0,8.333333,0,0)">
          <g transform="matrix(1,0,0,1,758.024934,-1843.587478)">
            <path
              d="M-158.196,2921.858L-158.196,2931.858"
              fill="none"
              stroke="black"
              strokeWidth="0.28px"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
