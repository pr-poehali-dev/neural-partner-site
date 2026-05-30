import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const REFERRAL_URL = "https://YOUR_REFERRAL_LINK_HERE";

const faqs = [
  {
    q: "Как начать зарабатывать?",
    a: "Зарегистрируйтесь по реферальной ссылке, получите персональный код и начинайте делиться им. Каждый привлечённый пользователь приносит вам комиссию с его платежей — автоматически и навсегда.",
  },
  {
    q: "Когда и как выплачиваются деньги?",
    a: "Выплаты производятся каждые 2 недели на банковскую карту, криптокошелёк или электронный кошелёк. Минимальная сумма вывода — 500 рублей.",
  },
  {
    q: "Есть ли ограничения на количество рефералов?",
    a: "Никаких ограничений нет. Чем больше людей вы привлечёте — тем больше ваш пассивный доход. Некоторые партнёры зарабатывают от 300 000 ₽ в месяц.",
  },
  {
    q: "Нужен ли опыт в маркетинге или IT?",
    a: "Совершенно нет. Вам нужна только аудитория — подписчики, друзья, коллеги. Мы предоставим все материалы для продвижения: баннеры, тексты, видео.",
  },
  {
    q: "Реферальная ссылка действует бессрочно?",
    a: "Да. Ваша ссылка активна бессрочно, и вы получаете комиссию со всех платежей привлечённых пользователей на протяжении всего времени их подписки.",
  },
];

const cases = [
  {
    name: "Артём К.",
    city: "Москва",
    niche: "YouTube-блогер",
    income: "87 400 ₽",
    period: "за месяц",
    referrals: 312,
    emoji: "🎬",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Марина Д.",
    city: "Санкт-Петербург",
    niche: "Telegram-канал об IT",
    income: "214 000 ₽",
    period: "за месяц",
    referrals: 891,
    emoji: "✈️",
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Дмитрий В.",
    city: "Екатеринбург",
    niche: "SMM-агентство",
    income: "43 200 ₽",
    period: "за месяц",
    referrals: 156,
    emoji: "📱",
    color: "from-pink-500 to-rose-600",
  },
];

