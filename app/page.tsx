"use client";

import { useState } from "react";

type CoinResult = "heads" | "tails" | "standing" | "disappeared";
type Mode = "coin" | "wheel";

interface WheelOption {
  id: string;
  text: string;
  color: string;
}

const defaultColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
];

export default function Home() {
  // 模式切换
  const [mode, setMode] = useState<Mode>("coin");

  // 抛硬币状态
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<CoinResult | null>(null);
  const [showCoin, setShowCoin] = useState(true);
  const [headsText, setHeadsText] = useState("YES");
  const [tailsText, setTailsText] = useState("NO");

  // 轮盘状态
  const [wheelOptions, setWheelOptions] = useState<WheelOption[]>([
    { id: "1", text: "选项1", color: defaultColors[0] },
    { id: "2", text: "选项2", color: defaultColors[1] },
    { id: "3", text: "选项3", color: defaultColors[2] },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);
    setShowCoin(true);

    setTimeout(() => {
      const random = Math.random() * 100;
      let finalResult: CoinResult;

      if (random < 1) {
        finalResult = "disappeared";
        setShowCoin(false);
      } else if (random < 6) {
        finalResult = "standing";
      } else if (random < 53) {
        finalResult = "heads";
      } else {
        finalResult = "tails";
      }

      setResult(finalResult);
      setIsFlipping(false);
    }, 2500);
  };

  const spinWheel = () => {
    if (isSpinning || wheelOptions.length < 3) return;

    setIsSpinning(true);
    setWheelResult(null);

    // 随机选择一个选项
    const randomIndex = Math.floor(Math.random() * wheelOptions.length);
    const selectedOption = wheelOptions[randomIndex];

    // 计算旋转角度
    const baseRotation = 360 * 5; // 至少转5圈
    const segmentAngle = 360 / wheelOptions.length;
    const targetAngle = segmentAngle * randomIndex + segmentAngle / 2;
    const finalRotation = baseRotation + (360 - targetAngle);

    setRotation(rotation + finalRotation);

    setTimeout(() => {
      setWheelResult(selectedOption.text);
      setIsSpinning(false);
    }, 4000);
  };

  const addOption = () => {
    if (wheelOptions.length >= 5) return;
    const newId = Date.now().toString();
    const newOption: WheelOption = {
      id: newId,
      text: `选项${wheelOptions.length + 1}`,
      color: defaultColors[wheelOptions.length % defaultColors.length],
    };
    setWheelOptions([...wheelOptions, newOption]);
  };

  const removeOption = (id: string) => {
    if (wheelOptions.length <= 3) return;
    setWheelOptions(wheelOptions.filter((opt) => opt.id !== id));
  };

  const updateOption = (id: string, text: string) => {
    setWheelOptions(
      wheelOptions.map((opt) => (opt.id === id ? { ...opt, text } : opt))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* 顶部导航 */}
      <div className="w-full bg-white/10 backdrop-blur-md shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
              🎲 决策助手
            </h1>
            <div className="flex gap-2 bg-white/20 rounded-full p-1">
              <button
                onClick={() => setMode("coin")}
                className={`px-4 py-2 rounded-full font-bold transition-all ${
                  mode === "coin"
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                }`}
              >
                🪙 抛硬币
              </button>
              <button
                onClick={() => setMode("wheel")}
                className={`px-4 py-2 rounded-full font-bold transition-all ${
                  mode === "wheel"
                    ? "bg-white text-purple-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                }`}
              >
                🎡 转轮盘
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {mode === "coin" ? (
            // 抛硬币界面
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
                让硬币帮你做决定！
              </h2>

              {/* 自定义输入框 */}
              <div className="mb-8 bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">
                      ⭐ 正面结果
                    </label>
                    <input
                      type="text"
                      value={headsText}
                      onChange={(e) => setHeadsText(e.target.value)}
                      placeholder="输入正面文字"
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">
                      ⚪ 反面结果
                    </label>
                    <input
                      type="text"
                      value={tailsText}
                      onChange={(e) => setTailsText(e.target.value)}
                      placeholder="输入反面文字"
                      maxLength={10}
                      className="w-full px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 硬币动画 */}
              <div className="relative w-64 h-64 mx-auto mb-8" style={{ perspective: "1000px" }}>
                {showCoin && (
                  <div
                    className={`coin-container ${isFlipping ? "flipping" : ""} ${
                      result === "standing" ? "standing" : ""
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      position: "relative",
                      width: "200px",
                      height: "200px",
                      margin: "0 auto",
                      transform:
                        !isFlipping && result === "tails"
                          ? "rotateY(180deg)"
                          : !isFlipping && result === "heads"
                          ? "rotateY(0deg)"
                          : undefined,
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
                      <div className="text-2xl font-bold text-white drop-shadow-md break-words px-2">
                        {headsText || "YES"}
                      </div>
                    </div>

                    {/* 硬币反面 */}
                    <div
                      className="coin-face coin-back"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle at 30% 30%, #F5F5F5 0%, #D3D3D3 40%, #A8A8A8 100%)",
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
                      <div
                        style={{
                          position: "absolute",
                          width: "60%",
                          height: "60%",
                          borderRadius: "50%",
                          background:
                            "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.4) 0%, transparent 70%)",
                          top: "10%",
                          left: "10%",
                        }}
                      />
                    </div>

                    {/* 硬币边缘 */}
                    <div
                      className="coin-edge"
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(90deg, #B8860B 0%, #FFD700 25%, #B8860B 50%, #FFD700 75%, #B8860B 100%)",
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
                      <p className="text-xl text-white drop-shadow-md">硬币滚走了...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 结果显示 */}
              {result && (
                <div className="mb-6 animate-fade-in">
                  {result === "heads" && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                      <p className="text-2xl font-bold text-yellow-500">
                        ⭐ 正面 - {headsText || "YES"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">就这么决定啦！</p>
                    </div>
                  )}
                  {result === "tails" && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                      <p className="text-2xl font-bold text-gray-600">
                        ⚪ 反面 - {tailsText || "NO"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">就这么决定啦！</p>
                    </div>
                  )}
                  {result === "standing" && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                      <p className="text-2xl font-bold text-pink-500">
                        🎪 哇！硬币立住了！你太幸运了！
                      </p>
                    </div>
                  )}
                  {result === "disappeared" && (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                      <p className="text-2xl font-bold text-gray-500">💫 硬币消失了...</p>
                    </div>
                  )}
                </div>
              )}

              {/* 操作按钮 */}
              <button
                onClick={flipCoin}
                disabled={isFlipping}
                className={`px-8 py-4 rounded-full text-xl font-bold text-white transition-all transform ${
                  isFlipping
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-pink-500/50 hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                }`}
              >
                {isFlipping ? "硬币飞起来啦~ ✨" : "让命运决定 🎲"}
              </button>

              {/* 概率说明 */}
              <div className="mt-8 text-sm text-white/90 space-y-1 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <p className="font-bold text-base mb-2">🎯 概率说明：</p>
                <p>⭐ 正面 47% | ⚪ 反面 47% | 🎪 立住 5% | 🕳️ 消失 1%</p>
              </div>
            </div>
          ) : (
            // 转轮盘界面
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
                转动轮盘，随机选择！
              </h2>

              {/* 选项编辑区 */}
              <div className="mb-8 bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                <div className="space-y-3 mb-4">
                  {wheelOptions.map((option, index) => (
                    <div key={option.id} className="flex gap-2 items-center">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: option.color }}
                      />
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => updateOption(option.id, e.target.value)}
                        placeholder={`选项${index + 1}`}
                        maxLength={15}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      />
                      {wheelOptions.length > 3 && (
                        <button
                          onClick={() => removeOption(option.id)}
                          className="px-3 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {wheelOptions.length < 5 && (
                  <button
                    onClick={addOption}
                    className="w-full px-4 py-3 bg-white/30 hover:bg-white/40 text-white font-bold rounded-xl transition-all"
                  >
                    ➕ 添加选项 ({wheelOptions.length}/5)
                  </button>
                )}
              </div>

              {/* 轮盘 */}
              <div className="relative w-80 h-80 mx-auto mb-8">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="320"
                    height="320"
                    viewBox="0 0 320 320"
                    className="drop-shadow-2xl"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning
                        ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                        : "none",
                    }}
                  >
                    {wheelOptions.map((option, index) => {
                      const segmentAngle = 360 / wheelOptions.length;
                      const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
                      const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

                      const x1 = 160 + 150 * Math.cos(startAngle);
                      const y1 = 160 + 150 * Math.sin(startAngle);
                      const x2 = 160 + 150 * Math.cos(endAngle);
                      const y2 = 160 + 150 * Math.sin(endAngle);

                      const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                      const textAngle = index * segmentAngle + segmentAngle / 2;
                      const textRadius = 100;
                      const textX = 160 + textRadius * Math.cos((textAngle - 90) * (Math.PI / 180));
                      const textY = 160 + textRadius * Math.sin((textAngle - 90) * (Math.PI / 180));

                      return (
                        <g key={option.id}>
                          <path
                            d={`M 160 160 L ${x1} ${y1} A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={option.color}
                            stroke="white"
                            strokeWidth="3"
                          />
                          <text
                            x={textX}
                            y={textY}
                            fill="white"
                            fontSize="18"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                            style={{
                              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                            }}
                          >
                            {option.text}
                          </text>
                        </g>
                      );
                    })}
                    {/* 中心圆 */}
                    <circle cx="160" cy="160" r="30" fill="white" stroke="#333" strokeWidth="3" />
                    <text
                      x="160"
                      y="165"
                      fill="#333"
                      fontSize="24"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      🎯
                    </text>
                  </svg>
                </div>

                {/* 指针 */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2"
                  style={{ zIndex: 10 }}
                >
                  <div
                    className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-red-500"
                    style={{
                      filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                    }}
                  />
                </div>
              </div>

              {/* 结果显示 */}
              {wheelResult && (
                <div className="mb-6 animate-fade-in">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                    <p className="text-2xl font-bold text-purple-600">🎉 结果：{wheelResult}</p>
                    <p className="text-sm text-gray-500 mt-1">就选这个吧！</p>
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <button
                onClick={spinWheel}
                disabled={isSpinning || wheelOptions.length < 3}
                className={`px-8 py-4 rounded-full text-xl font-bold text-white transition-all transform ${
                  isSpinning || wheelOptions.length < 3
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-purple-500/50 hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                }`}
              >
                {isSpinning ? "轮盘转动中~ 🌀" : "开始转动 🎡"}
              </button>

              {/* 提示 */}
              <div className="mt-8 text-sm text-white/90 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <p className="font-bold text-base mb-2">💡 使用提示：</p>
                <p>支持 3-5 个选项，每个选项最多 15 个字符</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部链接 */}
      <div className="w-full py-6 flex justify-center">
        <a
          href="https://xhslink.com/m/9uUK2MTrk3v"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full text-base font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105 hover:-translate-y-1 active:scale-100 active:translate-y-0 flex items-center gap-2"
        >
          <span>📕</span>
          <span>关注我的小红书</span>
        </a>
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
