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
    }, 2000);
  };

  const resetCoin = () => {
    setResult(null);
    setShowCoin(true);
    setIsFlipping(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-red-600">
          🐴 马年抛硬币 🐴
        </h1>

        <div className="relative w-64 h-64 mx-auto mb-8">
          {showCoin && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ${
                isFlipping ? "animate-flip" : ""
              } ${result === "standing" ? "animate-wobble" : ""}`}
            >
              <div
                className={`w-48 h-48 rounded-full shadow-2xl flex items-center justify-center text-6xl font-bold transition-all duration-500 ${
                  result === "standing"
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 transform rotate-90 w-12"
                    : result === "heads" || (!result && !isFlipping)
                    ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600"
                    : "bg-gradient-to-br from-red-500 via-red-600 to-red-700"
                }`}
                style={{
                  border: "4px solid #d97706",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
              >
                {result === "standing" ? (
                  <span className="text-2xl transform -rotate-90">🐴</span>
                ) : result === "heads" || (!result && !isFlipping) ? (
                  <span>🐴</span>
                ) : result === "tails" ? (
                  <span>福</span>
                ) : null}
              </div>
            </div>
          )}

          {result === "disappeared" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center animate-fade-in">
                <div className="text-6xl mb-4">🕳️</div>
                <p className="text-xl text-gray-600">硬币滚进下水道了...</p>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="mb-6 text-2xl font-bold animate-fade-in">
            {result === "heads" && (
              <p className="text-yellow-600">🎉 正面 - 马到成功！</p>
            )}
            {result === "tails" && (
              <p className="text-red-600">🎊 反面 - 福星高照！</p>
            )}
            {result === "standing" && (
              <p className="text-orange-600">✨ 硬币立住了！一马当先！</p>
            )}
            {result === "disappeared" && (
              <p className="text-gray-600">💫 硬币消失了...</p>
            )}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className={`px-8 py-4 rounded-full text-xl font-bold text-white transition-all transform hover:scale-105 ${
              isFlipping
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg"
            }`}
          >
            {isFlipping ? "抛硬币中..." : "抛硬币"}
          </button>

          {result && (
            <button
              onClick={resetCoin}
              className="px-8 py-4 rounded-full text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all transform hover:scale-105"
            >
              再来一次
            </button>
          )}
        </div>

        <div className="mt-12 text-sm text-gray-500 space-y-1">
          <p>💡 小提示：</p>
          <p>正面/反面各 47% 概率</p>
          <p>硬币立住 5% 概率</p>
          <p>硬币消失 1% 概率</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes flip {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(180deg) rotateX(180deg) translateY(-50px);
          }
          50% {
            transform: rotateY(360deg) rotateX(360deg) translateY(-80px);
          }
          75% {
            transform: rotateY(540deg) rotateX(540deg) translateY(-50px);
          }
          100% {
            transform: rotateY(720deg) rotateX(720deg) translateY(0);
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
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-flip {
          animation: flip 2s ease-in-out;
        }

        .animate-wobble {
          animation: wobble 0.5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
