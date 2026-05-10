import "../styles/Home.css";
import { motion } from "framer-motion";
import { CloudRain } from "lucide-react";
import { useEffect, useState } from "react";
import { getWeather } from "../api/weatherApi";

function Home() {
  const getWeatherText = (code) => {
    if (code === 0) return "맑음 ☀️";
    if (code <= 3) return "구름 많음 ☁️";
    if (code <= 67) return "비 🌧️";
    if (code <= 77) return "눈 ❄️";
    return "흐림 ☁️";
  };

  const getRecommendation = (
    weatherCode,
    mood
  ) => {
    const weatherType =
        weatherCode === 0
        ? "sunny"
        : weatherCode <= 67
        ? "rainy"
        : "cloudy";

    if (
        weatherType === "sunny" &&
        mood.includes("행복")
    ) {
        return {
        message:
            "🔥 액션 · 코미디 웹툰 추천!",
        list:
            recommendedWebtoons.action,
        };
    }

    if (
        weatherType === "rainy" &&
        mood.includes("우울")
    ) {
        return {
        message:
            "🌿 힐링 · 위로 웹툰 추천!",
        list:
            recommendedWebtoons.healing,
        };
    }

    if (
        weatherType === "cloudy" &&
        mood.includes("감성")
    ) {
        return {
        message:
            "💜 감성 로맨스 추천!",
        list:
            recommendedWebtoons.romance,
        };
    }

    return {
        message:
        "😴 잔잔한 일상 웹툰 추천!",
        list:
        recommendedWebtoons.daily,
    };
  };

  const getRecommendationReason = (
    weatherCode,
    mood
    ) => {
    const weatherText =
        getWeatherText(weatherCode);

    return `
    오늘 날씨는 ${weatherText} 상태예요.
    당신은 '${mood}' 기분을 선택했어요.
    그래서 현재 감정에 어울리는 웹툰을 추천했어요 💜
    `;
  };

  const [selectedMood, setSelectedMood] =
    useState("");

  const [weather, setWeather] =
    useState(null);

  const [recommendation, setRecommendation] =
    useState(null);

  const [recommendReason, setRecommendReason] =
    useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather();

      if (data) {
        setWeather(data);
      }
    };

    fetchWeather();
  }, []);

  const moods = [
    "😀 행복",
    "😴 피곤",
    "😭 우울",
    "😡 스트레스",
    "🥹 감성적",
    "🤩 신남",
  ];

  const recommendedWebtoons = {
    action: [
        {
        title: "전지적 독자 시점",
        genre: "판타지 · 액션",
        },
        {
        title: "화산귀환",
        genre: "무협 · 액션",
        },
    ],

    healing: [
        {
        title: "마루는 강쥐",
        genre: "힐링 · 일상",
        },
        {
        title: "냐한남자",
        genre: "힐링 · 개그",
        },
    ],

    romance: [
        {
        title: "유미의 세포들",
        genre: "로맨스 · 일상",
        },
        {
        title: "바른연애 길잡이",
        genre: "캠퍼스 · 로맨스",
        },
    ],

    daily: [
        {
        title: "독립일기",
        genre: "일상",
        },
        {
        title: "오늘의 순정망화",
        genre: "코미디",
        },
    ],
  };

  const webtoons = [
    {
      title: "전지적 독자 시점",
      genre: "판타지 · 액션",
      image: "https://thf.bing.com/th/id/OIP.H3Ly3Taa_JbkQM0-ARr9PwHaKu?w=186&h=270&c=7&r=0&o=7&cb=thfc1&pid=1.7&rm=3"   ,
    },
    {
      title: "화산귀환",
      genre: "무협 · 액션",
      image: "https://thf.bing.com/th/id/OIP.6_S8rh6Ir7dDewf4Di6NhQHaKu?w=186&h=270&c=7&r=0&o=7&cb=thfc1&pid=1.7&rm=3"   ,
    },
    {
      title: "마루는 강쥐",
      genre: "힐링 · 일상",
      image: "https://thf.bing.com/th/id/OIP.E140PjowekF0YCuIZJycUwHaNK?w=115&h=189&c=7&r=0&o=7&cb=thfc1&pid=1.7&rm=3"   ,
    },
    {
      title: "유미의 세포들",
      genre: "로맨스 · 일상",
      image: "https://thf.bing.com/th/id/OIP.5jSPAep7ynEQ9pvpIrtheQHaKv?w=131&h=187&c=7&r=0&o=7&cb=thfc1&pid=1.7&rm=3"   ,
    },
  ];

  return (
    <div className="home">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>
          오늘 기분에 맞는 웹툰 추천 🎭
        </h1>

        <p>
          날씨와 감정으로
          나만의 웹툰을 찾아보세요
        </p>

        <button>추천받기</button>
      </motion.section>

      <section className="info-section">
        <div className="weather-card">
          <div className="weather-title">
            <CloudRain />
            <h3>오늘 날씨</h3>
          </div>

          <p className="weather-main">
            서울 ·{" "}
            {getWeatherText(
              weather?.current?.weather_code
            )}          
          </p>

          <span>
            현재 온도:
            {weather?.current?.temperature_2m ?? "--"}°C
          </span>
        </div>

        <div className="mood-box">
          <h2>
            오늘 기분은 어떤가요?
          </h2>

          <div className="mood-buttons">
            {moods.map((mood) => (
              <button
                key={mood}
                className={
                  selectedMood === mood
                    ? "selected"
                    : ""
                }
                onClick={() => {
                    setSelectedMood(mood);

                    const result =
                        getRecommendation(
                            weather?.current?.weather_code,
                            mood
                        );

                    setRecommendation(result);
                    const reason =
                        getRecommendationReason(
                            weather?.current?.weather_code,
                            mood
                        );

                    setRecommendReason(reason);
                }}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </section>

      {recommendation && (
        <section className="recommend-box">
            <h2>
                🎯 오늘의 추천 결과
            </h2>

            <p>{recommendation.message}</p>

            <p className="recommend-reason">
                {recommendReason}
            </p>

            <div className="recommend-grid">
                {recommendation.list.map(
                    (toon) => (
                    <div
                        className="recommend-card"
                        key={toon.title}
                    >
                        <div className="thumbnail" />

                        <h3>{toon.title}</h3>
                        <span>{toon.genre}</span>
                    </div>
                    )
                )}
            </div>
        </section>
      )}

      <section className="popular-section">
        <h2>
          🔥 오늘의 인기 웹툰
        </h2>

        <div className="webtoon-grid">
          {webtoons.map((toon) => (
            <div
              className="webtoon-card"
              key={toon.title}
            >
              <img
                className="thumbnail"
                src={toon.image}
                alt={toon.title}
              />

              <div className="card-content">
                <h3>{toon.title}</h3>
                <p>{toon.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;