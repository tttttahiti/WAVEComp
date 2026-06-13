interface BorderLineProps {
  className?: string;
}

/**
 * 横方向の装飾セパレータ（旧 /svg/border.svg をインライン化したもの）。
 * preserveAspectRatio="none" なので、親の幅いっぱい × 高さ10px に引き伸ばして表示される。
 * SVG をインライン化することで <img>（no-img-element 警告）と HTTP フェッチを回避している。
 * ※ Next/Image は dangerouslyAllowSVG 未設定だと SVG を配信できないため使わない。
 */
export function BorderLine({ className = "" }: BorderLineProps) {
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 9260 95"
      aria-hidden
      className={`block w-full h-[10px] ${className}`}
    >
      <g transform="matrix(1,0,0,1,-370.13019,-10026.232552)">
        <g transform="matrix(8.333333,0,0,8.333333,0,0)">
          <g transform="matrix(1,0,0,1,600,-1718.267717)">
            <path
              d="M-555,2922L555,2922"
              fill="none"
              stroke="black"
              strokeWidth="0.28px"
            />
          </g>
        </g>
        <g transform="matrix(8.333333,0,0,8.333333,0,0)">
          <g transform="matrix(1,0,0,1,626.437483,1217.591902)">
            <g transform="matrix(1,0,0,1,-30.405987,-2935.576154)">
              <path
                d="M-184.223,2921.858L-184.223,2931.858"
                fill="none"
                stroke="black"
                strokeWidth="0.28px"
              />
            </g>
            <g transform="matrix(1,0,0,1,293.74433,-2935.576154)">
              <path
                d="M-131.99,2921.858L-131.99,2931.858"
                fill="none"
                stroke="black"
                strokeWidth="0.28px"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
