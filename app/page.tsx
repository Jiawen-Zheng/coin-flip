"use client";

import { useState } from "react";

type CoinResult = "heads" | "tails" | "standing" | "disappeared";

export default function Home() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<CoinResult | null>(null);
  const [showCoin, setShowCoin] = useState(true);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);
    setShowCoin(true);

    // 模拟抛硬币动画时间
    setTimeout(() => {
      const random = Math.random() * 100;
      let finalResult: CoinResult;

      if (random < 1) {
        // 1% 概率消失
        finalResult = "disappeared";
        setShowCoin(false);
      } else if (random < 6) {
        // 5% 概率立住 (1% + 5% = 6%)
        finalResult = "standing";
      } else if (random < 53) {
        // 47% 概率正面
        finalResult = "heads";
      } else {
        // 47% 概率反面
        finalResult = "tails";
      }

      setResult(finalResult);
      setIsFlipping(false);
    }, 2500);
  };

  const resetCoin = () => {
    setResult(null);
    setShowCoin(true);
    setIsFlipping(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg">
          抛硬币来决定吧！🪙 
        </h1>

        <div className="relative w-64 h-64 mx-auto mb-8" style={{ perspective: "1000px" }}>
          {showCoin && (
            <div
              className={`coin-container ${
                isFlipping ? "flipping" : ""
              } ${result === "standing" ? "standing" : ""}`}
              style={{
                transformStyle: "preserve-3d",
                position: "relative",
                width: "200px",
                height: "200px",
                margin: "0 auto",
                transform: !isFlipping && result === "tails" ? "rotateY(180deg)" :
                          !isFlipping && result === "heads" ? "rotateY(0deg)" :
                          undefined,
                transition: !isFlipping ? "transform 0.6s ease-out" : "none",
              }}
            >
              {/* 硬币正面 */}
              <div
                className="coin-face coin-front"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                  boxShadow: `
                    inset -10px -10px 20px rgba(0,0,0,0.2),
                    inset 10px 10px 20px rgba(255,255,255,0.3),
                    0 20px 40px rgba(0,0,0,0.3)
                  `,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid #B8860B",
                }}
              >
                <div className="text-6xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-white drop-shadow-md">YES</div>
              </div>

              {/* 硬币反面 - 光滑的硬币 */}
              <div
                className="coin-face coin-back"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #F5F5F5 0%, #D3D3D3 40%, #A8A8A8 100%)",
                  boxShadow: `
                    inset -15px -15px 30px rgba(0,0,0,0.3),
                    inset 15px 15px 30px rgba(255,255,255,0.5),
                    0 20px 40px rgba(0,0,0,0.3)
                  `,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "4px solid #909090",
                }}
              >
                {/* 光滑表面的高光效果 */}
                <div
                  style={{
                    position: "absolute",
                    width: "60%",
                    height: "60%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.4) 0%, transparent 70%)",
                    top: "10%",
                    left: "10%",
                  }}
                />
              </div>

              {/* 硬币边缘（厚度效果） */}
              <div
                className="coin-edge"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: "linear-gradient(90deg, #B8860B 0%, #FFD700 25%, #B8860B 50%, #FFD700 75%, #B8860B 100%)",
                  transform: "translateZ(-10px)",
                  border: "4px solid #B8860B",
                }}
              />
            </div>
          )}

          {result === "disappeared" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <div className="text-6xl mb-4">🕳️</div>
                <p className="text-xl text-white drop-shadow-md">哎呀！硬币滚走了...</p>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="mb-6 text-2xl font-bold animate-fade-in">
            {result === "heads" && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-yellow-500">⭐ 正面 - 就这么决定啦！</p>
              </div>
            )}
            {result === "tails" && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-gray-600">⚪ 反面 - 就这么决定啦！</p>
              </div>
            )}
            {result === "standing" && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-pink-500">🎪 哇！硬币立住了！你太幸运了！</p>
              </div>
            )}
            {result === "disappeared" && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-gray-500">💫 硬币消失了...</p>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className={`px-8 py-4 rounded-full text-xl font-bold text-white transition-all transform ${
              isFlipping
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-pink-500/50 hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
            }`}
            style={{
              boxShadow: isFlipping ? "" : "0 8px 20px rgba(236, 72, 153, 0.4)",
            }}
          >
            {isFlipping ? "硬币飞起来啦~ ✨" : "让命运决定 🎲"}
          </button>
        </div>

        <div className="mt-12 text-sm text-white/90 space-y-1 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
          <p className="font-bold text-base mb-2">🎯 概率说明：</p>
          <p>⭐ 正面 47% - 就这么办！</p>
          <p>⚪ 反面 47% - 换个想法</p>
          <p>🎪 立住 5% - 超级幸运</p>
          <p>🕳️ 消失 1% - 命运的玩笑</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes coinFlip {
          0% {
            transform: translateY(0) rotateY(0deg) rotateX(0deg);
          }
          20% {
            transform: translateY(-150px) rotateY(360deg) rotateX(180deg) scale(1.1);
          }
          40% {
            transform: translateY(-180px) rotateY(720deg) rotateX(360deg) scale(1.15);
          }
          60% {
            transform: translateY(-150px) rotateY(1080deg) rotateX(540deg) scale(1.1);
          }
          85% {
            transform: translateY(0) rotateY(1440deg) rotateX(720deg) scale(1);
          }
          92% {
            transform: translateY(-20px) rotateY(1440deg) rotateX(720deg) scale(1.05);
          }
          100% {
            transform: translateY(0) rotateY(0deg) rotateX(0deg) scale(1);
          }
        }

        @keyframes wobble {
          0%,
          100% {
            transform: rotate(90deg) translateX(-2px);
          }
          25% {
            transform: rotate(90deg) translateX(2px);
          }
          50% {
            transform: rotate(90deg) translateX(-2px);
          }
          75% {
            transform: rotate(90deg) translateX(2px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .coin-container.flipping {
          animation: coinFlip 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .coin-container:not(.flipping).show-heads {
          transform: rotateY(0deg);
        }

        .coin-container:not(.flipping).show-tails {
          transform: rotateY(180deg);
        }

        .coin-container.standing {
          transform: rotate(90deg);
          width: 12px !important;
        }

        .coin-container.standing .coin-face {
          animation: wobble 0.5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        /* 移动端适配 */
        @media (max-width: 768px) {
          .coin-container {
            width: 150px !important;
            height: 150px !important;
          }
        }
      `}</style>
    </div>
  );
}