const advantages = [
  {
    icon: "Zap",
    title: "До 35% комиссии",
    desc: "Один из самых высоких процентов на рынке партнёрских программ в нише ИИ",
    glow: "#6366f1",
  },
  {
    icon: "Repeat2",
    title: "Пожизненные отчисления",
    desc: "Вы зарабатываете на всех платежах реферала — не только на первом",
    glow: "#22d3ee",
  },
  {
    icon: "BarChart3",
    title: "Реальная аналитика",
    desc: "Личный кабинет с подробной статистикой: клики, регистрации, доход",
    glow: "#f472b6",
  },
  {
    icon: "Headphones",
    title: "Поддержка 24/7",
    desc: "Персональный менеджер ответит на любой вопрос в течение 15 минут",
    glow: "#a3e635",
  },
  {
    icon: "Gift",
    title: "Бонусы за объём",
    desc: "Чем больше рефералов — тем выше ставка. Топ-партнёры получают до 50%",
    glow: "#fb923c",
  },
  {
    icon: "Shield",
    title: "Честные выплаты",
    desc: "Прозрачная система без скрытых вычетов. Все начисления видны в реальном времени",
    glow: "#34d399",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

function StatCounter({
  target,
  label,
  prefix = "",
  suffix = "",
  triggered,
}: {
  target: number;
  label: string;
  prefix?: string;
  suffix?: string;
  triggered: boolean;
}) {
  const value = useCountUp(target, 2200, triggered);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold font-oswald bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
        {prefix}
        {value.toLocaleString("ru")}
        {suffix}
      </div>
      <div className="text-white/60 mt-2 text-sm md:text-base font-golos">{label}</div>
    </div>
  );
}

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-full pointer-events-none" style={style} />;
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsTriggered(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    style: {
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: ["#818cf8", "#22d3ee", "#f472b6", "#a78bfa"][i % 4],
      opacity: Math.random() * 0.5 + 0.15,
      animation: `float-${(i % 3) + 1} ${6 + Math.random() * 6}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 4}s`,
    } as React.CSSProperties,
  }));

  return (
    <div className="min-h-screen bg-[#080b18] text-white overflow-x-hidden font-golos">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#080b18]/90 backdrop-blur-md border-b border-white/10" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <span className="text-sm">🤖</span>
            </div>
            <span className="font-oswald text-lg font-bold tracking-wide">NeuralPartner</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#advantages" className="hover:text-white transition-colors">Преимущества</a>
            <a href="#conditions" className="hover:text-white transition-colors">Условия</a>
            <a href="#cases" className="hover:text-white transition-colors">Кейсы</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href={REFERRAL_URL}
            className="bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Стать партнёром
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-[#080b18] to-cyan-900/30" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
          {particles.map((p) => (
            <Particle key={p.id} style={p.style} />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80">Партнёрская программа активна · 4 200+ партнёров</span>
          </div>

          <h1 className="font-oswald text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Зарабатывай на{" "}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-pink-400 bg-clip-text text-transparent">
              нейросетях
            </span>
            <br />
            пока они работают
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Приглашай пользователей и получай до <strong className="text-white">35% комиссии</strong> с каждого их платежа — пожизненно
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <a
              href={REFERRAL_URL}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white font-bold text-lg px-10 py-5 rounded-2xl hover:opacity-90 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30"
            >
              <Icon name="Rocket" size={22} />
              Начать зарабатывать
              <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#cases"
              className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold text-lg px-8 py-5 rounded-2xl transition-all hover:bg-white/5"
            >
              <Icon name="Play" size={18} />
              Смотреть кейсы
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-white/50 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {["🔒 Выплаты каждые 2 недели", "📊 Прозрачная аналитика", "🎯 Без скрытых комиссий"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/30" />
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-transparent to-cyan-900/20" />
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCounter target={4200} label="активных партнёров" suffix="+" triggered={statsTriggered} />
            <StatCounter target={128} label="млн рублей выплачено" prefix="₽" suffix="M+" triggered={statsTriggered} />
            <StatCounter target={40} label="максимальная комиссия" suffix="%" triggered={statsTriggered} />
            <StatCounter target={98} label="партнёров довольны" suffix="%" triggered={statsTriggered} />
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest">Почему мы</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 mb-4">
              Преимущества программы
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Мы создали партнёрку, которую хотели бы видеть сами — честную, выгодную и простую
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:-translate-y-1 hover:bg-white/8"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${adv.glow}22`, border: `1px solid ${adv.glow}44` }}
                >
                  <Icon name={adv.icon} size={22} style={{ color: adv.glow }} />
                </div>
                <h3 className="font-oswald text-xl font-bold mb-2">{adv.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{adv.desc}</p>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ boxShadow: `inset 0 0 40px ${adv.glow}10` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section id="conditions" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-widest">Как это работает</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 mb-4">Условия программы</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-violet-900/40 to-violet-900/10 border border-violet-500/30 rounded-3xl p-8">
              <div className="text-5xl font-oswald font-black text-violet-400 mb-2">до 35%</div>
              <div className="text-xl font-semibold mb-3">Комиссия с каждого платежа</div>
              <p className="text-white/50 text-sm leading-relaxed">
                Начинаете с базовой ставки 15%. По мере роста числа рефералов ставка увеличивается до 20% и максимальных 35%. Ставка растёт автоматически.
              </p>
              <div className="mt-6 space-y-2">
                {[
                  { label: "0–50 рефералов", rate: "15%", w: "43%" },
                  { label: "50–200 рефералов", rate: "20%", w: "57%" },
                  { label: "200+ рефералов", rate: "35%", w: "100%" },
                ].map((tier) => (
                  <div key={tier.label} className="flex items-center gap-3">
                    <div className="text-xs text-white/50 w-36">{tier.label}</div>
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-400"
                        style={{ width: tier.w }}
                      />
                    </div>
                    <div className="text-sm font-bold text-violet-400 w-10 text-right">{tier.rate}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: "UserPlus", title: "Регистрируйтесь", desc: "Перейдите по ссылке и создайте партнёрский аккаунт за 2 минуты", color: "#818cf8" },
                { icon: "Link", title: "Получите ссылку", desc: "Уникальная реферальная ссылка и промо-материалы уже в личном кабинете", color: "#22d3ee" },
                { icon: "Share2", title: "Делитесь", desc: "Публикуйте в соцсетях, блоге, Telegram-канале или отправляйте друзьям", color: "#f472b6" },
                { icon: "Banknote", title: "Получайте деньги", desc: "Автоматические выплаты каждые 2 недели без заявок и ожидания", color: "#a3e635" },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}22` }}
                  >
                    <Icon name={step.icon} size={18} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">{step.title}</div>
                    <div className="text-white/50 text-sm">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href={REFERRAL_URL}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-bold text-lg px-12 py-5 rounded-2xl hover:opacity-90 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25"
            >
              <Icon name="Sparkles" size={20} />
              Зарегистрироваться и начать
            </a>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-pink-400 font-semibold text-sm uppercase tracking-widest">Реальные результаты</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 mb-4">Кейсы партнёров</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Реальные истории людей, которые монетизировали свою аудиторию через нашу программу
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {cases.map((c, i) => (
              <div
                key={i}
                className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color}`} />
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-xl`}>
                    {c.emoji}
                  </div>
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-white/40 text-xs">{c.city} · {c.niche}</div>
                  </div>
                </div>
                <div className={`text-4xl font-oswald font-black bg-gradient-to-r ${c.color} bg-clip-text text-transparent mb-1`}>
                  {c.income}
                </div>
                <div className="text-white/40 text-sm mb-4">{c.period}</div>
                <div className="flex items-center gap-2 text-sm text-white/50 border-t border-white/10 pt-4">
                  <Icon name="Users" size={14} />
                  <span>{c.referrals} рефералов привлечено</span>
                </div>
              </div>
            ))}
          </div>

          {/* Live counter */}
          <div className="bg-gradient-to-r from-violet-900/40 via-purple-900/40 to-cyan-900/40 border border-white/10 rounded-3xl p-8 text-center">
            <div className="text-white/50 text-sm mb-2 uppercase tracking-widest">Суммарный заработок всех партнёров</div>
            <div className="font-oswald text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              ₽ 128 457 320
            </div>
            <div className="text-white/30 text-xs mt-2">обновляется ежедневно</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 mb-4">Частые вопросы</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all ${
                  openFaq === i ? "border-violet-500/50 bg-violet-900/20" : "border-white/10 bg-white/5"
                }`}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-base">{faq.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={18}
                    className={`flex-shrink-0 text-white/40 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest">Контакты</span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold mt-3 mb-6">Остались вопросы?</h2>
          <p className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
            Наш менеджер ответит в течение 15 минут и поможет начать зарабатывать
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://t.me/your_telegram"
              className="inline-flex items-center gap-3 bg-[#229ED9] hover:bg-[#1a8fc2] text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105"
            >
              <span className="text-xl">✈️</span> Написать в Telegram
            </a>
            <a
              href="mailto:partner@example.com"
              className="inline-flex items-center gap-3 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 font-semibold px-8 py-4 rounded-2xl transition-all"
            >
              <Icon name="Mail" size={18} />
              partner@example.com
            </a>
          </div>

          {/* Final CTA */}
          <div className="relative bg-gradient-to-br from-violet-900/60 via-purple-900/40 to-cyan-900/40 border border-white/10 rounded-3xl p-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-oswald text-3xl md:text-4xl font-bold mb-4">
                Начни зарабатывать прямо сейчас
              </h3>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                Тысячи партнёров уже получают пассивный доход. Присоединяйся!
              </p>
              <a
                href={REFERRAL_URL}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 text-white font-bold text-xl px-12 py-5 rounded-2xl hover:opacity-90 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30"
              >
                <Icon name="Rocket" size={22} />
                Зарегистрироваться бесплатно
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs">🤖</div>
            <span>NeuralPartner © 2024</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/60 transition-colors">Условия использования</a>
          </div>
        </div>
      </footer>
    </div>
  );
}