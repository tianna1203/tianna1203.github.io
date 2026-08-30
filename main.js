/* =====================================================================
   薛天楽 XUE TIANLE — 個人サイト
   インタラクション（バニラ JS・依存なし）

   1. データ定義（プロジェクト詳細 / 論文要旨）
   2. 汎用ヘルパー
   3. ヘッダー：スクロール状態 / モバイルメニュー / 現在地ハイライト
   4. スクロール連動の登場アニメーション（IntersectionObserver）
   5. ページ読み込みアニメーション
   6. プロジェクトのフィルタ
   7. 詳細モーダル（内容を動的生成）
   8. 画像ライトボックス
   9. 連絡先フォーム（バリデーション → mailto 生成）
   10. フッターの年号
   ===================================================================== */
(function () {
  "use strict";

  /* ============ 1. データ定義 ============ */
  // 演劇実践：基本情報 + 制作ノート（各作品の docx より）
  const PROJECTS = {
    peergynt: {
      type: "stage",
      eyebrow: "演劇実践 ・ 2024",
      title: "ペール・ギュント――豚の幻想曲（Peer Gynt — Fantasia of a Pig）",
      facts: {
        役割: "プロデューサー／グラフィックデザイン",
        会場: "南京大学ブラックボックスシアター",
        日程: "2024年6月24日・25日・26日・27日",
        備考: "第15回国際イプセン会議 上演作品",
      },
      note:
        "『ペール・ギュント――豚の幻想曲』は、第15回国際イプセン会議の上演作品である。創作初期において、原作の登場人物ペール・ギュントは、私たちにとって北欧の森をさまよう遠い影のような存在だった。私たちは彼を今この瞬間へと引き戻し、自分たちのそばまで引き寄せ、ブラックボックスの中へ放り込もうとした。このときのペール・ギュントは、なぜ観客が3時間もの時間を共に過ごすに値する存在なのか——この問いに向き合いながら、戯曲の再構成を通じて、私たちは今までとは異なるペール・ギュント像を提示しようと試みた。\n\n今回の公演では、プロデューサーを務めた。ゼロから立ち上げるプロデューサー業務としては、これが初めての経験だったと言っていい。資金管理、スケジュール調整、メンバー募集、各方面との連絡調整など、すべてを担った。制作期間は非常に長く、約3か月に及んだ。その間、稽古を重ね、舞台美術デザインや工場とのやり取りを行い、最終的にすべてのアイデアをブラックボックスシアターの中で実現させた。とても大変だったが、それと同じくらい大きな達成感もあった。",
      images: [
        "assets/peergynt/still-1.jpg",
        "assets/peergynt/still-2.jpg",
        "assets/peergynt/still-3.jpg",
        "assets/peergynt/still-4.jpg",
        "assets/peergynt/still-5.jpg",
        "assets/peergynt/design-1.png",
        "assets/peergynt/design-2.jpg",
        "assets/peergynt/design-3.jpg",
        "assets/peergynt/design-4.jpg",
        "assets/peergynt/design-5.jpg",
        "assets/peergynt/design-6.jpg",
      ],
    },

    tomorrow: {
      type: "stage",
      eyebrow: "演劇実践 ・ 2023–2024",
      title: "明日事務所（Tomorrow Office）",
      facts: {
        役割: "演出助手／舞台監督／グラフィックデザイン",
        会場: "南京大学ブラックボックスシアター",
        日程: "第1回 2024年1月5日–7日／第2回 2024年3月22日–24日",
      },
      note:
        "『明日事務所』は、私たちより年上の女性たちと語り合いたいという思いから生まれた作品だ。45歳から72歳までの女性6名にインタビューを行い、現在の生活状況、幼少期の成長環境や家庭の雰囲気、職場での経験、恋愛・性・結婚をめぐる経験、老いと死についての考え、そして今後の生活への願いなどを聞いた。これらの個人的な経験を3人の女性像へと集約し、彼女たちの経験・記憶・言葉を通して、それぞれの人生の姿を描き出そうとした。\n\n通常の日程管理に加え、今回はポスター／宣伝デザインも担当した。稽古の中で言葉や語りが具体的な形をとり、舞台上の一つひとつの断片へと変わっていく——その過程を私は画像としても記録し、この感覚を観客に伝えたいと考えた。",
      images: [
        "assets/tomorrow/still-1.jpg",
        "assets/tomorrow/design-1.jpg",
        "assets/tomorrow/design-2.jpg",
        "assets/tomorrow/design-3.jpg",
        "assets/tomorrow/design-4.jpg",
        "assets/tomorrow/design-5.jpg",
        "assets/tomorrow/design-6.jpg",
      ],
    },

    pinocchio: {
      type: "stage",
      eyebrow: "演劇実践 ・ 2023",
      title: "ピノキオ・ゲーム（Pinocchio Game）",
      facts: {
        役割: "舞台監督",
        会場:
          "南京大学ブラックボックスシアター／南京市栖霞区 摂山星城小学校（朝陽路キャンパス）",
        日程: "2023年7月23日・24日／2023年9月24日",
        備考: "南京大学コミュニティ実験劇場 第2期プロジェクト",
      },
      note:
        "『ピノキオ・ゲーム』は、子どもたちと一緒に作った作品だ。南京大学コミュニティ実験劇場の第2期プロジェクトとして、第2期の主創陣は出稼ぎ労働者家庭の子どもたちへと目を向けた。江蘇滂沱ソーシャルワークサポートセンターおよび南京市協作者コミュニティ発展センターの協力のもと、南京で働く出稼ぎ家庭の子どもたちと出会うことができ、彼らと共に劇場という場で自分自身を探り、見つけ、表現する試みを行った。5月から9月まで、私たちは子どもたちとともにワークショップと稽古を重ねた。\n\n舞台監督として、日常的な進行管理に加えて、子どもたち（そして大人たち）の感情に常に気を配るという仕事も担うことになった。劇団メンバーの感情や心理状態に気を配ることもまた、舞台監督の職務の一部である。むしろ自分自身にとっては、この部分の仕事こそが極めて重要なものだったと言えるかもしれない。",
      images: ["assets/pinocchio/still-1.jpg", "assets/pinocchio/poster-1.jpg"],
    },

    feather: {
      type: "stage",
      eyebrow: "演劇実践 ・ 2023",
      title: "羽根（Feather）",
      facts: {
        役割: "制作",
        会場: "南京大学 教室棟の教室",
        日程: "2023年6月2日・3日",
        形式: "デバイジング・シアター／「未遂の講演会」",
      },
      note:
        "『羽根』は非常に特殊な作品だった。上演場所は教室で、演出の多くがオンライン会議に依存していた。当時はまだコロナ禍の影が誰の上にも重くのしかかっており、大学生たちは学校に閉じ込められ、どこへも行けない状態にあった。そこから逃げ出したいという思いが募る一方で、逃げ出すことは一体何をもたらすのか、という問いもあった。\n\n『羽根』はデバイジング・シアターの手法を用い、俳優たち自身の経験をもとに構成され、最終的に一つの上演として結実した。制作としては、演出家の構想や要求をどう現場に落とし込むかが、当時大きな課題だった。劇団はもはや正式な学内サークルではなくなっており、上演できる場所をどう見つけるかも問題だった。そうして私たちの「上演」は、教室で行われる「未遂の講演会」という形になった。",
      images: [
        "assets/feather/still-1.jpg",
        "assets/feather/still-2.jpg",
        "assets/feather/still-3.jpg",
        "assets/feather/still-4.jpg",
        "assets/feather/still-5.jpg",
      ],
    },

    utopia: {
      type: "stage",
      eyebrow: "演劇実践 ・ 2023",
      title: "子虚先生の理想郷（Mister Non-existence in Utopia）",
      facts: {
        役割: "プロデューサー助手",
        会場: "南京大学ブラックボックスシアター／Aranya演劇祭",
        日程: "2023年3月3日・4日・5日／2023年6月17日",
      },
      note:
        "このカンパニーに加わったのは、すでに2度目の公演だった。2022年の初演をブラックボックスシアターで観て、深く心を動かされた。3時間に及ぶ長さの作品だったが、それでもなお胸を打つものがあった。2度目の公演で、幸運にもプロデューサー助手として初めてカンパニーに加わることができ、そこから自分の劇場生活が始まった。\n\nどうすれば全員の名前を早く覚えられるか、舞台裏の配置に慣れること、時間の調整——人と人とのコミュニケーションの積み重ねの中で、一つの作品はようやく生まれる。",
      images: ["assets/utopia/still-1.jpg", "assets/utopia/poster-1.jpg"],
    },

    /* --- 研究論文：要旨 + キーワード（原文は中国語） --- */
    "paper-premium": {
      type: "research",
      eyebrow: "研究論文 ・ 原文：中国語",
      title:
        "『スーパープレミアムソフトＷバニラリッチ』における儀式性美学に関する考察",
      note:
        "本稿は、岡田利規が2014年に初演した作品『スーパープレミアムソフトWバニラリッチ』を研究対象とし、作品内に潜む「儀式性」について考察する。岡田利規がこれまでほとんど背景音楽を用いてこなかった創作傾向とは異なり、本作は全編にわたってバッハの『平均律クラヴィーア曲集』を音楽として使用しており、身体と音の共同参与によって、彼の演劇に内在してきた儀式性が浮かび上がっている。\n\n本稿は二つの側面から分析を展開する。第一に、身体表現の観点から、岡田利規に特徴的な「ノイズのような不自然にうごめく身体動作」が、自然主義への懐疑と、日常における無意識の動作への「再知覚」的処理を通じて、いかに身体と言語の意味的関連を解消し、形式化・反復的な儀式的動作を形成しているかを検討する。第二に、音楽構造の観点から、バッハの平均律の厳密な楽曲区分が上演にリズム的枠組みをいかに提供しているか、フーガ形式の均質な反復とコンビニのシステムの機械的運営との間に生じる構造的な共鳴を分析する。\n\n本作は24時間営業のコンビニエンスストアを叙述の場とし、特定の味のアイスクリームに執着する一人の女性客の顛末を通じて、現代日本社会において個人が消費システムのベルトコンベアに巻き込まれていく日常のあり方を、儀式的な「異化効果」として観客の前に提示している。",
      keywords: [
        "岡田利規",
        "『スーパープレミアムソフトWバニラリッチ』",
        "儀式性",
        "身体表現",
        "再知覚",
        "バッハ平均律",
        "コンビニエンスストア",
        "異化効果",
      ],
    },

    "paper-real": {
      type: "research",
      eyebrow: "研究論文 ・ 原文：中国語",
      title: "「リアル」の再知覚――岡田利規演劇作品における「超現実」美学",
      note:
        "岡田利規は「ポスト平田オリザ」世代を代表する劇作家・演出家として、独自の言語戦略と身体表現を通じて、「超現実」美学を特徴とする演劇実践を構築してきた。言語の次元においては、間接話法的な語りと日常口語の冗長性を通じて、登場人物と俳優の境界を打ち破っている。身体の方法論においては、うごめくような歪んだ動作を用いることで、身体の意味伝達機能を解放している。\n\nその「超現実」美学は、入れ子状の時空間構造と「幽霊」的なイメージの介入を通じて、現実と虚構の境界をさらに曖昧にし、演劇を過去と現在の経験を結びつける「閾（しきい）」的な空間たらしめている。岡田は現実を出発点としながら、形式的な変形を通じて日常的経験の超越を実現しており、それは日本社会における「失われた十年」という精神的苦境への応答であると同時に、グローバル化の文脈における演劇内の真実と虚構の関係を再考するための、実験的な探索の道筋を提供するものでもある。",
      keywords: [
        "岡田利規",
        "超現実美学",
        "演劇における真実と虚構",
        "身体表現",
        "日本現代演劇",
      ],
    },

    "paper-vtuber": {
      type: "research",
      eyebrow: "研究論文 ・ 原文：中国語",
      title: "物質的隔たりを越える身体――「アバター」の視点から見るVTuber",
      note:
        "本稿は「アバター」を中核概念とし、メルロ゠ポンティの知覚現象学における身体理論を援用しながら、バーチャルライバー（VTuber）の存在論的問題を考察する。バーチャルライバーは初音ミクのような純粋なバーチャルアイドルとは異なり、モーションキャプチャーを通じて実在の演者（「中の人」）によって操演される点に本質的特徴がある。\n\n本稿はメディア・ペルソナ論と擬似社会的関係理論を援用し、バーチャルライバーを「スクリーン上の形象」「キャラクター」「中の人」という三層に分解した上で、化身の二重機能——①モーションキャプチャー装置を「義肢」として身体をスクリーン空間へ延伸させる、知覚的没入の媒体としての機能、②ロールプレイと物語的インタラクションを通じ、中の人の現実の身体を一時的に隠蔽・客体化しつつ虚構を現実へと浸透させる、具身的現前の媒体としての機能——をそれぞれ分析する。\n\n結論として、バーチャルライバーの独自性は化身を介して虚構と現実を双方向に結びつける点にあり、背後の中の人の主体性は、無視できないが前景化もされないという曖昧な位置に置かれ続けている。",
      keywords: [
        "バーチャルライバー",
        "アバター",
        "具身的現前",
        "知覚現象学",
        "メディア・ペルソナ",
        "虚構と現実",
      ],
    },

    "paper-cinemetrics": {
      type: "research",
      eyebrow: "研究論文 ・ 原文：中国語",
      title:
        "シネメトリクスの視点から見るクリス・マルケルの「ドキュメンタリー・エッセイ」的映画スタイル",
      note:
        "本稿は計量映画学（シネメトリクス／Cinemetrics）の手法を用い、編集の観点からクリス・マルケルの「ドキュメンタリー・エッセイ」的映画スタイルを考察する。平均ショット長（ASL）、中間ショット長（MSL）等の核心的指標を整理した上で、『シベリアからの手紙』『ラ・ジュテ』『美しき五月』『空気の底は赤い』『サン・ソレイユ』『レベル５』などの代表作を分析対象とし、マルケルの創作キャリアにおいて編集率とショット数がともに上昇し続ける傾向を明らかにし、これを情報量と思想表現の重視に起因するものと結論づける。\n\nさらに『ラ・ジュテ』と『美しき五月』のショット分布を比較し、高速編集が現実空間を「切り刻み」虚構的空間へと再構築する機能を持つことを示す。また、中国・キューバ・日本での撮影作品の比較を通じ、「長回し―高速編集」の組み合わせが情報密度と地域的特性を兼ね備えた映像的時空を構築する過程を論じる。最後に、虚構と非虚構の間を往還する晩年の二作品『サン・ソレイユ』『レベル５』に焦点を当て、この編集手法がマルケルの映像表現の可能性を拡張する核心的技術であることを指摘する。",
      keywords: [
        "クリス・マルケル",
        "計量映画学（シネメトリクス）",
        "ドキュメンタリー・エッセイ映画",
        "編集率",
        "長回し",
        "虚構と非虚構",
      ],
    },
  };

  /* ============ 2. 汎用ヘルパー ============ */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const esc = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  /* ============ 3. ヘッダー ============ */
  const header = $("#siteHeader");
  const nav = $("#primaryNav");
  const navToggle = $("#navToggle");

  // スクロールで境界線を出す
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // モバイルメニュー開閉
  const closeMenu = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-locked");
  };
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open);
  });
  $$("#primaryNav a").forEach((a) => a.addEventListener("click", closeMenu));

  // 現在地に応じてナビをハイライト
  const sections = $$("main section[id]");
  const navLinks = $$("#primaryNav a");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        navLinks.forEach((l) =>
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ============ 4. スクロール連動アニメーション ============ */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* ============ 5. ページ読み込みアニメーション ============ */
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
    // ヒーロー内の要素を時間差で表示
    $$(".hero .reveal").forEach((el, i) => {
      el.style.transitionDelay = i * 0.09 + "s";
      el.classList.add("is-visible");
    });
  });

  /* ============ 6. プロジェクトのフィルタ ============ */
  const filters = $$(".filter");
  const cards = $$("#workGrid .card");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      const f = btn.dataset.filter;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.category === f;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ============ 7. 詳細モーダル ============ */
  const modal = $("#projectModal");
  const modalContent = $("#modalContent");
  let lastFocused = null;

  const buildModal = (key) => {
    const p = PROJECTS[key];
    if (!p) return "";
    let html = "";
    html += '<p class="modal-eyebrow">' + esc(p.eyebrow) + "</p>";
    html += "<h3>" + esc(p.title) + "</h3>";

    if (p.facts) {
      html += '<dl class="modal-facts">';
      Object.keys(p.facts).forEach((k) => {
        html +=
          "<div><dt>" + esc(k) + "</dt><dd>" + esc(p.facts[k]) + "</dd></div>";
      });
      html += "</dl>";
    }

    html += '<p class="modal-note">' + esc(p.note) + "</p>";

    if (p.keywords) {
      html += '<div class="modal-keywords">';
      p.keywords.forEach((kw) => {
        html += '<span class="pill pill--outline">' + esc(kw) + "</span>";
      });
      html += "</div>";
    }

    if (p.images && p.images.length) {
      html += '<div class="modal-gallery">';
      p.images.forEach((src, i) => {
        // モーダルは開いた時だけ生成されるため lazy は不要
        // （動的挿入 + スクロール領域内だと遅延読み込みが発火しないブラウザがある）
        html +=
          '<button type="button" data-gallery-index="' +
          i +
          '"><img src="' +
          esc(src) +
          '" alt="' +
          esc(p.title) +
          " 画像 " +
          (i + 1) +
          '" decoding="async" /></button>';
      });
      html += "</div>";
    }
    return html;
  };

  let currentImages = [];

  const openModal = (key) => {
    modalContent.innerHTML = buildModal(key);
    currentImages = (PROJECTS[key] && PROJECTS[key].images) || [];
    lastFocused = document.activeElement;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    const closeBtn = $(".modal-close", modal);
    if (closeBtn) closeBtn.focus();

    // ギャラリーのサムネイル → ライトボックス
    $$(".modal-gallery button", modalContent).forEach((b) => {
      b.addEventListener("click", () =>
        openLightbox(currentImages, Number(b.dataset.galleryIndex))
      );
    });
  };

  const closeModal = () => {
    modal.setAttribute("aria-hidden", "true");
    if (!isLightboxOpen()) document.body.classList.remove("is-locked");
    if (lastFocused) lastFocused.focus();
  };

  // カードの「詳細を見る」ボタン
  $$("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => openModal(btn.dataset.open));
  });

  $$("[data-close]", modal).forEach((el) =>
    el.addEventListener("click", closeModal)
  );

  /* ============ 8. 画像ライトボックス ============ */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  let lbList = [];
  let lbIndex = 0;

  const isLightboxOpen = () => lightbox.getAttribute("aria-hidden") === "false";

  const renderLb = () => {
    lightboxImg.src = lbList[lbIndex];
    lightboxImg.alt = "拡大画像 " + (lbIndex + 1) + " / " + lbList.length;
  };

  const openLightbox = (list, index) => {
    lbList = list;
    lbIndex = index;
    renderLb();
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    $("[data-lb-close]", lightbox).focus();
  };

  const closeLightbox = () => {
    lightbox.setAttribute("aria-hidden", "true");
    if (modal.getAttribute("aria-hidden") === "true") {
      document.body.classList.remove("is-locked");
    }
  };

  const step = (dir) => {
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    renderLb();
  };

  $("[data-lb-close]", lightbox).addEventListener("click", closeLightbox);
  $("[data-lb-prev]", lightbox).addEventListener("click", () => step(-1));
  $("[data-lb-next]", lightbox).addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ============ キーボード操作（Esc / 矢印） ============ */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (isLightboxOpen()) closeLightbox();
      else if (modal.getAttribute("aria-hidden") === "false") closeModal();
      else if (nav.classList.contains("is-open")) closeMenu();
    }
    if (isLightboxOpen()) {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    }
  });

  /* ============ 9. 連絡先フォーム ============ */
  const form = $("#contactForm");
  const formNote = $("#formNote");
  const MAIL_TO = "xtl20021203@gmail.com";

  const setError = (field, msg) => {
    const wrap = field.closest(".field");
    wrap.classList.toggle("has-error", !!msg);
    const slot = $('.field-error[data-for="' + field.id + '"]');
    if (slot) slot.textContent = msg || "";
  };

  const validate = () => {
    let ok = true;
    const name = $("#cf-name");
    const email = $("#cf-email");
    const message = $("#cf-message");

    if (!name.value.trim()) {
      setError(name, "お名前を入力してください。");
      ok = false;
    } else setError(name, "");

    if (!email.value.trim()) {
      setError(email, "メールアドレスを入力してください。");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setError(email, "メールアドレスの形式を確認してください。");
      ok = false;
    } else setError(email, "");

    if (!message.value.trim()) {
      setError(message, "メッセージを入力してください。");
      ok = false;
    } else setError(message, "");

    return ok;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      formNote.textContent = "未入力の項目があります。ご確認ください。";
      return;
    }
    const name = $("#cf-name").value.trim();
    const email = $("#cf-email").value.trim();
    const message = $("#cf-message").value.trim();
    const subject = encodeURIComponent("[ウェブサイトより] " + name + " 様からのご連絡");
    const body = encodeURIComponent(
      message + "\n\n---\nお名前：" + name + "\n返信先：" + email
    );
    window.location.href =
      "mailto:" + MAIL_TO + "?subject=" + subject + "&body=" + body;
    formNote.textContent =
      "メールソフトを開きました。開かない場合は " + MAIL_TO + " まで直接ご連絡ください。";
  });

  /* ============ 10. フッターの年号 ============ */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
